import Folder from "../../../Data/folder.mjs";

const viewHandler = {
    currentFolder: new Folder("home", null),
    gotoLastFolder: gotoLastFolder,
    openFolder: openFolder,
    addToView: addToDir,
    viewableObjectCreator: viewableObjectCreator,
};

const viewBox = document.getElementById("view");

function openFolder(folder) {
    if (!folder instanceof Folder) {
        console.error("openFolder argument is not a folder");
        return;
    }

    clearView();
    viewHandler.currentFolder = folder;
    folder.list.forEach((element) =>
        viewBox.append(viewableObjectCreator(element))
    );
}

function addToDir(obj) {
    if (
        [...viewHandler.currentFolder.names].indexOf(obj.name.trim()) != -1 ||
        !obj.name ||
        obj.name.trim().length == 0
    ) {
        alert("invalid folder name");
        return;
    }
    if (obj instanceof Folder) {
        obj.previousFolder = viewHandler.currentFolder;
    }
    viewBox.append(viewableObjectCreator(obj));
    viewHandler.currentFolder.insertItem(obj.name, obj);
}

function gotoLastFolder() {
    if (!viewHandler.currentFolder.previousFolder) {
        alert("no previous folder found");
        return;
    }
    openFolder(viewHandler.currentFolder.previousFolder);
}

//*===================non returnable functions===============

function clearView() {
    while (viewBox.hasChildNodes()) {
        viewBox.firstElementChild.remove();
    }
}

function viewableObjectCreator(obj) {
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("view-item");
    mainDiv.innerHTML =
        `<img class="item-picture" ${(function () {
            if (obj instanceof Folder) {
                return `src="./images/folder-1.svg" alt="folder"`;
            } else {
                mainDiv.classList.add("file");
                return `src="./images/file.svg" alt="file"`;
            }
        })()}>` + `<p class="item-name"></p>`;
    mainDiv
        .querySelector(".item-name")
        .append(document.createTextNode(obj.name));
    mainDiv.addEventListener("click", () => {
        if (obj instanceof Folder) openFolder(obj);
        else {
            var newA = document.createElement("a");
            newA.target = "_blank";
            newA.href = URL.createObjectURL(obj);
            newA.style = "display: none";
            newA.click();
        }
    });
    return mainDiv;
}

export default viewHandler;
