/* رحلة مستكشف الفضاء — المنطق البرمجي. كل البيانات تُحفظ في LocalStorage */
const KEY='spaceTrip.v1', PASS=80, PTS=20; // درجة النجاح 80 ولكل سؤال 20

// المراحل. كل سؤال: [النص، أ، ب، ج، رقم الصحيحة (0-2)، تفسير مبسط]
const STAGES=[
{t:'المستكشف الفضائي المبتدئ',b:'مستكشف الفضاء المبتدئ',ic:'🌍',m:'🥉',bd:'🧑‍🚀🪐<br>⭐',col:'#cd7f32',q:[
['ما المقصود بالمجموعة الشمسية؟','الشمس وما يدور حولها من كواكب وأجرام سماوية.','مجموعة من النجوم البعيدة فقط.','كوكب واحد يدور حول الشمس.',0,'هي الشمس وكل ما يدور حولها.'],
['ما مركز المجموعة الشمسية؟','الأرض.','الشمس.','القمر.',1,'الشمس نجم في المركز وتدور حولها الكواكب.'],
['كم عدد كواكب المجموعة الشمسية؟','سبعة كواكب.','ثمانية كواكب.','تسعة كواكب.',1,'للمجموعة الشمسية ثمانية كواكب.'],
['على أي كوكب نعيش؟','المريخ.','الزهرة.','الأرض.',2,'نعيش على كوكب الأرض.'],
['ما أقرب كوكب إلى الشمس؟','عطارد.','المشتري.','نبتون.',0,'عطارد هو الأقرب إلى الشمس.']]},
{t:'خبير الكواكب',b:'خبير الكواكب',ic:'🪐',m:'🥈',bd:'🧑‍🚀🗺️<br>🪐',col:'#8c97a8',q:[
['ما الكوكب الثاني في الترتيب من حيث البعد عن الشمس؟','عطارد.','الزهرة.','الأرض.',1,'الترتيب: عطارد ثم الزهرة ثم الأرض.'],
['ما الكواكب الأربعة الأقرب إلى الشمس؟','عطارد والزهرة والأرض والمريخ.','المشتري وزحل وأورانوس ونبتون.','الأرض والمشتري وزحل ونبتون.',0,'تسمى الكواكب الداخلية وهي صخرية.'],
['ما أكبر كواكب المجموعة الشمسية؟','الأرض.','زحل.','المشتري.',2,'المشتري هو الأكبر حجمًا.'],
['يقع حزام الكويكبات الرئيسي بين مداري أي كوكبين؟','الأرض والمريخ.','المريخ والمشتري.','زحل وأورانوس.',1,'الحزام بين الكواكب الداخلية والخارجية.'],
['أي كوكب يشتهر بحلقاته الواضحة والجميلة؟','عطارد.','زحل.','المريخ.',1,'زحل مشهور بحلقاته.']]},
{t:'بطل المجموعة الشمسية',b:'بطل المجموعة الشمسية',ic:'☀️',m:'🥇',bd:'🧑‍🚀☀️<br>👑⭐',col:'#d4a017',q:[
['ما أبعد كواكب المجموعة الشمسية عن الشمس؟','أورانوس.','نبتون.','زحل.',1,'نبتون هو الكوكب الثامن والأبعد.'],
['أي كوكب يستغرق نحو 365 يومًا لإكمال دورة حول الشمس؟','الأرض.','المريخ.','المشتري.',0,'السنة الأرضية نحو 365 يومًا.'],
['ما سبب تعاقب الليل والنهار على الأرض؟','دوران الأرض حول محورها.','دوران القمر حول الأرض.','دوران الشمس حول الأرض.',0,'تدور الأرض حول محورها كل 24 ساعة تقريبًا.'],
['ما العامل الأساسي المرتبط بتعاقب الفصول الأربعة على الأرض؟','تغير حجم الشمس.','ميل محور الأرض مع دورانها حول الشمس.','ابتعاد القمر عن الأرض.',1,'الميل مع الدوران حول الشمس يغيّر كمية الضوء.'],
['أي من الكواكب التالية يُصنف ضمن الكواكب العملاقة الجليدية؟','عطارد.','المريخ.','نبتون.',2,'أورانوس ونبتون عملاقان جليديان.']]}
];

// شرح الدرس: [أيقونة، عنوان، نص]
const LESSON=[
['🌌','ما المجموعة الشمسية؟','هي الشمس وكل ما يدور حولها من كواكب وأقمار وكويكبات وأجرام سماوية.'],
['☀️','الشمس وأهميتها','نجم في مركز المجموعة الشمسية، مصدر الضوء والحرارة، ولا حياة على الأرض بدونها.'],
['🪐','الكواكب الثمانية بالترتيب','عطارد، الزهرة، الأرض، المريخ، المشتري، زحل، أورانوس، نبتون.'],
['🧭','الداخلية والخارجية','الداخلية (عطارد، الزهرة، الأرض، المريخ) صخرية صغيرة. الخارجية (المشتري، زحل، أورانوس، نبتون) عملاقة. ويقع بينهما حزام الكويكبات.'],
['🔭','خصائص الكواكب','عطارد الأقرب للشمس، المشتري الأكبر، زحل صاحب الحلقات، المريخ الأحمر، ونبتون الأبعد وهو عملاق جليدي.'],
['🌍','دوران الأرض حول محورها','تدور الأرض حول محورها كل 24 ساعة تقريبًا فيتعاقب الليل والنهار.'],
['🔄','دوران الأرض حول الشمس','تكمل الأرض دورة حول الشمس في نحو 365 يومًا، ومع ميل محورها تتعاقب الفصول الأربعة.']];
const PL=[['عطارد','#b0a8a0',18],['الزهرة','#e8b86a',26],['الأرض','#4a9fe8',28],['المريخ','#d9583b',22],['المشتري','#d8a26e',56],['زحل','#e6cf8f',48],['أورانوس','#8fe0e6',36],['نبتون','#3b5bd9',36]];

/* ===== الحالة والحفظ ===== */
const def=()=>({name:'',best:[null,null,null],last:[null,null,null],dates:[null,null,null],board:[]});
function load(){try{
  const s={...def(),...JSON.parse(localStorage.getItem(KEY))};let ok=true;
  // تحقق: لا تُقبل مرحلة ناجحة إلا بدرجة صحيحة ≥ 80 وبعد نجاح السابقة
  s.best=[0,1,2].map(i=>{const v=s.best[i];ok=ok&&Number.isInteger(v)&&v>=PASS&&v<=100&&v%PTS===0;return ok?v:null});
  if(!Array.isArray(s.board))s.board=[];return s;
}catch(e){return def()}}
let S=load(), view='home', arg, Q;
const save=()=>{try{localStorage.setItem(KEY,JSON.stringify(S))}catch(e){}};
const $=id=>document.getElementById(id), app=$('app');
const done=i=>S.best[i]!==null, unlocked=i=>i===0||done(i-1);
const nDone=()=>S.best.filter(v=>v!==null).length;
const total=()=>S.best.reduce((a,v)=>a+(v||0),0), prog=()=>Math.round(nDone()/3*100);
const esc=s=>String(s).replace(/[&<>"]/g,c=>({'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]));

/* ===== الواجهات ===== */
const nav=()=>`<div class="nav noprint"><button onclick="go('lesson')">📖 شرح الدرس</button><button onclick="go('dash')">🚀 المهمات الفضائية</button><button onclick="go('ach')">🏅 إنجازاتي وشاراتي</button><button onclick="go('board')">🏆 لوحة الشرف</button><button class="alt" onclick="go('home')">🏠 الصفحة الرئيسية</button><button class="red" onclick="resetAll()">🔄 إعادة ضبط التقدم</button></div>`;
const V={
home:()=>`<div class="card"><div class="hero">🧑‍🚀🪐☀️🚀</div><h1>رحلة مستكشف الفضاء</h1><h2>أهلًا بك أيها المستكشف الصغير!</h2><p>انطلق في رحلة فضائية مذهلة لاكتشاف المجموعة الشمسية. أمامك ثلاث مهمات فضائية، وفي كل مهمة ستتعلم معلومات جديدة وتجيب عن التحديات لتجمع شارات المستكشفين. هل تستطيع الحصول على الشارات البرونزية والفضية والذهبية وتصبح بطل المجموعة الشمسية؟</p><p style="text-align:center"><input id="nm" maxlength="30" placeholder="اكتب اسمك هنا" value="${esc(S.name)}"><br><br><button onclick="start()">ابدأ الرحلة 🚀</button></p></div>`,
dash:()=>`<div class="card"><h1>مرحبًا ${esc(S.name)} 👋</h1><div class="stats"><div>🏅 الشارات<br><b>${nDone()} من 3</b></div><div>⭐ النقاط<br><b>${total()}</b></div><div>📈 التقدم<br><b>${prog()}%</b></div></div><div class="bar"><i style="width:${prog()}%"></i></div></div>
<div class="card"><h2>خريطة الرحلة</h2><div class="path">${STAGES.map((s,i)=>`<div class="stage ${done(i)?'done':''} ${unlocked(i)?'':'lock'}" onclick="openStage(${i})"><div class="pl">${s.ic}</div><b>المرحلة ${i+1}</b><br>${s.m} ${s.t}${unlocked(i)?'':'<br>🔒'}</div>${i<2?'<span>🚀 ←</span>':''}`).join('')}</div></div>`,
lesson:()=>`<div class="card"><h2>📖 شرح الدرس</h2>${LESSON.map(l=>`<div class="card" style="background:#1d2d78"><h3>${l[0]} ${l[1]}</h3><p>${l[2]}</p></div>`).join('')}<h3>إنفوجرافيك: ترتيب الكواكب من الشمس</h3><div style="display:flex;align-items:center;gap:8px;overflow-x:auto;padding:10px"><span style="font-size:3rem">☀️</span>${PL.map(p=>`<div style="text-align:center;font-size:.8rem;min-width:58px"><div style="width:${p[2]}px;height:${p[2]}px;border-radius:50%;background:${p[1]};margin:auto"></div>${p[0]}</div>`).join('')}</div></div>`,
quiz:()=>{const st=STAGES[Q.s],q=st.q[Q.n];
  return `<div class="card"><p>${st.m} ${st.t} — السؤال ${Q.n+1} من 5</p><div class="bar"><i style="width:${Q.n*20}%"></i></div><h2>${q[0]}</h2>${[0,1,2].map(k=>`<button class="opt" id="o${k}" onclick="pick(${k})">${'أبج'[k]}) ${q[k+1]}</button>`).join('')}<div id="fb"></div><p style="text-align:center"><button id="cf" onclick="confirmA()" disabled>تأكيد الإجابة</button></p></div>`},
result:({i,p,pass})=>{const s=STAGES[i];return pass
  ?`<div class="card" style="text-align:center"><h1>🎉 أحسنت يا ${esc(S.name)}!</h1><div class="badge b${i+1}">${s.bd}</div><h2>${s.b}</h2><p>درجتك: ${p} من 100</p><div class="nav"><button onclick="go('cert',${i})">📜 الشهادة</button>${i<2?`<button onclick="openStage(${i+1})">الانتقال إلى المهمة التالية</button>`:`<button onclick="go('ach')">🏅 إنجازاتي</button>`}</div></div>`
  :`<div class="card" style="text-align:center"><div class="hero">🛸</div><h2>لا تقلق يا مستكشف الفضاء، يمكنك المحاولة مرة أخرى!</h2><p>درجتك: ${p} من 100 (النجاح من ${PASS})</p><button onclick="startQuiz(${i})">إعادة المحاولة 🔄</button></div>`},
ach:()=>`<div class="card"><h2>🏅 إنجازاتي</h2><div class="bar"><i style="width:${prog()}%"></i></div><p style="text-align:center">التقدم الإجمالي ${prog()}% — النقاط ${total()}</p><div class="grid">${STAGES.map((s,i)=>`<div><div class="badge b${i+1} ${done(i)?'':'off'}">${s.bd}</div><b>${s.b}</b><p>${done(i)?`✅ الدرجة: ${S.best[i]} من 100`:S.last[i]!==null?`آخر محاولة: ${S.last[i]} من 100`:'🔒 لم تُنجز بعد'}</p>${done(i)?`<button onclick="go('cert',${i})">📜 الشهادة</button>`:''}</div>`).join('')}</div></div>`,
board:()=>`<div class="card"><h2>🏆 لوحة الشرف</h2><p style="text-align:center">هذه نتائج محلية محفوظة على هذا الجهاز فقط، وليست منافسة عبر الإنترنت.</p>${S.board.length?`<table><tr><th>#</th><th>الاسم</th><th>المرحلة</th><th>الدرجة</th></tr>${S.board.slice(0,5).map((r,k)=>`<tr><td>${k+1}</td><td>${esc(r.n)}</td><td>${esc(+r.s+1)}</td><td>${esc(r.p)}</td></tr>`).join('')}</table>`:'<p style="text-align:center">لا توجد نتائج بعد. أنجز مهمة لتظهر هنا!</p>'}</div>`,
cert:i=>{const s=STAGES[i];return `<div class="cert" style="--c:${s.col}"><div class="hero">🧑‍🚀</div><h1>شهادة إنجاز ${['برونزية','فضية','ذهبية'][i]}</h1><p>يشهد مشروع «رحلة مستكشف الفضاء» بأن المستكشف</p><h1>${esc(S.name)}</h1><p>اجتاز المرحلة ${i+1}: «${s.t}» بدرجة <b>${S.best[i]} من 100</b></p><p>التاريخ: ${esc(S.dates[i]||'')}</p><div class="badge b${i+1}">${s.bd}</div></div><p style="text-align:center" class="noprint"><button onclick="print()">🖨️ طباعة / حفظ PDF</button></p>`}
};
function render(){
  if(view==='cert'&&!done(arg))view='dash'; // لا شهادة قبل النجاح
  app.innerHTML=`<div class="wrap">${view==='home'?'':nav()}${V[view](arg)}</div>`;
}
function go(v,a){view=v;arg=a;render();scrollTo(0,0)}

/* ===== الإجراءات ===== */
function start(){const n=$('nm').value.trim();if(!n)return alert('اكتب اسمك أولًا يا مستكشف!');S.name=n.slice(0,30);save();go('dash')}
function openStage(i){if(!unlocked(i))return alert('أنهِ المهمة السابقة بنجاح أولًا 🔒');startQuiz(i)}
function startQuiz(i){Q={s:i,n:0,pts:0,sel:null,lock:false};go('quiz')}
function pick(k){if(Q.lock)return;Q.sel=k;[0,1,2].forEach(j=>$('o'+j).classList.toggle('sel',j===k));$('cf').disabled=false}
function confirmA(){ // يُحتسب كل سؤال مرة واحدة فقط (Q.lock)
  if(Q.lock||Q.sel===null)return;Q.lock=true;
  const q=STAGES[Q.s].q[Q.n],ok=Q.sel===q[4];
  $('o'+q[4]).classList.add('ok');if(!ok)$('o'+Q.sel).classList.add('no');
  if(ok){Q.pts+=PTS;burst()}
  $('fb').innerHTML=ok?`<div class="fb ok">ممتاز يا رائد الفضاء! إجابة صحيحة، حصلت على ${PTS} نقطة 🎉</div>`
   :`<div class="fb no">لا بأس يا مستكشف، تعلّم منها وتابع 💪<br>الإجابة الصحيحة: ${q[q[4]+1]}<br>💡 ${q[5]}</div>`;
  const c=$('cf');c.textContent=Q.n<4?'السؤال التالي':'عرض النتيجة';c.disabled=false;c.onclick=next;
}
function next(){if(Q.n<4){Q.n++;Q.sel=null;Q.lock=false;go('quiz')}else finish()}
function finish(){
  const i=Q.s,p=Q.pts,pass=p>=PASS,d=new Date().toLocaleDateString('ar-EG');S.last[i]=p;
  if(pass){ // النجاح يُسجَّل فقط من هنا وبعد اجتياز الاختبار
    if(!done(i)||p>S.best[i]){S.best[i]=p;S.dates[i]=d}
    S.board.push({n:S.name,s:i,p,d});S.board.sort((a,b)=>b.p-a.p);S.board=S.board.slice(0,10);
    setTimeout(burst,300);
  }
  save();go('result',{i,p,pass});
}
function resetAll(){if(confirm('سيتم مسح اسمك وكل تقدمك ودرجاتك. هل أنت متأكد؟')){try{localStorage.removeItem(KEY)}catch(e){}S=def();go('home')}}
function burst(){for(let k=0;k<24;k++){const e=document.createElement('span');e.className='conf';e.textContent=['⭐','✨','🌟'][k%3];e.style.left=Math.random()*100+'vw';e.style.animationDelay=Math.random()*.6+'s';document.body.appendChild(e);setTimeout(()=>e.remove(),3500)}}
render();
