const languageButtons = document.querySelectorAll("[data-language]");
const translatedElements = document.querySelectorAll("[data-en][data-fr]");
const englishCopies = document.querySelectorAll(".lang-en");
const frenchCopies = document.querySelectorAll(".lang-fr");
const languageKey = "abdz-eleonora-language";
const newYorkGallery = document.querySelector("#new-york");
const galleryToggle = document.querySelector(".gallery-toggle");
const galleryClose = document.querySelector(".gallery-close");

function setTextWithBreaks(element, value) {
  const parts = String(value).split("|");
  element.replaceChildren();
  parts.forEach((part, index) => {
    if (index) element.appendChild(document.createElement("br"));
    element.appendChild(document.createTextNode(part));
  });
}

function setLanguage(language) {
  const activeLanguage = language === "fr" ? "fr" : "en";
  document.documentElement.lang = activeLanguage;

  translatedElements.forEach(element => {
    setTextWithBreaks(element, element.dataset[activeLanguage]);
  });

  englishCopies.forEach(element => { element.hidden = activeLanguage !== "en"; });
  frenchCopies.forEach(element => { element.hidden = activeLanguage !== "fr"; });

  languageButtons.forEach(button => {
    const isActive = button.dataset.language === activeLanguage;
    button.classList.toggle("is-active", isActive);
    button.setAttribute("aria-pressed", String(isActive));
  });

  document.title = activeLanguage === "fr"
    ? "ABDZ Creations | Une lettre visuelle pour Eleonora Srugo"
    : "ABDZ Creations | A Visual Letter for Eleonora Srugo";
  localStorage.setItem(languageKey, activeLanguage);
}

languageButtons.forEach(button => {
  button.addEventListener("click", () => setLanguage(button.dataset.language));
});

function setGalleryOpen(isOpen) {
  if (!newYorkGallery || !galleryToggle) return;
  newYorkGallery.hidden = !isOpen;
  galleryToggle.setAttribute("aria-expanded", String(isOpen));
  document.body.classList.toggle("gallery-is-open", isOpen);
  if (isOpen) {
    newYorkGallery.scrollTop = 0;
    galleryClose?.focus();
  } else {
    galleryToggle.focus();
  }
}

galleryToggle?.addEventListener("click", () => setGalleryOpen(true));
galleryClose?.addEventListener("click", () => setGalleryOpen(false));
newYorkGallery?.addEventListener("click", event => {
  if (event.target === newYorkGallery) setGalleryOpen(false);
});
document.addEventListener("keydown", event => {
  if (event.key === "Escape" && newYorkGallery && !newYorkGallery.hidden) {
    setGalleryOpen(false);
  }
});

setLanguage(localStorage.getItem(languageKey) || "en");
