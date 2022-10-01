const pageReactiveMenuBtn = document.querySelector(".page-reactive");
const downSVG = document.createElement("svg");
const path = document.createElement("path");

path.d = "M8.59,16.58L13.17,12L8.59,7.41L10,6L16,12L10,18L8.59,16.58Z";

downSVG.className = "fill-current";
downSVG.xmlns = "http://www.w3.org/2000/svg";
downSVG.width = 24;
downSVG.height = 24;
downSVG.appendChild(path);

pageReactiveMenuBtn.innerHTML = (() => {
  const currentPath = window.location.pathname.replace("/", "");

  if (currentPath === "") {
    return "Home";
  } else {
    return currentPath && typeof currentPath === "string"
      ? currentPath.charAt(0).toUpperCase() + currentPath.slice(1)
      : "";
  }
})();
