(function(){
const fallback={JPY:4.85,USD:.031},key="tokyo-fx-v1",ttl=43200000,$=id=>document.getElementById(id);
const e={toggle:$("fxToggle"),panel:$("fxPanel"),close:$("fxClose"),from:$("fxFrom"),to:$("fxTo"),amount:$("fxAmount"),result:$("fxToAmount"),swap:$("fxSwap"),note:$("fxRateNote")};if(!e.toggle)return;
const valid=r=>r&&Number(r.JPY)>0&&Number(r.USD)>0?{JPY:Number(r.JPY),USD:Number(r.USD)}:null;
async function rates(){try{const c=JSON.parse(localStorage.getItem(key));if(c&&Date.now()-c.time<ttl&&valid(c.rates))return{rates:c.rates,label:"快取匯率"}}catch(_){}
for(const url of ["https://open.er-api.com/v6/latest/TWD","https://api.frankfurter.dev/v1/latest?base=TWD&symbols=JPY,USD"]){try{const res=await fetch(url);const data=await res.json(),r=valid(data.rates);if(r){try{localStorage.setItem(key,JSON.stringify({rates:r,time:Date.now()}))}catch(_){}return{rates:r,label:"即時參考匯率"}}}catch(_){}}
return{rates:fallback,label:"離線參考匯率"}}
const convert=(n,from,to,r)=>{const twd=from==="TWD"?n:n/r[from];return to==="TWD"?twd:twd*r[to]};
let token=0;async function calc(reverse=false){const mine=++token,info=await rates();if(mine!==token)return;const input=reverse?e.result:e.amount,output=reverse?e.amount:e.result,from=reverse?e.to.value:e.from.value,to=reverse?e.from.value:e.to.value;output.value=convert(Number(input.value||0),from,to,info.rates).toFixed(2);e.note.textContent=`${info.label} · 1 TWD ≈ ${info.rates.JPY.toFixed(3)} JPY`}
e.toggle.addEventListener("click",()=>{e.panel.classList.toggle("show");e.toggle.setAttribute("aria-expanded",String(e.panel.classList.contains("show")))});
e.close.addEventListener("click",()=>e.panel.classList.remove("show"));e.from.addEventListener("change",()=>calc());e.to.addEventListener("change",()=>calc());e.amount.addEventListener("input",()=>calc());e.result.addEventListener("input",()=>calc(true));
e.swap.addEventListener("click",()=>{[e.from.value,e.to.value]=[e.to.value,e.from.value];[e.amount.value,e.result.value]=[e.result.value,e.amount.value];calc()});calc();
})();
