import SearchInstance from "../../../Data/searchInstance.mjs";
import Folder from "../../../Data/folder.mjs";

const searchModule = (function () {
    const cancelEvent = new Event("searchClosed");
    const searchBtn = document.getElementById("search");
    const searchResults = document.getElementById("search-results");
    var searchInstance = null;
    const searchObj = {
        cancelEvent: cancelEvent,
        currentFolder: null,
        isVisible: isVisible,
        toggleVisibility: toggleVisibility,
    };
    searchBtn.addEventListener("click", toggleVisibility);
    searchBtn.addEventListener("input", () => {
        if (
            !searchObj.currentFolder ||
            !searchObj.currentFolder instanceof SearchInstance
        ) {
            throw "current folder not set in search";
        }
        clearSearchResults();
        if (searchInstance instanceof SearchInstance) {
            searchInstance.stop();
        }
        searchInstance = new SearchInstance(
            searchObj.currentFolder,
            searchBtn.value,
            addToResults
        );
        searchInstance.startSearch();
    });
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
        return searchBtn.classList.contains("expanded");
    }
    function toggleVisibility() {
        clearSearchResults();
        toggleShade();
        searchBtn.classList.toggle("expanded");
        searchBtn.value = "";
        searchResults.classList.toggle(invisibleClass);
    }
    return searchObj;
})();

export default searchModule;
