const globalObj = {
    invisibleClass: "invisible",
    toggleShade: toggleShade,
};
const shade = document.getElementById("shade");

function toggleShade() {
    shade.classList.toggle(globalObj.invisibleClass);
}

window.addEventListener("load", () => {
    document.body.style.visibility = "visible";
});

export default globalObj;
