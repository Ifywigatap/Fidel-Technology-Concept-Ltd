// Year
document.getElementById('year').textContent = new Date().getFullYear();

// Mobile menu
const menuBtn = document.getElementById('menuBtn');
const mobileMenu = document.getElementById('mobileMenu');
if (menuBtn) {
  menuBtn.addEventListener('click', () => {
    mobileMenu.classList.toggle('open');
    mobileMenu.setAttribute('aria-hidden', !mobileMenu.classList.contains('open'));
  });
}
Array.from(document.querySelectorAll('.mnav')).forEach(a => a.addEventListener('click', () => mobileMenu.classList.remove('open')));

// Active link on scroll
const sections = ['services','projects','about','contact'];
const links = Array.from(document.querySelectorAll('nav a.navlink'));
const io = new IntersectionObserver((entries)=>{
  entries.forEach(e => { if(e.isIntersecting){
    links.forEach(l => l.classList.toggle('active', l.getAttribute('href') === '#' + e.target.id));
  }});
}, {root:null, rootMargin:'-50% 0px -50% 0px', threshold:0});
sections.forEach(id => {const el=document.getElementById(id); if(el) io.observe(el)});

// Smooth scroll
Array.from(document.querySelectorAll('a[href^="#"]')).forEach(a => a.addEventListener('click', (e)=>{
  const href = a.getAttribute('href');
  if(href.length>1){ e.preventDefault(); document.querySelector(href).scrollIntoView({behavior:'smooth', block:'start'}); }
}));

// Gallery lightbox
const lb = document.getElementById('lightbox');
const lbImg = document.getElementById('lightboxImg');
const closeLb = document.getElementById('closeLightbox');
const gallery = document.getElementById('gallery');
if (gallery) {
  gallery.addEventListener('click', (e)=>{
    const a = e.target.closest('a');
    if(!a) return;
    e.preventDefault();
    lbImg.src = a.href;
    lb.classList.add('open');
  });
}
closeLb.addEventListener('click', ()=> lb.classList.remove('open'));
lb.addEventListener('click', (e)=>{ if(e.target === lb) lb.classList.remove('open') });

// Contact form (AJAX)
const form = document.getElementById('contactForm');
const formStatus = document.getElementById('formStatus');
form.addEventListener('submit', async (e)=>{
  e.preventDefault();
  formStatus.textContent = 'Sending…';
  const data = new FormData(form);
  try{
    const res = await fetch(form.action, { method:'POST', body:data, headers: { 'Accept': 'application/json' }});
    if(res.ok){ form.reset(); formStatus.textContent = "Thanks! We'll reach out shortly."; }
    else{ formStatus.textContent = 'Could not send. Try again.'; }
  }catch(err){ formStatus.textContent = 'Network error. Please try again.'; }
});