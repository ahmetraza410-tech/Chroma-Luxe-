const defaultCats=[
{id:'logos',name:'Logos',desc:'Logo design and visual identity concepts.',icon:'01'},
{id:'business-cards',name:'Business Cards',desc:'Elegant and professional business card designs.',icon:'02'},
{id:'reels',name:'Reels & Video',desc:'Short-form video editing, reels and motion content.',icon:'03'},
{id:'graphic-design',name:'Graphic Design',desc:'Posters, flyers, social creatives and visual design.',icon:'04'},
{id:'digital-marketing',name:'Digital Marketing',desc:'Social media strategy, content and digital growth.',icon:'05'},
{id:'branding',name:'Branding',desc:'Complete brand visuals and premium identity systems.',icon:'06'}
];
function getCats(){try{let custom=JSON.parse(localStorage.getItem('chroma_categories')||'[]');return [...defaultCats,...custom]}catch(e){return defaultCats}}
function renderHome(){const el=document.getElementById('categories');el.innerHTML=getCats().map((c,i)=>`<a class="cat" href="category.html?cat=${encodeURIComponent(c.id)}"><span class="num">${c.icon||String(i+1).padStart(2,'0')}</span><h3>${esc(c.name)}</h3><p>${esc(c.desc||'Explore this portfolio category.')}</p><span class="arrow">View ${esc(c.name)} →</span></a>`).join('')}
function renderCategory(){const q=new URLSearchParams(location.search),id=q.get('cat')||'logos',c=getCats().find(x=>x.id===id)||{name:id.replaceAll('-',' '),desc:'Chroma Luxe portfolio'};document.title='Chroma Luxe — '+c.name;document.getElementById('pageTitle').textContent=c.name;document.getElementById('pageDesc').textContent=c.desc;let work=[];try{let all=JSON.parse(localStorage.getItem('chroma_work')||'[]');work=all.filter(x=>x.category===id||x.category===c.name)}catch(e){}const g=document.getElementById('gallery');g.innerHTML=work.length?work.flatMap(p=>p.images.map((im,j)=>`<article class="work"><img src="${im}" alt="${esc(p.name||c.name+' design')}" loading="lazy"></article>`)).join(''):`<div class="empty">Your ${esc(c.name)} work will appear here.<br><br>Add your designs to this category after uploading the portfolio files.</div>`}
function esc(s){return String(s).replace(/[&<>'"]/g,m=>({'&':'&amp;','<':'&lt;','>':'&gt;',"'":'&#039;','"':'&quot;'}[m]))}
