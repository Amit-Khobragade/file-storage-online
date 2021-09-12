const invisibleClass = "invisible";
const shade = document.getElementById("shade");

function toggleShade() {
    shade.classList.toggle(invisibleClass);
}

window.addEventListener("load", () => {
    document.body.style.visibility = "visible";
});
