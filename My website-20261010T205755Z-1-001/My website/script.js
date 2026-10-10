const vehicles = [
{id:1,brand:"Bugatti",name:"Tourbillon",year:2026,price:4100000,type:"Hypercar",fuel:"Petrol + Electricity ",trans:"manual",engine:"8.3L Naturally Aspirated V16 + Electric Motors",hp: 1800 ,torque:" Not consistently published as one comparable combined figure",zero:"3.5s",speed:"445 km/h",popular:99,image:"https://hips.hearstapps.com/hmg-prod/images/2026-bugatti-tourbillon-104-66709d54aa287.jpg?crop=0.819xw:0.692xh;0.0994xw,0.185xh&resize=1200:* ",desc:"A next-generation hypercar combining a naturally aspirated V16 engine with electric motors."},
{id:2,brand:"Bugatti",name:"Chiron Super Sport",year:2022,price:3900000,type:"Hypercar",fuel:"Petrol",trans:"manual",engine:"8.0L Quad-Turbo W16",hp: 1578,torque:" 1,600 Nm",zero:"3.5s",speed:"440 km/h  ",popular:99,image:" https://bugatti.imgix.net/677aa8b9531541bbada7c4e0/chiron-sport-og.jpg",desc:"An ultra-high-performance hypercar engineered for extreme speed and luxury."},
{id:3,brand:"BMW",name:"M3 Competition",year:2025,price:83500,type:"Sports Cars",fuel:"Petrol | Transmission: 8-speed automatic",trans:"manual",engine:"3.0L Twin-Turbo Inline-6",hp:503,torque:"650 Nm",zero:"3.5s",speed:"250 km/h",popular:96,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQxoOWsSooDDMkOJ-mOehPhSw98ouQdc8qF6Bd9-Hrzeg&s=10",desc:"High-performance luxury sedan designed for sporty driving and everyday use."},
{id:4,brand:"BMW",name:"M5",year:2025,price:120000,type:"Sports Cars",fuel:"Petrol + Electricity",trans:"manual",engine:"4.4L Twin-Turbo V8 Plug-in Hybrid",hp:717,torque:"1000 Nm",zero:"3.5s",speed:"250 km/h ",popular:98,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQH2UqHjc_q1-ye7JaCR9HUVx_ZGIgcEl01VrNCo1xUqxRgo8AMIUTeKZA&s=10",desc:"A powerful luxury performance sedan combining a V8 engine with electric assistance."},
{id:5,brand:"BMW",name:"XM Label",year:2025,price:185000,type:"SUV",fuel:"Petrol + Electricity",trans:"manual",engine:"4.4L Twin-Turbo V8 Plug-in Hybrid",hp:738,torque:"1000 Nm",zero:"3.5s",speed:"290 km/h  ",popular:94,image:"https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcQWcoi725XShD55rrBYPA0MOgw4b5eXAJQ3KGMqTXiaJA&s=10",desc:"A high-performance luxury SUV with a powerful hybrid drivetrain"},
{id:6,brand:"Nissan",name:"GT-R Nismo",year:2024,price:220000,type:"Sports Car",fuel:"Petrol",trans:"manual",engine:"3.8L Twin-Turbo V6",hp:600 ,torque:"652 Nm",zero:"3.5s",speed:"315 km/h ",popular:96,image:" ",desc:"A performance-focused all-wheel-drive sports car known for its acceleration and track capability."},
{id:7,brand:"Nissan",name:"Z Nismo",year:2024,price:65000,type:"Sports Car",fuel:"Petrol",trans:"manual",engine:"3.0L Twin-Turbo V6",hp: 420,torque:" 521 Nm",zero:"3.5s",speed:"250 km/h ",popular:92,image:" ",desc:"A rear-wheel-drive sports coupe built for responsive handling and enjoyable driving."},

];

const categories = [
["🚗","Cars","420+"],["🛞","SUVs","210+"],["🏎️","Sports Cars","185+"],["⚡","Electric","140+"],
["🏍️","Motorcycles","95+"],["🚚","Trucks","80+"],["🚙","Luxury","160+"],["🛻","Off-Road","75+"]
];
const brands=["BMW","Mercedes-Benz","Audi","Toyota","Honda","Nissan","Porsche","Ferrari","Lamborghini","Tesla","Ford","McLaren"];
const news=[
["NEW LAUNCHES","The machines redefining the next generation of performance","May 18, 2026","https://images.unsplash.com/photo-1503736334956-4c8f8e92946d?auto=format&fit=crop&w=900&q=85"],
["EV TECHNOLOGY","Inside the battery technology changing electric performance","May 14, 2026","https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=900&q=85"],
["SUPERCARS","Why lightweight engineering is winning the supercar race","May 09, 2026","https://images.unsplash.com/photo-1544636331-e26879cd4d9b?auto=format&fit=crop&w=900&q=85"],
["TECHNOLOGY","The cockpit is becoming the smartest part of your car","May 04, 2026","https://images.unsplash.com/photo-1553440569-bcc63803a83d?auto=format&fit=crop&w=900&q=85"],
["MOTORSPORT","The technology trickling down from the racetrack","Apr 29, 2026","https://images.unsplash.com/photo-1504215680853-026ed2a45def?auto=format&fit=crop&w=900&q=85"],
["DESIGN","The new language of automotive design","Apr 23, 2026","https://images.unsplash.com/photo-1492144534655-ae79c964c9d7?auto=format&fit=crop&w=900&q=85"]
];

const $=s=>document.querySelector(s), $$=s=>[...document.querySelectorAll(s)];
let favorites=JSON.parse(localStorage.getItem("vh_favorites")||"[]");
let compareIds=[];
let currentModal=null;

function money(n){return "$"+n.toLocaleString("en-US")}
function toast(msg){const t=$("#toast");t.textContent=msg;t.classList.add("show");clearTimeout(window.toastTimer);window.toastTimer=setTimeout(()=>t.classList.remove("show"),2300)}
function isFav(id){return favorites.includes(id)}
function saveFav(){localStorage.setItem("vh_favorites",JSON.stringify(favorites));$("#favoriteCount").textContent=favorites.length}
function toggleFavorite(id){
  if(isFav(id)) {favorites=favorites.filter(x=>x!==id);toast("Removed from favorites")}
  else {favorites.push(id);toast("Added to favorites")}
  saveFav();renderFeatured();renderExplore();if(currentModal?.id===id) updateModalButtons();
}
function vehicleCard(v){
 return `<article class="vehicle-card reveal visible">
  <div class="vehicle-image"><img src="${v.image}" alt="${v.name}" loading="lazy"><span class="vehicle-tag">${v.type}</span>
  <button class="heart ${isFav(v.id)?"active":""}" data-fav="${v.id}" aria-label="Favorite">${isFav(v.id)?"♥":"♡"}</button></div>
  <div class="vehicle-content"><span class="vehicle-brand">${v.brand}</span><h3 class="vehicle-name">${v.name}</h3><span class="vehicle-year">${v.year} • ${v.trans}</span>
  <div class="vehicle-price">${money(v.price)}</div><div class="vehicle-specs"><div>ENGINE<b>${v.engine}</b></div><div>POWER<b>${v.hp} HP</b></div><div>FUEL<b>${v.fuel}</b></div></div>
  <div class="card-footer"><button class="btn btn-ghost" data-compare="${v.id}">＋ Compare</button><button class="btn btn-primary" data-details="${v.id}">View Details</button></div></div></article>`
}
function renderFeatured(){ $("#featuredGrid").innerHTML=vehicles.slice(0,8).map(vehicleCard).join("") }
function getFiltered(){
 let list=[...vehicles], brand=$("#brandFilter").value,type=$("#typeFilter").value,price=$("#priceFilter").value,year=$("#yearFilter").value,fuel=$("#fuelFilter").value,trans=$("#transFilter").value;
 if(brand!=="all")list=list.filter(v=>v.brand===brand);if(type!=="all")list=list.filter(v=>v.type===type);
 if(price!=="all"){let [a,b]=price.split("-").map(Number);list=list.filter(v=>v.price>=a&&v.price<=b)}
 if(year!=="all")list=list.filter(v=>String(v.year)===year);if(fuel!=="all")list=list.filter(v=>v.fuel===fuel);if(trans!=="all")list=list.filter(v=>v.trans===trans);
 const sort=$("#sortFilter").value;if(sort==="newest")list.sort((a,b)=>b.year-a.year||b.popular-a.popular);if(sort==="low")list.sort((a,b)=>a.price-b.price);if(sort==="high")list.sort((a,b)=>b.price-a.price);if(sort==="popular")list.sort((a,b)=>b.popular-a.popular);return list;
}
function renderExplore(){const list=getFiltered();$("#exploreGrid").innerHTML=list.map(vehicleCard).join("");$("#resultCount").textContent=`${list.length} vehicle${list.length!==1?"s":""}`;$("#emptyState").classList.toggle("show",!list.length);bindCards()}
function bindCards(){
 $$("[data-fav]").forEach(b=>b.onclick=e=>{e.stopPropagation();toggleFavorite(Number(b.dataset.fav))});
 $$("[data-details]").forEach(b=>b.onclick=()=>openModal(Number(b.dataset.details)));
 $$("[data-compare]").forEach(b=>b.onclick=()=>toggleCompare(Number(b.dataset.compare)));
}
function populateFilters(){
 const fill=(id,vals)=>{const el=$(id);[...new Set(vals)].sort().forEach(x=>el.insertAdjacentHTML("beforeend",`<option>${x}</option>`))}
 fill("#brandFilter",vehicles.map(v=>v.brand));fill("#typeFilter",vehicles.map(v=>v.type));fill("#yearFilter",vehicles.map(v=>v.year));fill("#fuelFilter",vehicles.map(v=>v.fuel));fill("#transFilter",vehicles.map(v=>v.trans));
 $$("select").forEach(s=>s.addEventListener("change",renderExplore));
}
function renderCategories(){ $("#categoryGrid").innerHTML=categories.map(c=>`<button class="category-card" data-cat="${c[1]}"><span class="cat-icon">${c[0]}</span><span><b>${c[1]}</b><small>${c[2]} vehicles</small></span></button>`).join("");$$("[data-cat]").forEach(b=>b.onclick=()=>{$("#typeFilter").value=b.dataset.cat;renderExplore();$("#explore").scrollIntoView({behavior:"smooth"})})}
function renderBrands(){ $("#brandGrid").innerHTML=brands.map(b=>`<button class="brand-card" data-brand="${b}">${b}</button>`).join("");$$("[data-brand]").forEach(b=>b.onclick=()=>{$("#brandFilter").value=b.dataset.brand;renderExplore();$("#explore").scrollIntoView({behavior:"smooth"})})}
function renderTrending(){const list=[...vehicles].sort((a,b)=>b.popular-a.popular).slice(0,6);$("#trendingList").innerHTML=list.map((v,i)=>`<div class="trend"><span class="rank">0${i+1}</span><img src="${v.image}" alt="${v.name}" loading="lazy"><div class="trend-name"><b>${v.name}</b><small>${v.brand} • ${v.year}</small></div><span class="trend-score">${v.popular}% POPULAR</span><button class="btn btn-ghost" data-details="${v.id}">VIEW</button></div>`).join("");$$(".trend [data-details]").forEach(b=>b.onclick=()=>openModal(Number(b.dataset.details)))}
function renderNews(){ $("#newsGrid").innerHTML=news.map(n=>`<article class="news-card"><div class="news-img"><img src="${n[3]}" alt="${n[1]}" loading="lazy"></div><div class="news-body"><small>${n[0]} • ${n[2]}</small><h3>${n[1]}</h3><p>Read the latest insights, stories and technology shaping the automotive world.</p><a href="#news" class="text-link">READ MORE →</a></div></article>`).join("")}

function openModal(id){currentModal=vehicles.find(v=>v.id===id);if(!currentModal)return;const v=currentModal;$("#modalImage").src=v.image;$("#modalImage").alt=v.name;$("#modalBrand").textContent=v.brand;$("#modalType").textContent=`${v.type} • ${v.year}`;$("#modalName").textContent=v.name;$("#modalPrice").textContent=money(v.price);$("#modalDesc").textContent=v.desc;$("#modalSpecs").innerHTML=[["ENGINE",v.engine],["HORSEPOWER",v.hp+" HP"],["TORQUE",v.torque],["0–100 KM/H",v.zero],["TOP SPEED",v.speed],["FUEL",v.fuel],["TRANSMISSION",v.trans]].map(s=>`<div class="spec"><small>${s[0]}</small><b>${s[1]}</b></div>`).join("");updateModalButtons();$("#vehicleModal").classList.add("open");document.body.style.overflow="hidden"}
function updateModalButtons(){if(!currentModal)return;$("#modalFav").textContent=isFav(currentModal.id)?"♥ In Favorites":"♡ Add to Favorites";$("#modalCompare").textContent=compareIds.includes(currentModal.id)?"✓ In Compare":"＋ Compare"}
function closeModal(){$("#vehicleModal").classList.remove("open");document.body.style.overflow="";currentModal=null}
function toggleCompare(id){if(compareIds.includes(id)){compareIds=compareIds.filter(x=>x!==id);toast("Removed from comparison")}else if(compareIds.length>=3){toast("Compare up to 3 vehicles")}else{compareIds.push(id);toast("Added to comparison")}renderCompare();if(currentModal)updateModalButtons()}
function renderCompare(){
 const vs=compareIds.map(id=>vehicles.find(v=>v.id===id));
 if(!vs.length){$("#compareBoard").innerHTML=`<div class="compare-empty"><div><span>＋</span>Select vehicles from the collection to start comparing.</div></div>`;return}
 const rows=[["Price",v=>money(v.price)],["Engine",v=>v.engine],["Horsepower",v=>v.hp+" HP"],["Torque",v=>v.torque],["0–100 km/h",v=>v.zero],["Top Speed",v=>v.speed],["Fuel Type",v=>v.fuel],["Transmission",v=>v.trans]];
 $("#compareBoard").innerHTML=`<table class="compare-table"><thead><tr><th>SPEC</th>${vs.map(v=>`<th>${v.brand} ${v.name}<button class="compare-remove" data-remove="${v.id}">×</button></th>`).join("")}</tr></thead><tbody>${rows.map(r=>`<tr><td>${r[0]}</td>${vs.map(v=>`<td>${r[1](v)}</td>`).join("")}</tr>`).join("")}</tbody></table>`;
 $$("[data-remove]").forEach(b=>b.onclick=()=>toggleCompare(Number(b.dataset.remove)))
}
function search(q){q=q.trim().toLowerCase();if(!q){$("#searchResults").innerHTML="";return}const list=vehicles.filter(v=>`${v.name} ${v.brand} ${v.type} ${v.fuel}`.toLowerCase().includes(q));$("#searchResults").innerHTML=list.length?list.slice(0,9).map(v=>`<button class="search-item" data-search="${v.id}"><img src="${v.image}" alt=""><span><b>${v.brand} ${v.name}</b><small>${v.type} • ${money(v.price)}</small></span></button>`).join(""):`<div class="empty-state show">No vehicles found</div>`;$$("[data-search]").forEach(b=>b.onclick=()=>{closeSearch();openModal(Number(b.dataset.search))})}
function closeSearch(){$("#searchOverlay").classList.remove("open");$("#globalSearch").value="";$("#searchResults").innerHTML=""}

function setupCounters(){
 const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(!e.isIntersecting)return;const el=e.target,target=+el.dataset.count;let start=0;const step=Math.max(1,Math.ceil(target/45));const timer=setInterval(()=>{start=Math.min(target,start+step);el.textContent=start.toLocaleString();if(start>=target)clearInterval(timer)},25);io.unobserve(el)}),{threshold:.4});$$("[data-count]").forEach(x=>io.observe(x))
}
function setupReveal(){const io=new IntersectionObserver(entries=>entries.forEach(e=>{if(e.isIntersecting){e.target.classList.add("visible");io.unobserve(e.target)}}),{threshold:.12});$$(".reveal").forEach(x=>io.observe(x))}
function particles(){for(let i=0;i<28;i++){const p=document.createElement("i");p.style.cssText=`position:absolute;width:${Math.random()*2+1}px;height:${Math.random()*2+1}px;border-radius:50%;background:#fff;left:${Math.random()*100}%;top:${Math.random()*100}%;opacity:${Math.random()*.35+.08};animation:floatP ${Math.random()*8+5}s ease-in-out infinite;animation-delay:${Math.random()*-8}s`;$("#particles").appendChild(p)}const st=document.createElement("style");st.textContent="@keyframes floatP{50%{transform:translate(20px,-30px);opacity:.5}}";document.head.appendChild(st)}

document.addEventListener("click",e=>{const btn=e.target.closest(".btn");if(btn){const r=btn.getBoundingClientRect(),s=document.createElement("i");s.className="ripple";const size=Math.max(r.width,r.height);s.style.width=s.style.height=size+"px";s.style.left=e.clientX-r.left-size/2+"px";s.style.top=e.clientY-r.top-size/2+"px";btn.appendChild(s);setTimeout(()=>s.remove(),600)}})
window.addEventListener("scroll",()=>{$("#siteHeader").classList.toggle("scrolled",scrollY>30);const y=scrollY+100;$$(".main-nav a").forEach(a=>a.classList.toggle("active",document.querySelector(a.getAttribute("href"))?.offsetTop<=y&&document.querySelector(a.getAttribute("href"))?.offsetTop+document.querySelector(a.getAttribute("href"))?.offsetHeight>y))})
$("#menuBtn").onclick=()=>$("#mainNav").classList.toggle("open");$$(".main-nav a").forEach(a=>a.onclick=()=>$("#mainNav").classList.remove("open"))
$("#searchToggle").onclick=()=>{$("#searchOverlay").classList.add("open");setTimeout(()=>$("#globalSearch").focus(),150)};$("#closeSearch").onclick=closeSearch;$("#globalSearch").oninput=e=>search(e.target.value);document.addEventListener("keydown",e=>{if(e.key==="Escape"){closeSearch();closeModal()}})
$("#modalClose").onclick=closeModal;$("#vehicleModal").onclick=e=>{if(e.target.id==="vehicleModal")closeModal()};$("#modalFav").onclick=()=>currentModal&&toggleFavorite(currentModal.id);$("#modalCompare").onclick=()=>currentModal&&toggleCompare(currentModal.id);$("#clearCompare").onclick=()=>{compareIds=[];renderCompare();toast("Comparison cleared")};$("#favoritesBtn").onclick=()=>{const favs=vehicles.filter(v=>isFav(v.id));if(!favs.length){toast("No favorites yet");return}$("#exploreGrid").innerHTML=favs.map(vehicleCard).join("");$("#resultCount").textContent=`${favs.length} favorite vehicle${favs.length>1?"s":""}`;$("#emptyState").classList.remove("show");bindCards();$("#explore").scrollIntoView({behavior:"smooth"})};

renderCategories();renderFeatured();populateFilters();renderExplore();renderBrands();renderTrending();renderNews();renderCompare();saveFav();setupCounters();setupReveal();particles();
