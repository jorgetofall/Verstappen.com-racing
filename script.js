// reload
window.addEventListener("load", () => {
  if (window.location.hash) {
    history.replaceState(null, null, " ");
    setTimeout(() => {
      const home = document.getElementById("home");
      if (home) {
        home.scrollIntoView({ behavior: "auto", block: "start" });
      }
    }, 50);
  }
});

// 1234567890 animasi
function animateStats() {
  const stats = document.querySelectorAll(".stats-number");
  stats.forEach((stat) => {
    const targetValue = parseInt(stat.textContent);
    let currentValue = 0;
    const increment = targetValue / 100;

    const timer = setInterval(() => {
      currentValue += increment;
      if (currentValue >= targetValue) {
        currentValue = targetValue;
        clearInterval(timer);
      }
      stat.textContent = Math.floor(currentValue);
    }, 20);
  });
}

const observer = new IntersectionObserver(
  (entries, observer) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        document.querySelectorAll(".stats-card").forEach((card) => {
          card.classList.add("visible");
        });

        animateStats();
        observer.unobserve(entry.target);
      }
    });
  },
  {
    threshold: 0.3,
  }
);

const statsSection = document.getElementById("stats");
if (statsSection) {
  observer.observe(statsSection);
}

// Scroll Speedometer
const needle = document.getElementById("needle");
const label = document.getElementById("speedLabel");

// Buat tick marks dan label (0 - 360 km/h)
const container = document.querySelector(".speedometer-container");
const maxSpeed = 360;
const tickCount = 10;

for (let i = 0; i <= tickCount; i++) {
  const tick = document.createElement("div");
  tick.className = "tick";
  const angle = -90 + i * (180 / tickCount); // dari -90 sampai 90 derajat
  tick.style.transform = `rotate(${angle}deg) translateY(-90px)`;
  container.appendChild(tick);

  const labelTick = document.createElement("div");
  labelTick.className = "tick-label";
  const speed = Math.round((i / tickCount) * maxSpeed);
  labelTick.innerText = `${speed}`;

  const radius = 80;
  const rad = (angle - 90) * Math.PI / 180;
  const x = 100 + radius * Math.cos(rad);
  const y = 100 + radius * Math.sin(rad);
  labelTick.style.left = `${x}px`;
  labelTick.style.top = `${y}px`;
  labelTick.style.position = "absolute";

  container.appendChild(labelTick);
}

// Scroll listener
window.addEventListener("scroll", () => {
  const scrollTop = window.scrollY;
  const docHeight = document.documentElement.scrollHeight - window.innerHeight;
  const scrollPercent = scrollTop / docHeight;

  const speed = scrollPercent * maxSpeed;
  const angle = scrollPercent * 180 - 90;

  needle.style.transform = `rotate(${angle}deg)`;
  label.textContent = `${Math.round(speed)} km/h`;
});

const mobileMenu = document.querySelector('.mobile-menu');
const navLinks = document.querySelector('.nav-links');

mobileMenu.addEventListener('click', () => {
  navLinks.classList.toggle('active');
});
