document.addEventListener("DOMContentLoaded", () => {

  /* ================= BASIC ELEMENTS ================= */
  const giftBtn = document.getElementById("giftBtn");
  const countdown = document.getElementById("countdown");
  const lockScreen = document.getElementById("lockScreen") || document.body;
  const birthdayOverlay = document.getElementById("birthdayOverlay");

  const envelopeSection = document.getElementById("envelopeSection");
  const envelope = document.getElementById("envelope");
  const letter = document.getElementById("letter");
  const letterText = document.getElementById("letterText");

  const tapToContinue = document.getElementById("tapToContinue");
  const cardSection = document.getElementById("cardSection");
  const cardsTapContinue = document.getElementById("cardsTapContinue");

  const heartGame = document.getElementById("heartGame");
  const heartContainer = document.querySelector(".heart-container");
  const heartMessage = document.getElementById("heartMessage");
  const scoreEl = document.getElementById("score");

  const heartEndScreen = document.getElementById("heartEndScreen");
  const endTap = document.getElementById("endTap");
  const giftScreen = document.getElementById("giftScreen");
  const endMainText = document.getElementById("endMainText");
  const endSubText = document.getElementById("endSubText");



  /* ================= INITIAL STATES ================= */
  birthdayOverlay.style.display = "none";
  envelopeSection.classList.add("hidden");
  cardSection.classList.add("hidden");
  heartGame.classList.add("hidden");
  heartEndScreen.classList.add("hidden");
  letter.style.display = "none";
  tapToContinue.classList.add("hidden");
  cardsTapContinue.classList.add("hidden");

  giftBtn.disabled = true;
  giftBtn.style.opacity = "0.4";
  giftBtn.style.cursor = "not-allowed";

  /* ================= COUNTDOWN ================= */
  const targetDate = new Date("February 8, 2025 12:00:00").getTime();

  function updateCountdown() {
    const diff = targetDate - Date.now();

    if (diff <= 0) {
      countdown.innerHTML = "It's time 💗";
      giftBtn.disabled = false;
      giftBtn.style.opacity = "1";
      giftBtn.style.cursor = "pointer";
      return;
    }

    const d = Math.floor(diff / (1000 * 60 * 60 * 24));
    const h = Math.floor((diff / (1000 * 60 * 60)) % 24);
    const m = Math.floor((diff / (1000 * 60)) % 60);
    const s = Math.floor((diff / 1000) % 60);

    countdown.innerHTML = `${d}d ${h}h ${m}m ${s}s`;
  }

  setInterval(updateCountdown, 1000);
  updateCountdown();

  /* ================= CONFETTI ================= */
  const canvas = document.getElementById("confettiCanvas");
  const ctx = canvas.getContext("2d");
  let confetti = [];

  function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
  }
  resizeCanvas();
  window.addEventListener("resize", resizeCanvas);

  function createConfettiBurst() {
    confetti = [];
    const cx = canvas.width / 2;
    const cy = canvas.height / 2;

    for (let i = 0; i < 220; i++) {
      const angle = Math.random() * Math.PI * 2;
      const speed = Math.random() * 9 + 6;

      confetti.push({
        x: cx,
        y: cy,
        r: Math.random() * 5 + 3,
        dx: Math.cos(angle) * speed,
        dy: Math.sin(angle) * speed,
        life: 90,
        color: `hsl(${Math.random() * 360},100%,60%)`
      });
    }
    animateConfetti();
  }

  function animateConfetti() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);

    confetti.forEach((p, i) => {
      p.x += p.dx;
      p.y += p.dy;
      p.dy += 0.18;
      p.life--;

      ctx.beginPath();
      ctx.arc(p.x, p.y, p.r, 0, Math.PI * 2);
      ctx.fillStyle = p.color;
      ctx.fill();

      if (p.life <= 0) confetti.splice(i, 1);
    });

    if (confetti.length) requestAnimationFrame(animateConfetti);
  }

  /* ================= GIFT CLICK ================= */
  giftBtn.addEventListener("click", () => {
    if (giftBtn.disabled) return;

    lockScreen.classList.add("hidden");
    birthdayOverlay.style.display = "flex";
    createConfettiBurst();

    setTimeout(() => {
      birthdayOverlay.style.display = "none";
      envelopeSection.classList.remove("hidden");
    }, 2500);
  });

  /* ================= LETTER ================= */
  const message = `Hii ma'ammmmm... 😍😘,

Aaj ka din aapke liye bohot special hai kyuki aaj ke din aapko yeh duniya mila tha,
par mere liye aur zyada special hai kyuki aaj ke din mujhe mera duniya mila tha..... 🧿♥

Your smile, your voice, your presence,
they mean more than one can express through words.... ✨

I hope, this very little gift makes your day extra special 🎁🤞`;

  envelope.addEventListener("click", () => {
    envelope.classList.add("opened");
    letter.style.display = "block";
    setTimeout(() => typeLetter(message), 300);
  });

  function typeLetter(text, speed = 40) {
    letterText.innerHTML = "";
    let i = 0;

    function typing() {
      if (i < text.length) {
        letterText.innerHTML += text.charAt(i++);
        setTimeout(typing, speed);
      } else {
        tapToContinue.classList.remove("hidden");
      }
    }
    typing();
  }

  tapToContinue.addEventListener("click", () => {
    envelopeSection.classList.add("hidden");
    tapToContinue.classList.add("hidden");
    cardSection.classList.remove("hidden");
    animateCardsIn();
  });

  /* ================= CARDS ================= */
  function animateCardsIn() {
    document.querySelectorAll(".flip-card").forEach((card, i) => {
      card.style.opacity = "0";
      card.style.transform = "translateY(40px)";
      setTimeout(() => {
        card.style.transition = "all 0.6s ease";
        card.style.opacity = "1";
        card.style.transform = "translateY(0)";
      }, i * 150);
    });
  }

  let flippedCount = 0;
  document.querySelectorAll(".flip-card").forEach(card => {
    let flipped = false;
    card.addEventListener("click", () => {
      if (flipped) return;
      card.querySelector(".flip-inner").style.transform = "rotateY(180deg)";
      flipped = true;
      flippedCount++;
      if (flippedCount === document.querySelectorAll(".flip-card").length) {
        setTimeout(() => cardsTapContinue.classList.remove("hidden"), 700);
      }
    });
  });

  cardsTapContinue.addEventListener("click", () => {
    cardSection.classList.add("hidden");
    cardsTapContinue.classList.add("hidden");
    startHeartGame();
  });

  /* ================= HEART GAME ================= */
  let score = 0;
  let gameInterval = null;
  let gameOver = false;

  const messages = [
    "Aap bohot khubsurat ho 😍",
    "You make my world softer 💞",
    "I feel lucky every day 🧿",
    "You are my safe place 💗"
  ];

  function startHeartGame() {
    heartGame.classList.remove("hidden");
    score = 0;
    gameOver = false;
    scoreEl.innerText = "Score: 0 / 4";
    heartMessage.innerText = "";
    gameInterval = setInterval(spawnHeart, 900);
  }

  function spawnHeart() {
    if (gameOver) return;
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.style.left = Math.random() * 80 + 10 + "%";
    heart.style.animationDuration = Math.random() * 2 + 4 + "s";

    heart.addEventListener("click", () => {
      if (gameOver) return;
      score++;
      scoreEl.innerText = `Score: ${score} / 4`;
      heartMessage.innerText = messages[score - 1] || "";
      heart.remove();
      if (score === 4) endHeartGame();
    });

    heart.addEventListener("animationend", () => heart.remove());
    heartContainer.appendChild(heart);
  }
  function endHeartGame() {
    gameOver = true;
    clearInterval(gameInterval);
    createConfettiBurst();
    setTimeout(() => {
      heartGame.classList.add("hidden");
      const finalMessage = document.getElementById("finalMessage");
      finalMessage.style.display = "flex";
    }, 800);
  }
/* ================= FINAL GIFTS LOGIC ================= */

const finalGifts = document.getElementById("finalGifts");

/* ================= FINAL GIFTS LOGIC ================= */

const giftBoxes = document.querySelectorAll(".gift-box");

giftBoxes.forEach(box => {
  let opened = false;

  box.addEventListener("click", () => {
    if (opened) return;
    opened = true;

    const imgPath = box.dataset.img;

    const img = document.createElement("img");
    img.src = imgPath;
    img.style.width = "100%";
    img.style.height = "100%";
    img.style.borderRadius = "12px";

    box.innerHTML = "";
    box.appendChild(img);
  });
});
document.querySelectorAll(".gift-box").forEach(box => {
  box.addEventListener("click", () => {
    const imgPath = box.dataset.img;

    box.innerHTML = `
      <img src="${imgPath}"
           style="width:100%;height:100%;object-fit:contain;border-radius:12px;">
    `;
  });
});

});
