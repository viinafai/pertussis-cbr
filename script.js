'use strict';
const {symptoms,cases,example}=window.CBR_DATA;
const $=s=>document.querySelector(s);
const $$=s=>[...document.querySelectorAll(s)];
const esc=s=>String(s).replace(/[&<>"']/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;',"'":'&#39;'}[c]));
const fmt=n=>Number(n).toLocaleString('id-ID',{maximumFractionDigits:4});
const pct=n=>(n*100).toLocaleString('id-ID',{maximumFractionDigits:2})+'%';
function cosine(a,b){
 const products=a.map((v,i)=>v*b[i]);
 const dot=products.reduce((s,v)=>s+v,0);
 const sumA=a.reduce((s,v)=>s+v*v,0),sumB=b.reduce((s,v)=>s+v*v,0);
 const normA=Math.sqrt(sumA),normB=Math.sqrt(sumB);
 return {products,dot,sumA,sumB,normA,normB,score:normA&&normB?dot/(normA*normB):0};
}
function currentVector(){return symptoms.map(([code])=>$('#sym-'+code).checked?1:0)}
function updateCount(){const n=currentVector().reduce((a,b)=>a+b,0);$('#selected-count').textContent=n+' dari 9 gejala dipilih';$('#calculate').disabled=n===0;}
function renderSymptoms(){
 $('#symptoms').innerHTML=symptoms.map(([code,name])=>`<label class="symptom"><input id="sym-${code}" type="checkbox" value="${code}"><span class="symptom-mark" aria-hidden="true">✓</span><span class="symptom-copy"><b>${code}</b><span>${esc(name)}</span></span></label>`).join('');
 $$('#symptoms input').forEach(e=>e.addEventListener('change',updateCount));updateCount();
}
function renderCases(){
 $('#case-cards').innerHTML=cases.map(c=>`<article class="case-card"><div class="case-top"><span class="pill">${c.code}</span><span class="case-dots">${c.vector.filter(Boolean).length} gejala</span></div><h3>${esc(c.name)}</h3><p>${esc(c.note)}</p><div class="vector">(${c.vector.join(', ')})</div></article>`).join('');
 const header='<th scope="col">Kasus</th>'+symptoms.map(([c])=>`<th scope="col">${c}</th>`).join('');
 $('#case-head').innerHTML=header;
 $('#case-body').innerHTML=cases.map(c=>`<tr><th scope="row">${c.code}</th>${c.vector.map(v=>`<td><span class="binary ${v?'on':''}">${v}</span></td>`).join('')}</tr>`).join('');
}
function renderResult(v){
 const results=cases.map(c=>({...c,...cosine(v,c.vector)})).sort((a,b)=>b.score-a.score||a.code.localeCompare(b.code));
 const best=results[0];
 $('#result').hidden=false;
 $('#result-title').textContent=best.name;
 $('#result-code').textContent=best.code+' · kemiripan tertinggi';
 $('#result-score').textContent=pct(best.score);
 $('#result-vector').textContent='Kasus baru: ('+v.join(', ')+')';
 $('#ranking').innerHTML=results.map((r,i)=>`<div class="rank-item"><span class="rank-number">0${i+1}</span><div class="rank-info"><strong>${r.code} · ${esc(r.name)}</strong><div class="track"><span style="width:${r.score*100}%"></span></div></div><strong class="rank-value">${pct(r.score)}</strong></div>`).join('');
 $('#details').innerHTML=results.map(r=>`<details class="detail" ${r.code===best.code?'open':''}><summary><span><b>${r.code}</b> — ${esc(r.name)}</span><b>${pct(r.score)}</b></summary><div class="detail-body"><p><b>Vektor kasus baru:</b> (${v.join(', ')})</p><p><b>Vektor ${r.code}:</b> (${r.vector.join(', ')})</p><p><b>Dot product:</b> ${v.map((n,i)=>`(${n} × ${r.vector[i]})`).join(' + ')} = <b>${r.dot}</b></p><p><b>Panjang K01:</b> √(${v.map(n=>n+'²').join(' + ')}) = √${r.sumA} = ${fmt(r.normA)}</p><p><b>Panjang ${r.code}:</b> √(${r.vector.map(n=>n+'²').join(' + ')}) = √${r.sumB} = ${fmt(r.normB)}</p><p><b>Similarity:</b> ${r.dot} / (${fmt(r.normA)} × ${fmt(r.normB)}) = <b>${fmt(r.score)} = ${pct(r.score)}</b></p></div></details>`).join('');
 $('#result').scrollIntoView({behavior:'smooth',block:'start'});
}
function init(){
 renderSymptoms();renderCases();
 $('#example').addEventListener('click',()=>{symptoms.forEach(([code],i)=>$('#sym-'+code).checked=Boolean(example[i]));updateCount();$('#diagnosis').scrollIntoView({behavior:'smooth'});});
 $('#reset').addEventListener('click',()=>{$$('#symptoms input').forEach(e=>e.checked=false);$('#result').hidden=true;updateCount();});
 $('#diagnosis-form').addEventListener('submit',e=>{e.preventDefault();const v=currentVector();if(!v.some(Boolean))return;renderResult(v);});
 $('#year').textContent=new Date().getFullYear();
}
document.addEventListener('DOMContentLoaded',init);
