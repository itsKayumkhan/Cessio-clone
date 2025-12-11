// SELECTORS (same as yours)
const userProfileDropDown = document.querySelector(".user-dropdown-menu");
const userBtn = document.querySelector(".user-button");

const navDropDown = document.querySelector(".dropdown");
const navDropDownMenu = document.querySelector(".dropdown-menu");

const suggestionsSearch = document.querySelector(".search-input");
const suggestionsSearchList = document.querySelector(".suggestions-dropdown");

const filter = document.querySelector(".filter-button");
const filterOverlay = document.querySelector(".filter-popup-overlay");
const filterCloseBtn = document.querySelector(".close-button");

// HELPER
function setupHover(trigger, menu) {
    if (!trigger || !menu) return;

    const show = () => menu.classList.add("show");
    const hideIfOutside = (e, other) => {
        if (!e.relatedTarget || !other.contains(e.relatedTarget)) menu.classList.remove("show");
    };

    trigger.addEventListener("mouseover", show);
    menu.addEventListener("mouseover", show);

    trigger.addEventListener("mouseout", (e) => hideIfOutside(e, menu));
    menu.addEventListener("mouseout", (e) => hideIfOutside(e, trigger));
}

// APPLY
setupHover(userBtn, userProfileDropDown);
setupHover(navDropDown, navDropDownMenu);

// SUGGESTIONS
if (suggestionsSearch && suggestionsSearchList) {
    const show = () => suggestionsSearchList.classList.add("show");
    const hide = () => suggestionsSearchList.classList.remove("show");

    suggestionsSearch.addEventListener("focus", () => {
        if (suggestionsSearch.value.trim()) show();
    });
    suggestionsSearch.addEventListener("input", () => {
        if (suggestionsSearch.value.trim()) show();
        else hide();
    });

    suggestionsSearchList.addEventListener("mouseover", show);
    suggestionsSearchList.addEventListener("mouseout", (e) => {
        if (!e.relatedTarget || !suggestionsSearch.contains(e.relatedTarget)) hide();
    });

    suggestionsSearch.addEventListener("blur", (e) => {
        if (!e.relatedTarget || !suggestionsSearchList.contains(e.relatedTarget)) hide();
    });

    suggestionsSearchList.addEventListener("mousedown", (e) => {
        e.preventDefault();
    });

    suggestionsSearch.addEventListener("keydown", (e) => {
        const items = Array.from(suggestionsSearchList.querySelectorAll("[role='option'], li, .suggestion-item")).filter(Boolean);
        if (!items.length) return;

        const active = suggestionsSearchList.querySelector(".active");
        let idx = active ? items.indexOf(active) : -1;

        if (e.key === "ArrowDown") {
            e.preventDefault();
            if (idx < items.length - 1) {
                if (active) active.classList.remove("active");
                items[++idx].classList.add("active");
                items[idx].scrollIntoView({ block: "nearest" });
            }
            show();
        } else if (e.key === "ArrowUp") {
            e.preventDefault();
            if (idx > 0) {
                if (active) active.classList.remove("active");
                items[--idx].classList.add("active");
                items[idx].scrollIntoView({ block: "nearest" });
            }
            show();
        } else if (e.key === "Enter") {
            if (active) {
                e.preventDefault();
                active.click();
                hide();
            }
        } else if (e.key === "Escape") {
            hide();
            suggestionsSearch.blur();
        }
    });
}

// FILTER (guarded)
if (filter && filterOverlay && filterCloseBtn) {
    filter.addEventListener("click", () => {
        filterOverlay.classList.add("show");
    });

    filterCloseBtn.addEventListener("click", () => {
        filterOverlay.classList.remove("show");
    });

    filterOverlay.addEventListener("click", (e) => {
        if (e.target === filterOverlay) filterOverlay.classList.remove("show");
    });
}

// MOBILE MENU
const menuBtn = document.querySelector(".mobile-menu-button");
const hamburger = document.querySelector(".hamburger");
const mobileClose = document.querySelector(".mobile-close");
const mobileNav = document.querySelector(".mobile-nav");
const mobileOverlay = document.querySelector(".mobile-overlay");

const open = () => {
  hamburger?.classList.add("active");
  mobileNav?.classList.add("active");
  mobileOverlay?.classList.add("active");
  document.body.classList.add("no-scroll");
  menuBtn?.setAttribute("aria-expanded", "true");
};
const close = () => {
  hamburger?.classList.remove("active");
  mobileNav?.classList.remove("active");
  mobileOverlay?.classList.remove("active");
  document.body.classList.remove("no-scroll");
  menuBtn?.setAttribute("aria-expanded", "false");
};

menuBtn?.addEventListener("click", () => {
  if (mobileNav?.classList.contains("active")) close();
  else open();
});
mobileClose?.addEventListener("click", close);
mobileOverlay?.addEventListener("click", (e) => {
  if (e.target === mobileOverlay) close();
});
document.addEventListener("keydown", (e) => {
  if (e.key === "Escape") close();
});

  