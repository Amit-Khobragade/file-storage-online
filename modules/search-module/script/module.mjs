import globalObj from "../../../global/script/global.mjs";
import SearchInstance from "../../../Data/searchInstance.mjs";
import viewHandler from "../../view-module/script/module.mjs";

const searchBtn = document.getElementById("search");
const searchResults = document.getElementById("search-results");
var searchInstance = null;

// *=====================================================================
// *==========================functions==================================

function clearSearchResults() {
    while (searchResults.hasChildNodes()) {
        searchResults.firstElementChild.remove();
    }
}

function addToResults(obj) {
    searchResults.append(viewHandler.viewableObjectCreator(obj));
}

function isVisible() {
    return !searchBtn.classList.contains(globalObj.invisibleClass);
}

function toggleVisibility() {
    clearSearchResults();
    globalObj.toggleShade();
    searchBtn.classList.toggle(globalObj.invisibleClass);
    searchBtn.value = "";
    searchResults.classList.toggle(globalObj.invisibleClass);
}

// *==========================================================
// *=====================event listeners======================
searchBtn.addEventListener("click", toggleVisibility);
searchBtn.addEventListener("input", () => {
    if (
        !viewHandler.currentFolder ||
        !viewHandler.currentFolder instanceof SearchInstance
    ) {
        throw "current folder not set in search";
    }
    clearSearchResults();
    if (searchInstance instanceof SearchInstance) {
        searchInstance.stop();
    }
    searchInstance = new SearchInstance(
        viewHandler.currentFolder,
        searchBtn.value,
        addToResults
    );
    searchInstance.startSearch();
});

const searchModule = {
    isVisible: isVisible,
    toggleVisibility: toggleVisibility,
};

export default searchModule;
