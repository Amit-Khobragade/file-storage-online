const searchModule = (function () {
    const cancelEvent = new Event("searchClosed");
    const searchBtn = document.getElementById("search");
    const searchResults = document.getElementById("search-results");
    searchBtn.addEventListener("click", toggleVisibility);
    function isVisible() {
        return searchBtn.classList.contains("expanded");
    }
    function toggleVisibility() {
        toggleShade();
        searchBtn.classList.toggle("expanded");
        searchBtn.value = "";
        searchResults.classList.toggle(invisibleClass);
    }
    return {
        cancelEvent: cancelEvent,
        isVisible: isVisible,
        toggleVisibility: toggleVisibility,
    };
})();

export default searchModule;
