// home page-----------------------------------------------------------------
$(window).on("load", function () {
  let slideIndex = $(".slide.active").index();
  const slideLen = $(".slide").length;
  function slideShow() {

    $(".slide").removeClass("active").eq(slideIndex).addClass("active");
    if (slideIndex == slideLen - 1) {
      slideIndex = 0;
    }
    else {
      slideIndex++;
    }
    setTimeout(slideShow, 5000);
  }
  slideShow();
});

// ///////////////////////////////////////////////////////////music

// const audioPlayer = document.querySelector(".audio-player");
// const audio = new Audio(
// "./bgmusic_5sec.mp3"
// );
// //credit for song: Adrian kreativaweb@gmail.com

// console.dir(audio);

// audio.addEventListener(
// "loadeddata",
// () => {
//   audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
//     audio.duration
//   );
//   audio.volume = .75;
// },
// false
// );

// //click on timeline to skip around
// const timeline = audioPlayer.querySelector(".timeline1");
// timeline.addEventListener("click", e => {
// const timelineWidth = window.getComputedStyle(timeline).width;
// const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
// audio.currentTime = timeToSeek;
// }, false);

// //click volume slider to change volume
// const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
// volumeSlider.addEventListener('click', e => {
// const sliderWidth = window.getComputedStyle(volumeSlider).width;
// const newVolume = e.offsetX / parseInt(sliderWidth);
// audio.volume = newVolume;
// audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
// }, false)

// //check audio percentage and update time accordingly
// setInterval(() => {
// const progressBar = audioPlayer.querySelector(".progress");
// progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
// audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
//   audio.currentTime
// );
// }, 500);

// //toggle between playing and pausing on button click
// const playBtn = audioPlayer.querySelector(".controls .toggle-play");
// playBtn.addEventListener(
// "click",
// () => {
//   if (audio.paused) {
//     playBtn.classList.remove("play");
//     playBtn.classList.add("pause");
//     audio.play();
//   } else {
//     playBtn.classList.remove("pause");
//     playBtn.classList.add("play");
//     audio.pause();
//   }
// },
// false
// );

// audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
// const volumeEl = audioPlayer.querySelector(".volume-container .volume");
// audio.muted = !audio.muted;
// if (audio.muted) {
//   volumeEl.classList.remove("icono-volumeMedium");
//   volumeEl.classList.add("icono-volumeMute");
// } else {
//   volumeEl.classList.add("icono-volumeMedium");
//   volumeEl.classList.remove("icono-volumeMute");
// }
// });

// //turn 128 seconds into 2:08
// function getTimeCodeFromNum(num) {
// let seconds = parseInt(num);
// let minutes = parseInt(seconds / 60);
// seconds -= minutes * 60;
// const hours = parseInt(minutes / 60);
// minutes -= hours * 60;

// if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
// return `${String(hours).padStart(2, 0)}:${minutes}:${String(
//   seconds % 60
// ).padStart(2, 0)}`;
// }


// Hamburger Menu---------------------------------------------------------------

// const btn = document.getElementById('menu-btn')
// const nav = document.getElementById('menu')

// btn.addEventListener('click', () => {
//     btn.classList.toggle('open')
//     nav.classList.toggle('flex')
//     nav.classList.toggle('hidden')
// })

// ——————————————————————————————————————————————————---------------------------
// TextScramble
// ——————————————————————————————————————————————————---------------------------

class TextScramble {
  constructor(el) {
    this.el = el;
    this.chars = '!<>-_/[]{}—=+*^?#________';
    this.update = this.update.bind(this);
  }
  setText(newText) {
    const oldText = this.el.innerText;
    const length = Math.max(oldText.length, newText.length);
    const promise = new Promise(resolve => this.resolve = resolve);
    this.queue = [];
    for (let i = 0; i < length; i++) {
      const from = oldText[i] || '';
      const to = newText[i] || '';
      const start = Math.floor(Math.random() * 40);
      const end = start + Math.floor(Math.random() * 40);
      this.queue.push({ from, to, start, end });
    }
    cancelAnimationFrame(this.frameRequest);
    this.frame = 0;
    this.update();
    return promise;
  }
  update() {
    let output = '';
    let complete = 0;
    for (let i = 0, n = this.queue.length; i < n; i++) {
      let { from, to, start, end, char } = this.queue[i];
      if (this.frame >= end) {
        complete++;
        output += to;
      } else if (this.frame >= start) {
        if (!char || Math.random() < 0.28) {
          char = this.randomChar();
          this.queue[i].char = char;
        }
        output += `<span class="dud">${char}</span>`;
      } else {
        output += from;
      }
    }
    this.el.innerHTML = output;
    if (complete === this.queue.length) {
      this.resolve();
    } else {
      this.frameRequest = requestAnimationFrame(this.update);
      this.frame++;
    }
  }
  randomChar() {
    return this.chars[Math.floor(Math.random() * this.chars.length)];
  }
}

const phrases = [
  'Nivedita Saurabh',
  '#NiviAndSaurabhInSync'
];

const el = document.querySelector('#text1');
const fx = new TextScramble(el);

let counter = 0;
const next = () => {
  fx.setText(phrases[counter]).then(() => {
    setTimeout(next, 1700);
  });
  counter = (counter + 1) % phrases.length;
};

next();


// countdown algo------------------------------------------------------
(function () {
  const second = 1000,
    minute = second * 60,
    hour = minute * 60,
    day = hour * 24;
  let birthday = "April 18, 2024 17:30:00",
    countDown = new Date(birthday).getTime(),
    x = setInterval(function () {
      let now = new Date().getTime(),
        distance = countDown - now;

      document.getElementById("days").innerText = Math.floor(distance / (day)),
        document.getElementById("hours").innerText = Math.floor((distance % (day)) / (hour)),
        document.getElementById("minutes").innerText = Math.floor((distance % (hour)) / (minute)),
        document.getElementById("seconds").innerText = Math.floor((distance % (minute)) / second);

      //do something later when date is reached
      if (distance < 0) {
        let headline = document.getElementById("headline"),
          countdown = document.getElementById("countdown"),
          content = document.getElementById("content");

        headline.innerText = "It's our wedding!";
        countdown.style.display = "none";
        content.style.display = "block";

        clearInterval(x);
      }
      //seconds
    }, 0)
}());


// Events-=========================================

(function ($) {
  $.fn.timeline = function () {
    var selectors = {
      id: $(this),
      item: $(this).find(".timeline-item"),
      activeClass: "timeline-item--active",
      img: ".timeline__img"
    };
    selectors.item.eq(0).addClass(selectors.activeClass);
    selectors.id.css(
      "background-image",
      "url(" +
      selectors.item
        .first()
        .find(selectors.img)
        .attr("src") +
      ")"
    );
    var itemLength = selectors.item.length;
    $(window).scroll(function () {
      var max, min;
      var pos = $(this).scrollTop();
      selectors.item.each(function (i) {
        min = $(this).offset().top;
        max = $(this).height() + $(this).offset().top;
        var that = $(this);
        if (i == itemLength - 2 && pos > min + $(this).height() / 2) {

          selectors.item.removeClass(selectors.activeClass);
          selectors.id.css(
            "background-image",
            "url(" +
            selectors.item
              .last()
              .find(selectors.img)
              .attr("src") +
            ")"
          );
          selectors.item.last().addClass(selectors.activeClass);
        } else if (pos <= max - 100 && pos >= min) {
          // console.log(min,' ',max);
          selectors.id.css(
            "background-image",
            "url(" +
            $(this)
              .find(selectors.img)
              .attr("src") +
            ")"
          );
          selectors.item.removeClass(selectors.activeClass);
          $(this).addClass(selectors.activeClass);
        }
      });
    });
  };
})(jQuery);

$("#timeline-1").timeline();

// ----------------- RSVP modal, audio toggle, share, lightbox -----------------
document.addEventListener('DOMContentLoaded', function () {
  // // --- Debug helper: displays origin, element checks, and localStorage status ---
  // (function debugInit(){
  //   try{
  //     const info = {
  //       origin: location.origin,
  //       href: location.href,
  //       userAgent: navigator.userAgent,
  //       localStorageOK: (function(){ try{ localStorage.setItem('_debug','1'); localStorage.removeItem('_debug'); return true;}catch(e){return false;} })(),
  //       rsvpsCount: (function(){ try{ return JSON.parse(localStorage.getItem('rsvps')||'[]').length }catch(e){return 'err' } })(),
  //       galleryItems: document.querySelectorAll('.timeline__img, .gallery__img').length,
  //       cssHref: (function(){ const l = Array.from(document.querySelectorAll('link[rel=stylesheet]')).find(x=>x.href&&x.href.indexOf('main.css')>-1); return l?l.href:'not-found'; })()
  //     };
  //     console.groupCollapsed('E-Invite Debug');
  //     console.log(info);
  //     console.groupEnd();

  //     // add small overlay to page so you can compare when opening different hosts
  //     const panel = document.createElement('div');
  //     panel.id = 'debug-panel';
  //     panel.style.position = 'fixed';
  //     panel.style.left = '12px';
  //     panel.style.bottom = '12px';
  //     panel.style.zIndex = 9999;
  //     panel.style.background = 'rgba(0,0,0,0.6)';
  //     panel.style.color = 'white';
  //     panel.style.padding = '8px 10px';
  //     panel.style.borderRadius = '8px';
  //     panel.style.fontSize = '12px';
  //     panel.style.fontFamily = 'system-ui,Segoe UI,Roboto,sans-serif';
  //     panel.innerHTML = `host: ${info.origin}<br>rsvps: ${info.rsvpsCount} &nbsp; items: ${info.galleryItems}`;
  //     document.body.appendChild(panel);
  //   }catch(e){ console.warn('debugInit failed', e); }
  // })();

  const rsvpBtn = document.getElementById('rsvp-btn');
  const rsvpModal = document.getElementById('rsvp-modal');
  const rsvpBackdrop = document.getElementById('rsvp-backdrop');
  const closeRsvp = document.getElementById('close-rsvp');
  const rsvpForm = document.getElementById('rsvp-form');
  const musicToggle = document.getElementById('music-toggle');
  const bgMusic = document.getElementById('bg-music');
  const shareBtn = document.getElementById('share-btn');

  function openModal() {
    if (!rsvpModal) return;
    rsvpModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }
  function closeModal() {
    if (!rsvpModal) return;
    rsvpModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  rsvpBtn && rsvpBtn.addEventListener('click', () => openModal());
  closeRsvp && closeRsvp.addEventListener('click', () => closeModal());
  rsvpBackdrop && rsvpBackdrop.addEventListener('click', () => closeModal());

  // Submit RSVP (client-only: saves to localStorage and shows confetti)
  rsvpForm && rsvpForm.addEventListener('submit', function (e) {
    e.preventDefault();
    const data = {
      name: this.name.value,
      attend: this.attend.value,
      count: this.count.value,
      note: this.note.value,
      time: new Date().toISOString()
    };
    // store locally (could be sent to server)
    const existing = JSON.parse(localStorage.getItem('rsvps') || '[]');
    existing.push(data);
    localStorage.setItem('rsvps', JSON.stringify(existing));
    closeModal();
    showConfetti();
    alert('Thanks! Your RSVP has been recorded.');
    this.reset();
  });

  // Music toggle with persistence
  function applyMusicState() {
    const on = localStorage.getItem('music-on') === '1';
    if (!musicToggle) return;
    if (on) {
      musicToggle.setAttribute('aria-pressed', 'true');
      musicToggle.classList.add('on');
      bgMusic && bgMusic.play().catch(() => { });
    } else {
      musicToggle.setAttribute('aria-pressed', 'false');
      musicToggle.classList.remove('on');
      bgMusic && bgMusic.pause();
    }
  }
  musicToggle && musicToggle.addEventListener('click', () => {
    const on = localStorage.getItem('music-on') === '1';
    localStorage.setItem('music-on', on ? '0' : '1');
    applyMusicState();
  });
  // initialize
  applyMusicState();

  // Share button: Web Share API fallback to copy
  shareBtn && shareBtn.addEventListener('click', async () => {
    const shareData = { title: document.title, text: 'Join us for the wedding', url: location.href };
    if (navigator.share) {
      try { await navigator.share(shareData); } catch (e) { }
      return;
    }
    // fallback: copy to clipboard
    try {
      await navigator.clipboard.writeText(location.href);
      alert('Invite link copied to clipboard');
    } catch (e) {
      prompt('Copy this link', location.href);
    }
  });

  // Lightbox for timeline and gallery images
  const lightbox = document.getElementById('lightbox');
  const lightboxImg = document.getElementById('lightbox-img');
  const lightboxClose = document.getElementById('lightbox-close');
  const gallerySelector = '.timeline__img, .gallery__img';
  let galleryItems = Array.from(document.querySelectorAll(gallerySelector));

  function openLightboxAt(index) {
    if (!lightbox || !lightboxImg) return;
    if (!galleryItems.length) return;
    index = (index + galleryItems.length) % galleryItems.length;
    const src = galleryItems[index].src;
    lightboxImg.src = src;
    lightboxImg.dataset.index = index;
    lightbox.setAttribute('aria-hidden', 'false');
    lightboxImg.classList.remove('zoomed');
    lightboxImg.focus && lightboxImg.focus();
  }

  // click to open
  galleryItems.forEach((img, idx) => img.addEventListener('click', () => openLightboxAt(idx)));

  // navigation buttons
  const lbPrev = document.getElementById('lightbox-prev');
  const lbNext = document.getElementById('lightbox-next');
  lbPrev && lbPrev.addEventListener('click', () => {
    const i = Number(lightboxImg.dataset.index || 0);
    openLightboxAt(i - 1);
  });
  lbNext && lbNext.addEventListener('click', () => {
    const i = Number(lightboxImg.dataset.index || 0);
    openLightboxAt(i + 1);
  });

  // close handlers
  lightboxClose && lightboxClose.addEventListener('click', () => lightbox.setAttribute('aria-hidden', 'true'));
  const lbBackdrop = document.getElementById('lightbox-backdrop');
  lbBackdrop && lbBackdrop.addEventListener('click', () => lightbox.setAttribute('aria-hidden', 'true'));

  // keyboard navigation and Escape
  document.addEventListener('keydown', (e) => {
    if (lightbox && lightbox.getAttribute('aria-hidden') === 'false') {
      if (e.key === 'Escape') lightbox.setAttribute('aria-hidden', 'true');
      if (e.key === 'ArrowLeft') {
        const i = Number(lightboxImg.dataset.index || 0); openLightboxAt(i - 1);
      }
      if (e.key === 'ArrowRight') {
        const i = Number(lightboxImg.dataset.index || 0); openLightboxAt(i + 1);
      }
      if (e.key === ' ' || e.key === 'Spacebar') { // toggle zoom on space
        e.preventDefault();
        lightboxImg.classList.toggle('zoomed');
      }
    }
  });

  // click on image toggles zoom
  lightboxImg && lightboxImg.addEventListener('click', () => lightboxImg.classList.toggle('zoomed'));

  // Simple confetti: canvas-free approach creating emoji spans
  function showConfetti() {
    const confettiCount = 24;
    const box = document.createElement('div');
    box.className = 'confetti-container';
    for (let i = 0; i < confettiCount; i++) {
      const s = document.createElement('span');
      s.className = 'confetti';
      s.style.left = (Math.random() * 80 + 10) + '%';
      s.style.animationDelay = (Math.random() * 0.6) + 's';
      s.textContent = ['✨', '💖', '🎉', '🌸'][Math.floor(Math.random() * 4)];
      box.appendChild(s);
    }
    document.body.appendChild(box);
    setTimeout(() => box.remove(), 2500);
  }

  // RSVP Admin UI
  const viewBtn = document.getElementById('view-rsvps');
  const adminModal = document.getElementById('rsvp-admin');
  const adminBackdrop = document.getElementById('rsvp-admin-backdrop');
  const adminClose = document.getElementById('close-rsvp-admin');
  const rsvpTbody = document.getElementById('rsvp-tbody');
  const exportBtn = document.getElementById('export-rsvps');
  const clearBtn = document.getElementById('clear-rsvps');

  function getRSVPs() {
    return JSON.parse(localStorage.getItem('rsvps') || '[]');
  }

  function renderRSVPs() {
    if (!rsvpTbody) return;
    const data = getRSVPs();
    if (!data.length) {
      rsvpTbody.innerHTML = '<tr><td colspan="7" style="text-align:center">No RSVPs yet</td></tr>';
      return;
    }
    rsvpTbody.innerHTML = data.map((d, i) => {
      return `
        <tr>
          <td>${i + 1}</td>
          <td>${escapeHtml(d.name || '')}</td>
          <td>${escapeHtml(d.attend || '')}</td>
          <td>${escapeHtml(d.count || '1')}</td>
          <td>${escapeHtml(d.note || '')}</td>
          <td>${escapeHtml(d.time || '')}</td>
          <td><button class="delete-rsvp" data-index="${i}">Delete</button></td>
        </tr>`;
    }).join('');
  }

  function escapeHtml(s) {
    return String(s).replace(/&/g, '&amp;').replace(/</g, '&lt;').replace(/>/g, '&gt;').replace(/"/g, '&quot;');
  }

  function openAdmin() { if (!adminModal) return; adminModal.setAttribute('aria-hidden', 'false'); renderRSVPs(); }
  function closeAdmin() { if (!adminModal) return; adminModal.setAttribute('aria-hidden', 'true'); }

  viewBtn && viewBtn.addEventListener('click', openAdmin);
  adminClose && adminClose.addEventListener('click', closeAdmin);
  adminBackdrop && adminBackdrop.addEventListener('click', closeAdmin);

  // Delegate delete
  rsvpTbody && rsvpTbody.addEventListener('click', function (e) {
    if (e.target && e.target.matches('.delete-rsvp')) {
      const idx = Number(e.target.getAttribute('data-index'));
      const arr = getRSVPs();
      if (!Number.isFinite(idx) || idx < 0 || idx >= arr.length) return;
      arr.splice(idx, 1);
      localStorage.setItem('rsvps', JSON.stringify(arr));
      renderRSVPs();
    }
  });

  // Export CSV
  exportBtn && exportBtn.addEventListener('click', function () {
    const data = getRSVPs();
    if (!data.length) { alert('No RSVPs to export'); return; }
    const rows = ['name,attend,count,note,time', ...data.map(d => [
      (d.name || '').replace(/"/g, '""'),
      (d.attend || ''),
      (d.count || '1'),
      (d.note || '').replace(/"/g, '""'),
      (d.time || '')
    ].map(v => `"${v}"`).join(','))];
    const csv = rows.join('\n');
    // download
    const blob = new Blob([csv], { type: 'text/csv;charset=utf-8;' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = 'rsvps.csv';
    document.body.appendChild(a);
    a.click();
    a.remove();
    URL.revokeObjectURL(url);
  });

  // Clear all
  clearBtn && clearBtn.addEventListener('click', function () {
    if (!confirm('Delete all RSVPs? This cannot be undone.')) return;
    localStorage.removeItem('rsvps');
    renderRSVPs();
  });

  // close admin with Escape
  document.addEventListener('keydown', function (e) { if (e.key === 'Escape') { closeAdmin(); closeModal(); } });

  // ----------------- Map Modal -----------------
  const mapModal = document.getElementById('map-modal');
  const mapBtn = document.getElementById('view-map-btn');
  const closeMapBtn = document.getElementById('close-map');
  const mapBackdrop = document.getElementById('map-backdrop');

  function openMapModal(e) {
    if (e) e.preventDefault();
    if (!mapModal) return;
    mapModal.setAttribute('aria-hidden', 'false');
    document.body.style.overflow = 'hidden';
  }

  function closeMapModal() {
    if (!mapModal) return;
    mapModal.setAttribute('aria-hidden', 'true');
    document.body.style.overflow = '';
  }

  mapBtn && mapBtn.addEventListener('click', openMapModal);
  closeMapBtn && closeMapBtn.addEventListener('click', closeMapModal);
  mapBackdrop && mapBackdrop.addEventListener('click', closeMapModal);

  // Close map on Escape
  document.addEventListener('keydown', function (e) {
    if (e.key === 'Escape') {
      closeMapModal();
    }
  });

});


