(function(){
  // Wait for gallery data to be available
  function initGallery(){
    if(!window.GALLERY_IMAGES) return setTimeout(initGallery,100);
    const container = document.querySelector('.gallery-grid');
    if(!container) return;
    container.innerHTML = '';
    window.GALLERY_IMAGES.forEach((src, idx)=>{
      const img = document.createElement('img');
      img.className = 'gallery__img';
      img.src = src;
      img.alt = `prewedding ${idx+1}`;
      img.tabIndex = 0;
      img.dataset.index = idx;
      img.addEventListener('click', openLightbox);
      img.addEventListener('keydown', (e)=>{ if(e.key === 'Enter') openLightbox.call(img,e); });
      container.appendChild(img);
    });
  }

  function openLightbox(e){
    const idx = Number(this.dataset.index);
    const imgs = window.GALLERY_IMAGES || [];
    const lb = document.getElementById('lightbox');
    const lbImg = document.getElementById('lightbox-img');
    const prev = document.getElementById('lightbox-prev');
    const next = document.getElementById('lightbox-next');

    if(!lb || !lbImg) return;
    let current = idx;
    function show(i){
      lbImg.classList.remove('zoomed');
      lbImg.src = imgs[i] || '';
      lb.setAttribute('aria-hidden','false');
      lbImg.focus();
      current = i;
    }
    function close(){ lb.setAttribute('aria-hidden','true'); }
    function nextImg(){ show((current+1) % imgs.length); }
    function prevImg(){ show((current-1+imgs.length) % imgs.length); }

    prev.onclick = prevImg;
    next.onclick = nextImg;
    document.getElementById('lightbox-close').onclick = close;
    document.getElementById('lightbox-backdrop').onclick = close;

    lb.onkeydown = function(ev){
      if(ev.key === 'Escape') close();
      if(ev.key === 'ArrowRight') nextImg();
      if(ev.key === 'ArrowLeft') prevImg();
      if(ev.key === ' ') { ev.preventDefault(); lbImg.classList.toggle('zoomed'); }
    };

    lbImg.onclick = function(){ lbImg.classList.toggle('zoomed'); };

    show(idx);
  }

  // start
  if(document.readyState === 'loading') document.addEventListener('DOMContentLoaded', initGallery); else initGallery();
})();
