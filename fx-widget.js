// fx-widget.js - 共用匯率小工具 (支援 TWD / IDR / USD)
(function(){
    const FALLBACK_RATES = { IDR: 480.769226, USD: 0.032 }; // 備用：1 TWD = X
    const CACHE_KEY = 'fx_rates_twd';
    const CACHE_TS_KEY = 'fx_rates_ts';
    const CACHE_TTL = 1000 * 60 * 60 * 12; // 12 小時

    function $(id){ return document.getElementById(id); }

    async function fetchRatesFromAPI(){
        try{
            const res = await fetch('https://api.exchangerate.host/latest?base=TWD&symbols=IDR,USD');
            if(!res.ok) throw new Error('network');
            const data = await res.json();
            if(data && data.rates){
                const rates = { IDR: data.rates.IDR, USD: data.rates.USD };
                try{ localStorage.setItem(CACHE_KEY, JSON.stringify(rates)); localStorage.setItem(CACHE_TS_KEY, String(Date.now())); }catch(e){}
                return rates;
            }
        }catch(e){ /* ignore */ }
        return null;
    }

    function getCachedRates(){
        try{
            const ts = parseInt(localStorage.getItem(CACHE_TS_KEY) || '0', 10);
            const raw = localStorage.getItem(CACHE_KEY);
            if(raw && ts && (Date.now() - ts) < CACHE_TTL){
                const parsed = JSON.parse(raw);
                return parsed;
            }
        }catch(e){}
        return null;
    }

    async function getRates(){
        const cached = getCachedRates();
        if(cached) return { rates: cached, from: 'cache' };
        const api = await fetchRatesFromAPI();
        if(api) return { rates: api, from: 'api' };
        return { rates: FALLBACK_RATES, from: 'fallback' };
    }

    function formatNum(n){ return n.toLocaleString(undefined, { maximumFractionDigits: 6 }); }

    const fxToggle = $('fxToggle');
    const fxPanel = $('fxPanel');
    const fxFrom = $('fxFrom');
    const fxTo = $('fxTo');
    const fxAmount = $('fxAmount'); // 左邊輸入
    const fxToAmount = $('fxToAmount'); // 右邊可編輯輸入
    const fxSwap = $('fxSwap');
    const fxClose = $('fxClose');

    if(!fxToggle || !fxPanel || !fxFrom || !fxTo || !fxAmount || !fxToAmount || !fxSwap) return;

    async function compute(){
        // Deprecated compute() kept for backward-compat; not used by new handlers
        return await computeForward();
    }

    // Convert using rates (base = TWD)
    function convertAmount(amount, fromCur, toCur, rates){
        function toTWD(amount, cur){
            if(cur === 'TWD') return amount;
            const r = rates[cur];
            if(!r || r === 0) return 0;
            return amount / r;
        }
        function fromTWD(amountTwd, cur){
            if(cur === 'TWD') return amountTwd;
            const r = rates[cur];
            if(!r) return 0;
            return amountTwd * r;
        }
        const amtInTwd = toTWD(amount, fromCur);
        return fromTWD(amtInTwd, toCur);
    }

    let syncing = false;

    async function computeForward(){
        const from = fxFrom.value;
        const to = fxTo.value;
        const amt = parseFloat(fxAmount.value) || 0;
        if(from === to){
            syncing = true; fxToAmount.value = formatNum(amt); syncing = false; return;
        }
        fxToAmount.value = '計算中...';
        const info = await getRates();
        const rates = info.rates;
        const out = convertAmount(amt, from, to, rates);
        syncing = true; fxToAmount.value = Number(out).toLocaleString(undefined, {useGrouping:false, maximumFractionDigits:6}); syncing = false;
    }

    async function computeReverse(){
        const from = fxFrom.value;
        const to = fxTo.value;
        const amt = parseFloat(fxToAmount.value) || 0;
        if(from === to){
            syncing = true; fxAmount.value = formatNum(amt); syncing = false; return;
        }
        fxAmount.value = '計算中...';
        const info = await getRates();
        const rates = info.rates;
        // reverse: convert amt (toCur) -> fromCur
        const out = convertAmount(amt, to, from, rates);
        syncing = true; fxAmount.value = Number(out).toLocaleString(undefined, {useGrouping:false, maximumFractionDigits:6}); syncing = false;
    }

    fxToggle.addEventListener('click', ()=>{ fxPanel.classList.toggle('show'); });
    if(fxClose) fxClose.addEventListener('click', ()=>{ fxPanel.classList.remove('show'); });
    fxFrom.addEventListener('change', computeForward);
    fxTo.addEventListener('change', computeForward);
    fxAmount.addEventListener('input', (e)=>{ if(!syncing) computeForward(); });
    fxToAmount.addEventListener('input', (e)=>{ if(!syncing) computeReverse(); });
    fxSwap.addEventListener('click', ()=>{ 
        // swap currencies and swap displayed amounts, then recompute
        const a = fxFrom.value; fxFrom.value = fxTo.value; fxTo.value = a; 
        const tmp = fxAmount.value; fxAmount.value = fxToAmount.value; fxToAmount.value = tmp;
        computeForward();
    });

    // 初始計算一次
    computeForward();
})();
