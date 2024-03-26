// home page-----------------------------------------------------------------
$(window).on("load", function(){
  let slideIndex = $(".slide.active").index();
  const slideLen = $(".slide").length;
  function slideShow(){
      
      $(".slide").removeClass("active").eq(slideIndex).addClass("active");
      if(slideIndex == slideLen-1){
          slideIndex = 0;
      }
      else{
          slideIndex++;
      }
      setTimeout(slideShow, 5000);
  }
  slideShow();
});

// //////////////////////////////////////////////////////////music

const audioPlayer = document.querySelector(".audio-player");
const audio = new Audio(
"./bgmusic_5sec.mp3"
);
//credit for song: Adrian kreativaweb@gmail.com

console.dir(audio);

audio.addEventListener(
"loadeddata",
() => {
  audioPlayer.querySelector(".time .length").textContent = getTimeCodeFromNum(
    audio.duration
  );
  audio.volume = .75;
},
false
);

//click on timeline to skip around
const timeline = audioPlayer.querySelector(".timeline1");
timeline.addEventListener("click", e => {
const timelineWidth = window.getComputedStyle(timeline).width;
const timeToSeek = e.offsetX / parseInt(timelineWidth) * audio.duration;
audio.currentTime = timeToSeek;
}, false);

//click volume slider to change volume
const volumeSlider = audioPlayer.querySelector(".controls .volume-slider");
volumeSlider.addEventListener('click', e => {
const sliderWidth = window.getComputedStyle(volumeSlider).width;
const newVolume = e.offsetX / parseInt(sliderWidth);
audio.volume = newVolume;
audioPlayer.querySelector(".controls .volume-percentage").style.width = newVolume * 100 + '%';
}, false)

//check audio percentage and update time accordingly
setInterval(() => {
const progressBar = audioPlayer.querySelector(".progress");
progressBar.style.width = audio.currentTime / audio.duration * 100 + "%";
audioPlayer.querySelector(".time .current").textContent = getTimeCodeFromNum(
  audio.currentTime
);
}, 500);

//toggle between playing and pausing on button click
const playBtn = audioPlayer.querySelector(".controls .toggle-play");
playBtn.addEventListener(
"click",
() => {
  if (audio.paused) {
    playBtn.classList.remove("play");
    playBtn.classList.add("pause");
    audio.play();
  } else {
    playBtn.classList.remove("pause");
    playBtn.classList.add("play");
    audio.pause();
  }
},
false
);

audioPlayer.querySelector(".volume-button").addEventListener("click", () => {
const volumeEl = audioPlayer.querySelector(".volume-container .volume");
audio.muted = !audio.muted;
if (audio.muted) {
  volumeEl.classList.remove("icono-volumeMedium");
  volumeEl.classList.add("icono-volumeMute");
} else {
  volumeEl.classList.add("icono-volumeMedium");
  volumeEl.classList.remove("icono-volumeMute");
}
});

//turn 128 seconds into 2:08
function getTimeCodeFromNum(num) {
let seconds = parseInt(num);
let minutes = parseInt(seconds / 60);
seconds -= minutes * 60;
const hours = parseInt(minutes / 60);
minutes -= hours * 60;

if (hours === 0) return `${minutes}:${String(seconds % 60).padStart(2, 0)}`;
return `${String(hours).padStart(2, 0)}:${minutes}:${String(
  seconds % 60
).padStart(2, 0)}`;
}


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
  }}

  const phrases = [
      'Anisha Harshit',
      'Ishaq ka Sharansh'
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
      x = setInterval(function() {    
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

(function($) {
$.fn.timeline = function() {
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
  $(window).scroll(function() {
    var max, min;
    var pos = $(this).scrollTop();
    selectors.item.each(function(i) {
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


