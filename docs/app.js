const sources = [
  { id: 1, title: "World Leaders Summit Oxford page", type: "Event context", path: "../sources/01_event_context/world-leaders-summit-oxford.html" },
  { id: 2, title: "G20 Inclusive Business Framework", type: "Framework", path: "../sources/02_frameworks/g20-inclusive-business-framework.pdf" },
  { id: 3, title: "G20 Inclusive Business Framework Annexes", type: "Framework annexes", path: "../sources/02_frameworks/g20-inclusive-business-framework-annexes.pdf" },
  { id: 4, title: "G20 Inclusive Business Activities Update", type: "Implementation update", path: "../sources/02_frameworks/g20-inclusive-business-activities-update-2018.pdf" },
  { id: 5, title: "UNDP hosted G20 Inclusive Business Framework", type: "Framework mirror", path: "../sources/02_frameworks/undp-g20-inclusive-business-framework-final.pdf" },
  { id: 6, title: "BSR Business Leadership for an Inclusive Economy", type: "Framework", path: "../sources/02_frameworks/bsr-business-leadership-for-an-inclusive-economy.pdf" },
  { id: 7, title: "IFC Shared Prosperity Through Inclusive Business", type: "Framework", path: "../sources/02_frameworks/ifc-shared-prosperity-through-inclusive-business.pdf" },
  { id: 8, title: "IFC Inclusive Business Investing Guide", type: "Investment guide", path: "../sources/02_frameworks/ifc-inclusive-business-investing-guide.pdf" },
  { id: 9, title: "IFC Stakeholder Engagement Handbook", type: "Engagement guide", path: "../sources/02_frameworks/ifc-stakeholder-engagement-handbook.pdf" },
  { id: 10, title: "IFC Being the Change: Inclusive Business", type: "Implementation examples", path: "../sources/02_frameworks/ifc-being-the-change-inclusive-business.pdf" },
  { id: 11, title: "WEF Lighthouse Action on Social Justice Through Stakeholder Inclusion", type: "Insight report", path: "../sources/02_frameworks/wef-lighthouse-action-social-justice-through-stakeholder-inclusion.pdf" },
  { id: 12, title: "WEF Corporate Social Innovation Compass 2024", type: "Insight report", path: "../sources/02_frameworks/wef-corporate-social-innovation-compass-2024.pdf" },
  { id: 13, title: "WEF State of Social Enterprise 2024", type: "Insight report", path: "../sources/02_frameworks/wef-state-of-social-enterprise-2024.pdf" },
  { id: 14, title: "Acumen UK Fellowship Impact Report", type: "Leadership ecosystem report", path: "../sources/02_frameworks/acumen-uk-fellowship-impact-report-2023-2024.pdf" },
  { id: 15, title: "FSG Shared Value Guide", type: "Shared value framework", path: "../sources/02_frameworks/fsg-shared-value-guide.pdf" },
  { id: 16, title: "FSG The Water of Systems Change", type: "Systems-change framework", path: "../sources/02_frameworks/fsg-the-water-of-systems-change.pdf" },
  { id: 17, title: "BSR Co-creating Climate Justice With Communities", type: "Co-creation guide", path: "../sources/02_frameworks/bsr-co-creating-climate-justice-with-communities.pdf" },
  { id: 18, title: "UNDP Creating Value for All", type: "Case report", path: "../sources/03_case_studies/undp-creating-value-for-all.pdf" },
  { id: 19, title: "UNDP New Horizons: Inclusive Business in the Philippines", type: "Country study", path: "../sources/03_case_studies/undp-new-horizons-inclusive-business-philippines.pdf" },
  { id: 20, title: "UNDP Business+ Brazil", type: "Country study", path: "../sources/03_case_studies/undp-business-plus-brazil.pdf" },
  { id: 21, title: "OECD Community Wealth Building for a Well-being Economy", type: "Policy paper", path: "../sources/03_case_studies/oecd-community-wealth-building-for-a-well-being-economy.pdf" },
  { id: 22, title: "OECD Empowering Communities With Platform Cooperatives", type: "Policy paper", path: "../sources/03_case_studies/oecd-empowering-communities-with-platform-cooperatives.pdf" },
  { id: 23, title: "OECD Job Creation and Local Economic Development 2023", type: "Policy report", path: "../sources/03_case_studies/oecd-job-creation-and-local-economic-development-2023.pdf" },
  { id: 24, title: "OECD Social Economy in Europe Policy Highlights", type: "Policy highlights", path: "../sources/03_case_studies/oecd-social-economy-in-europe-policy-highlights.pdf" },
  { id: 25, title: "Democracy Collaborative Community Wealth Building Action Guide", type: "Action guide", path: "../sources/03_case_studies/democracy-collaborative-community-wealth-building-action-guide.pdf" },
  { id: 26, title: "Brookings Community-Centered Economic Inclusion Playbook", type: "Playbook", path: "../sources/03_case_studies/brookings-community-centered-economic-inclusion-playbook.pdf" },
  { id: 27, title: "Urban Institute / NCBA CLUSA Policy Strategies for an Inclusive Economy With Cooperatives", type: "Policy strategies", path: "../sources/03_case_studies/urban-ncba-policy-strategies-for-an-inclusive-economy-with-cooperatives.pdf" },
  { id: 28, title: "Oxford Inclusive Growth Seminar Series", type: "Local Oxford material", path: "../sources/04_local_oxford/oxford-inclusive-growth-seminar-series-2019.pdf" },
  { id: 29, title: "Oxfordshire Strategic Economic Plan 2024", type: "Local Oxfordshire strategy", path: "../sources/04_local_oxford/oxfordshire-strategic-economic-plan-2024.pdf" }
];

const slides = [...document.querySelectorAll(".slide")];
const nav = document.getElementById("slideNav");
const overviewGrid = document.getElementById("overviewGrid");
const progressBar = document.getElementById("progressBar");
const slideIndex = document.getElementById("slideIndex");
const slideTitle = document.getElementById("slideTitle");
const sourceList = document.getElementById("sourceList");
const currentSourceSummary = document.getElementById("currentSourceSummary");
const sourcesDrawer = document.getElementById("sourcesDrawer");
const overviewPanel = document.getElementById("overviewPanel");
const prevSlideButton = document.getElementById("prevSlide");
const nextSlideButton = document.getElementById("nextSlide");

let currentSlideIndex = 0;
let currentSourceView = "slide";

function getSourceNumbers(slide) {
  return (slide.dataset.sources || "")
    .split(",")
    .map((item) => Number(item.trim()))
    .filter(Boolean);
}

function buildNavigation() {
  slides.forEach((slide, index) => {
    const title = slide.dataset.title || `Slide ${index + 1}`;

    const anchor = document.createElement("a");
    anchor.href = `#${slide.id}`;
    anchor.className = "rail-link";
    anchor.dataset.index = index;
    anchor.dataset.label = `${index + 1}. ${title}`;
    anchor.setAttribute("aria-label", title);
    nav.appendChild(anchor);

    const card = document.createElement("button");
    card.type = "button";
    card.className = "overview-card";
    card.dataset.index = index;
    card.innerHTML = `<strong>${index + 1}. ${title}</strong><span>${getSourceNumbers(slide).length} cited source(s)</span>`;
    overviewGrid.appendChild(card);
  });
}

function renderSources() {
  const slide = slides[currentSlideIndex];
  const activeSourceIds = getSourceNumbers(slide);

  currentSourceSummary.textContent =
    currentSourceView === "slide"
      ? `${activeSourceIds.length} source(s) are highlighted for "${slide.dataset.title}".`
      : `All 29 downloaded sources are listed below. Items tied to this slide stay highlighted.`;

  sourceList.innerHTML = "";

  sources.forEach((source) => {
    const isRelevant = activeSourceIds.includes(source.id);
    if (currentSourceView === "slide" && !isRelevant) return;

    const item = document.createElement("article");
    item.className = `source-item${currentSourceView === "all" && !isRelevant ? " is-muted" : ""}`;
    item.innerHTML = `
      <div class="source-item__top">
        <span class="source-item__index">[${source.id}]</span>
        <div class="source-item__title">${source.title}</div>
      </div>
      <div class="source-item__meta">${source.type}</div>
      <a class="source-item__link" href="${source.path}" target="_blank" rel="noopener noreferrer">Open source ↗</a>
    `;
    sourceList.appendChild(item);
  });
}

function updateUI(index, pushHash = true) {
  currentSlideIndex = index;
  const slide = slides[index];
  const percent = ((index + 1) / slides.length) * 100;

  document.querySelectorAll(".rail-link").forEach((link, linkIndex) => {
    link.classList.toggle("is-active", linkIndex === index);
  });

  slideIndex.textContent = `${index + 1} / ${slides.length}`;
  slideTitle.textContent = slide.dataset.title || slide.id;
  progressBar.style.width = `${percent}%`;
  renderSources();

  if (pushHash) {
    history.replaceState(null, "", `#${slide.id}`);
  }
}

function goToSlide(index) {
  const safeIndex = Math.max(0, Math.min(index, slides.length - 1));
  slides[safeIndex].scrollIntoView({ behavior: "smooth", block: "start" });
  updateUI(safeIndex);
}

function initObserver() {
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];

      if (!visible) return;
      const index = slides.findIndex((slide) => slide === visible.target);
      if (index >= 0 && index !== currentSlideIndex) {
        updateUI(index);
      }
    },
    { threshold: [0.35, 0.55, 0.75] }
  );

  slides.forEach((slide) => observer.observe(slide));
}

function initCounters() {
  const counters = [...document.querySelectorAll("[data-counter]")];
  const observer = new IntersectionObserver(
    (entries, obs) => {
      entries.forEach((entry) => {
        if (!entry.isIntersecting) return;
        const el = entry.target;
        if (el.dataset.done === "true") {
          obs.unobserve(el);
          return;
        }

        const value = Number(el.dataset.counter);
        const prefix = el.dataset.prefix || "";
        const suffix = el.dataset.suffix || "";
        const start = performance.now();
        const duration = 1200;

        const tick = (now) => {
          const progress = Math.min((now - start) / duration, 1);
          const eased = 1 - Math.pow(1 - progress, 3);
          const display = value * eased;
          el.textContent = `${prefix}${display.toFixed(value >= 10 ? 0 : 1).replace(".0", "")}${suffix}`;
          if (progress < 1) {
            requestAnimationFrame(tick);
          } else {
            el.dataset.done = "true";
          }
        };

        requestAnimationFrame(tick);
        obs.unobserve(el);
      });
    },
    { threshold: 0.6 }
  );

  counters.forEach((counter) => observer.observe(counter));
}

function initSwitchGroups() {
  const buttons = document.querySelectorAll("[data-switch-target]");
  buttons.forEach((button) => {
    button.addEventListener("click", () => {
      const group = button.closest("[data-switch-group]");
      if (!group) return;
      const target = button.dataset.switchTarget;

      group.querySelectorAll("[data-switch-target]").forEach((item) => {
        item.classList.toggle("switch-btn--active", item === button);
      });

      group.querySelectorAll("[data-panel]").forEach((panel) => {
        panel.classList.toggle("switch-panel--active", panel.dataset.panel === target);
      });
    });
  });
}

function togglePanel(panel, forceOpen) {
  const shouldOpen = forceOpen ?? !panel.classList.contains("is-open");
  panel.classList.toggle("is-open", shouldOpen);
  panel.setAttribute("aria-hidden", String(!shouldOpen));
}

function initPanels() {
  document.getElementById("toggleSources").addEventListener("click", () => togglePanel(sourcesDrawer));
  document.getElementById("toggleOverview").addEventListener("click", () => togglePanel(overviewPanel));
  document.getElementById("toggleNotes").addEventListener("click", () => {
    document.body.classList.toggle("show-notes");
  });

  document.querySelectorAll("[data-close]").forEach((button) => {
    button.addEventListener("click", () => {
      const panel = document.getElementById(button.dataset.close);
      if (panel) togglePanel(panel, false);
    });
  });

  document.querySelectorAll("[data-source-view]").forEach((button) => {
    button.addEventListener("click", () => {
      currentSourceView = button.dataset.sourceView;
      document.querySelectorAll("[data-source-view]").forEach((btn) => {
        btn.classList.toggle("tab-btn--active", btn === button);
      });
      renderSources();
    });
  });
}

function initControls() {
  prevSlideButton.addEventListener("click", () => goToSlide(currentSlideIndex - 1));
  nextSlideButton.addEventListener("click", () => goToSlide(currentSlideIndex + 1));

  document.addEventListener("click", (event) => {
    const railLink = event.target.closest(".rail-link");
    const overviewCard = event.target.closest(".overview-card");

    if (railLink) {
      event.preventDefault();
      goToSlide(Number(railLink.dataset.index));
    }

    if (overviewCard) {
      goToSlide(Number(overviewCard.dataset.index));
      togglePanel(overviewPanel, false);
    }
  });

  document.addEventListener("keydown", (event) => {
    if (event.key === "ArrowDown" || event.key === "ArrowRight" || event.key === "PageDown") {
      event.preventDefault();
      goToSlide(currentSlideIndex + 1);
    }
    if (event.key === "ArrowUp" || event.key === "ArrowLeft" || event.key === "PageUp") {
      event.preventDefault();
      goToSlide(currentSlideIndex - 1);
    }
    if (event.key.toLowerCase() === "s") {
      togglePanel(sourcesDrawer);
    }
    if (event.key.toLowerCase() === "n") {
      document.body.classList.toggle("show-notes");
    }
    if (event.key.toLowerCase() === "o") {
      togglePanel(overviewPanel);
    }
    if (event.key === "Escape") {
      togglePanel(overviewPanel, false);
      togglePanel(sourcesDrawer, false);
    }
  });
}

function initHashRoute() {
  const hash = window.location.hash.replace("#", "");
  if (!hash) {
    updateUI(0, false);
    return;
  }
  const index = slides.findIndex((slide) => slide.id === hash);
  if (index >= 0) {
    slides[index].scrollIntoView({ behavior: "auto", block: "start" });
    updateUI(index, false);
  } else {
    updateUI(0, false);
  }
}

buildNavigation();
initObserver();
initCounters();
initSwitchGroups();
initPanels();
initControls();
initHashRoute();
