document.documentElement.classList.add("site-js");

const siteWindow = document.querySelector(".terminal-window");
const desktop = document.querySelector("#desktop");
const closeSiteWindow = document.querySelector("#close-site-window");
const openSiteWindow = document.querySelector("#open-site-window");

let savedScrollPosition = 0;

function showDesktop() {
  savedScrollPosition = window.scrollY;
  siteWindow.hidden = true;
  desktop.hidden = false;
  document.body.classList.add("desktop-open");
  openSiteWindow.focus();
}

function showSiteWindow() {
  desktop.hidden = true;
  siteWindow.hidden = false;
  document.body.classList.remove("desktop-open");
  window.requestAnimationFrame(() => {
    window.scrollTo(0, savedScrollPosition);
    closeSiteWindow.focus();
  });
}

closeSiteWindow.addEventListener("click", showDesktop);
openSiteWindow.addEventListener("click", showSiteWindow);
