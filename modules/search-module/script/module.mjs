const searchModule = (function () {
    const cancelEvent = new Event("searchClosed");
    const searchBtn = document.getElementById("search");
    searchBtn.addEventListener("click", () => {
        toggleShade();
        searchBtn.classList.toggle("expanded");
        searchBtn.value = "";
    });
    function isVisible() {
        return searchBtn.classList.contains("expanded");
    }
    return {
        cancelEvent: cancelEvent,
        isVisible: isVisible,
    };
})();

export default searchModule;
