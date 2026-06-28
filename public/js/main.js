// public/js/main.js
// Front-end em JS puro: busca os dados na API do Express e renderiza
// o placar, a campanha de 2026 e a linha do tempo das Copas.

document.addEventListener("DOMContentLoaded", () => {
  initScrollProgress();
  initScoreboardCount();
  loadLive2026();
  loadTimeline();
});

/* ---------------------------------------------------------------- */
/* Barra de progresso de rolagem no topo                             */
/* ---------------------------------------------------------------- */
function initScrollProgress() {
  const bar = document.getElementById("scrollProgress");
  window.addEventListener("scroll", () => {
    const max = document.documentElement.scrollHeight - window.innerHeight;
    const pct = max > 0 ? (window.scrollY / max) * 100 : 0;
    bar.style.width = `${pct}%`;
  });
}

/* ---------------------------------------------------------------- */
/* Placar do hero: conta de 0 até o número de títulos                */
/* ---------------------------------------------------------------- */
async function initScoreboardCount() {
  const digit = document.getElementById("titleCount");
  let total = 5;

  try {
    const res = await fetch("/api/resumo");
    if (res.ok) {
      const data = await res.json();
      total = data.titulos;
    }
  } catch (err) {
    console.warn("Não foi possível buscar /api/resumo, usando valor padrão.", err);
  }

  let current = 0;
  const step = () => {
    current += 1;
    digit.textContent = current;
    digit.classList.remove("is-flipping");
    // força reflow para repetir a animação
    void digit.offsetWidth;
    digit.classList.add("is-flipping");
    if (current < total) {
      setTimeout(step, 260);
    }
  };
  step();
}

/* ---------------------------------------------------------------- */
/* Seção "ao vivo" da Copa 2026                                      */
/* ---------------------------------------------------------------- */
async function loadLive2026() {
  const container = document.getElementById("live2026");

  let data;
  try {
    const res = await fetch("/api/copa-2026");
    data = await res.json();
  } catch (err) {
    container.innerHTML = `<p class="live__loading">Não foi possível carregar os dados agora.</p>`;
    return;
  }

  container.innerHTML = "";

  data.jogos.forEach(jogo => {
    const card = document.createElement("article");
    card.className = "match-card";

    const statusLabel = jogo.status === "encerrado" ? "Encerrado" : "Agendado";

    let middle;
    if (jogo.status === "encerrado") {
      middle = `<span class="match-card__score">${jogo.placar}</span>`;
    } else {
      middle = `<span class="match-card__countdown" data-date="${jogo.data}">calculando…</span>`;
    }

    card.innerHTML = `
      <div class="match-card__top">
        <span class="match-card__status--${jogo.status}">${statusLabel}</span>
        <span>Grupo ${data.grupo}</span>
      </div>
      <div class="match-card__matchup">Brasil x ${jogo.adversario}</div>
      ${middle}
      <p class="match-card__detail">${jogo.detalhe}</p>
    `;
    container.appendChild(card);
  });

  startCountdowns();
}

function startCountdowns() {
  const els = document.querySelectorAll("[data-date]");
  if (!els.length) return;

  const tick = () => {
    const now = new Date();
    els.forEach(el => {
      const target = new Date(el.dataset.date);
      const diff = target - now;
      if (diff <= 0) {
        el.textContent = "em campo agora";
        return;
      }
      const days = Math.floor(diff / (1000 * 60 * 60 * 24));
      const hours = Math.floor((diff / (1000 * 60 * 60)) % 24);
      const mins = Math.floor((diff / (1000 * 60)) % 60);
      el.textContent = `em ${days}d ${hours}h ${mins}min`;
    });
  };

  tick();
  setInterval(tick, 60 * 1000);
}

/* ---------------------------------------------------------------- */
/* Linha do tempo das 23 Copas                                       */
/* ---------------------------------------------------------------- */
async function loadTimeline() {
  const list = document.getElementById("timeline");

  let copas = [];
  try {
    const res = await fetch("/api/copas");
    copas = await res.json();
  } catch (err) {
    list.innerHTML = `<li class="live__loading">Não foi possível carregar o histórico.</li>`;
    return;
  }

  // ordena da edição mais recente para a mais antiga
  copas.sort((a, b) => b.ano - a.ano);

  copas.forEach(copa => {
    const li = document.createElement("li");
    li.className = "tl-card";
    li.dataset.tier = copa.tier;
    li.tabIndex = 0;

    li.innerHTML = `
      <div class="tl-card__row">
        <span class="tl-card__year">${copa.ano}</span>
        <span class="tl-card__sede">${copa.sede}</span>
        <span class="tl-card__pill">${copa.fase}</span>
      </div>
      <div class="tl-card__body">
        <p class="tl-card__resumo">${copa.resumo}</p>
        <p class="tl-card__artilheiro">⚽ Artilheiro do Brasil: ${copa.artilheiro}</p>
      </div>
      <div class="tl-card__toggle">toque para ver detalhes</div>
    `;

    const toggle = () => {
      li.classList.toggle("is-open");
      const label = li.querySelector(".tl-card__toggle");
      label.textContent = li.classList.contains("is-open") ? "toque para recolher" : "toque para ver detalhes";
    };

    li.addEventListener("click", toggle);
    li.addEventListener("keypress", e => {
      if (e.key === "Enter" || e.key === " ") {
        e.preventDefault();
        toggle();
      }
    });

    list.appendChild(li);
  });

  initFilters();
}

/* ---------------------------------------------------------------- */
/* Filtros por resultado                                             */
/* ---------------------------------------------------------------- */
function initFilters() {
  const buttons = document.querySelectorAll(".filter-btn");
  const cards = document.querySelectorAll(".tl-card");

  buttons.forEach(btn => {
    btn.addEventListener("click", () => {
      buttons.forEach(b => b.classList.remove("is-active"));
      btn.classList.add("is-active");

      const filter = btn.dataset.filter;
      const tiers = filter.split(",");

      cards.forEach(card => {
        const show = filter === "todos" || tiers.includes(card.dataset.tier);
        card.classList.toggle("is-hidden", !show);
      });
    });
  });
}
