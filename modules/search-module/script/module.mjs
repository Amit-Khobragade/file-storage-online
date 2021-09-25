import globalObj from "../../../global/script/global.mjs";
import SearchInstance from "../../../Data/searchInstance.mjs";
import Folder from "../../../Data/folder.mjs";
import viewHandler from "../../view-module/script/module.mjs";

const cancelEvent = new Event("searchClosed");
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
    var viewItem = document.createElement("div");
    var itemName = document.createElement("p");
    var itemImg = document.createElement("img");
    viewItem.classList.add("view-item");
    itemName.append(document.createTextNode(obj.name));
    if (obj instanceof Folder) {
        itemImg.src = "./images/folder-1.svg";
        itemImg.alt = "folder";
    } else {
        viewItem.classList.add("file");
        itemImg.src = "./images/file.svg";
        itemImg.alt = "file";
    }
    viewItem.append(itemImg, itemName);
    viewItem.addEventListener("click", (e) => {
        if (obj instanceof Folder) {
            openFolder(obj);
        } else {
            var newA = document.createElement("a");
            newA.target = "_blank";
            newA.href = URL.createObjectURL(obj);
            newA.style = "display: none";
            newA.click();
        }
    });
    searchResults.append(viewItem);
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
