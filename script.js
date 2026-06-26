(function () {
  const data = window.SUMMIT_DATA || { agenda: [], voices: [] };

  // ---- agenda ----
  const agendaEl = document.getElementById('agenda-list');
  if (agendaEl) {
    agendaEl.innerHTML = data.agenda.map(day => `
      <li class="agenda__day reveal">
        <div class="agenda__when">
          <small>${day.day}</small>
          ${day.date}
        </div>
        <div class="agenda__items">
          ${day.items.map(it => `
            <div class="agenda__item">
              <div class="agenda__time">${it.time}</div>
              <div>
                <h4 class="agenda__title">${it.title}</h4>
                <p class="agenda__desc">${it.desc}</p>
              </div>
            </div>
          `).join('')}
        </div>
      </li>
    `).join('');
  }

  // ---- voices ----
  const voicesEl = document.getElementById('voices-list');
  if (voicesEl) {
    voicesEl.innerHTML = data.voices.map(v => `
      <article class="voice reveal">
        <div class="voice__avatar">${v.initials}</div>
        <h3 class="voice__name">${v.name}</h3>
        <p class="voice__role">${v.role}</p>
        <p class="voice__bio">${v.bio}</p>
      </article>
    `).join('');
  }

  // ---- reveal on scroll ----
  const io = new IntersectionObserver((entries) => {
    entries.forEach(e => {
      if (e.isIntersecting) {
        e.target.classList.add('in');
        io.unobserve(e.target);
      }
    });
  }, { threshold: 0.12 });
  document.querySelectorAll('.reveal').forEach(el => io.observe(el));

  // ---- smooth anchor scroll ----
  document.querySelectorAll('a[href^="#"]').forEach(a => {
    a.addEventListener('click', (e) => {
      const id = a.getAttribute('href');
      if (id && id.length > 1) {
        const el = document.querySelector(id);
        if (el) {
          e.preventDefault();
          el.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
      }
    });
  });
})();
