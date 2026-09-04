const year = document.querySelector('#year');
if (year) year.textContent = new Date().getFullYear();

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

document.querySelectorAll('.reveal').forEach((element) => observer.observe(element));

const coffeeMessages = [
  'Built with a shitton of coffee.',
  'No frameworks were over-engineered in the making of this website.',
  'Coffee in. Bugs out. Mostly.',
  'Yes, the button works. No, it does not make coffee.'
];

let coffeeIndex = 0;

function showEasterEgg(message) {
  const existing = document.querySelector('#easter-egg');
  if (existing) existing.remove();

  const toast = document.createElement('div');
  toast.id = 'easter-egg';
  toast.setAttribute('role', 'status');
  toast.className = 'fixed bottom-5 right-5 z-50 max-w-sm border border-line bg-card px-5 py-4 text-sm font-bold text-[#0d0d0d] shadow-[6px_6px_0_#ff3838]';
  toast.textContent = message;
  document.body.appendChild(toast);
  window.setTimeout(() => toast.remove(), 3600);
}

document.querySelector('#coffee-button')?.addEventListener('click', () => {
  showEasterEgg(coffeeMessages[coffeeIndex % coffeeMessages.length]);
  coffeeIndex += 1;
});

const konamiCode = ['ArrowUp', 'ArrowUp', 'ArrowDown', 'ArrowDown', 'ArrowLeft', 'ArrowRight', 'ArrowLeft', 'ArrowRight', 'b', 'a'];
let konamiPosition = 0;

window.addEventListener('keydown', (event) => {
  if (event.key.toLowerCase() === konamiCode[konamiPosition].toLowerCase()) {
    konamiPosition += 1;
    if (konamiPosition === konamiCode.length) {
      showEasterEgg('Achievement unlocked: you spent ten perfectly good keypresses finding this. ☕');
      konamiPosition = 0;
    }
  } else {
    konamiPosition = 0;
  }
});

console.log(
  '%c JP %c Oh hey, you found the developer entrance. ',
  'background:#ff3838;color:#fff;font-size:22px;font-weight:900;padding:8px 10px;border-radius:4px 0 0 4px;',
  'background:#f4f1eb;color:#0d0d0d;font-size:16px;font-weight:800;padding:11px 14px;border-radius:0 4px 4px 0;'
);
console.log(
  '%c☕ Built with a shitton of coffee %c and a suspicious amount of curiosity.',
  'color:#ff3838;font-size:14px;font-weight:900;',
  'color:#888;font-size:14px;'
);
console.log(
  '%c↑ ↑ ↓ ↓ ← → ← → B A',
  'background:linear-gradient(90deg,#ff3838,#ff8a38);color:white;font-size:13px;font-weight:900;padding:6px 10px;border-radius:4px;'
);
console.log('%cYour old cheat-code knowledge may finally be useful.', 'color:#aaa;font-style:italic;');

const heroStatus = document.querySelector('.ring-blue')?.closest('p');
if (heroStatus) {
  heroStatus.title = 'Probably debugging something that worked yesterday.';
  heroStatus.classList.add('cursor-help');
  const uptime = document.createElement('span');
  uptime.className = 'hidden border-l border-line pl-3 text-ink/40 sm:inline';
  uptime.textContent = 'Operational, according to my laptop.';
  heroStatus.appendChild(uptime);
}

const productionCounter = document.createElement('button');
productionCounter.type = 'button';
productionCounter.className = 'mt-5 text-left text-xs font-bold uppercase tracking-[.15em] text-ink/40 transition-colors hover:text-blue';
productionCounter.textContent = 'Days without breaking production: 0';
productionCounter.title = 'Click to improve this extremely scientific metric.';
heroStatus?.parentElement?.appendChild(productionCounter);
let safeDays = 0;
productionCounter.addEventListener('click', () => {
  safeDays += 1;
  if (safeDays === 4) { safeDays = 0; showEasterEgg('Counter reset. We do not discuss the incident.'); }
  productionCounter.textContent = `Days without breaking production: ${safeDays}`;
});

const logo = document.querySelector('header a[href="#top"]');
let logoClicks = 0;
let seniorMode = false;
logo?.addEventListener('click', () => {
  logoClicks += 1;
  if (logoClicks < 5) return;
  logoClicks = 0;
  seniorMode = !seniorMode;
  document.querySelectorAll('.font-mono.text-6xl').forEach((number) => {
    if (!number.dataset.original) number.dataset.original = number.textContent.trim();
    const original = Number.parseInt(number.dataset.original, 10);
    number.textContent = seniorMode && Number.isFinite(original) ? String(original + 10).padStart(2, '0') : number.dataset.original;
  });
  showEasterEgg(seniorMode ? 'Senior developer mode enabled: +10 years of experience. Recruiters hate this one trick.' : 'Senior developer mode disabled. Back to honest arithmetic.');
});

const hireLink = document.querySelector('#contact a[href^="mailto:"]');
if (hireLink) {
  const originalHireText = hireLink.textContent;
  const praise = () => { hireLink.textContent = 'Excellent decision →'; };
  const restore = () => { hireLink.textContent = originalHireText; };
  hireLink.addEventListener('mouseenter', praise); hireLink.addEventListener('mouseleave', restore);
  hireLink.addEventListener('focus', praise); hireLink.addEventListener('blur', restore);
}

document.querySelectorAll('span').forEach((item) => {
  if (item.textContent.trim() === 'Docker') { item.title = "It's containers all the way down."; item.classList.add('cursor-help'); }
});

const footerInner = document.querySelector('footer > div');
if (footerInner) {
  const diagnostics = document.createElement('div');
  diagnostics.className = 'flex flex-wrap gap-x-4 gap-y-2 text-[10px] text-ink/30 sm:justify-end';
  diagnostics.innerHTML = '<span>v20.03 - fewer bugs, more coffee</span><span>Last incident: the CSS looked fine in Chrome</span>';
  footerInner.appendChild(diagnostics);
}

if (year) {
  year.classList.add('cursor-pointer', 'hover:text-blue');
  year.title = 'Time is just another undocumented dependency.';
  year.setAttribute('role', 'button'); year.setAttribute('tabindex', '0');
  const revealTime = () => showEasterEgg('Time is just another undocumented dependency.');
  year.addEventListener('click', revealTime);
  year.addEventListener('keydown', (event) => { if (event.key === 'Enter' || event.key === ' ') revealTime(); });
}

