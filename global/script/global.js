const invisibleClass = "invisible";
const shade = document.getElementById("shade");

function createh1(text) {
    const h1 = document.createElement("h1");
    h1.append(document.createTextNode(`${text}`));
    return h1;
}

function toggleShade() {
    shade.classList.toggle(invisibleClass);
}

window.addEventListener("load", () => {
    document.body.style.visibility = "visible";
});
