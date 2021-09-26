import Folder from "../../../Data/folder.mjs";

const viewHandler = {
    currentFolder: new Folder("home", null),
    gotoLastFolder: gotoLastFolder,
    openFolder: openFolder,
    addToView: addToDir,
    viewableObjectCreator: viewableObjectCreator,
};

/* 
    The viewBox is the main variable where the changes 
    in the list and objects are potraied. The viewBox 
    is linked with the current directory which is open 
    with the help of various functions.
*/
const viewBox = document.getElementById("view");

// *===============================================================
// *==========================functions============================

// this loads the folder in the view
function openFolder(folder) {
    // check if the arg is a folder or not
    if (!folder instanceof Folder) {
        console.error("openFolder argument is not a folder");
        return;
    }

    // clear the viewBox
    while (viewBox.firstElementChild) {
        viewBox.firstElementChild.remove();
    }

    // set the current folder to the arg and
    // update the view
    viewHandler.currentFolder = folder;
    [...folder.list].forEach((element) =>
        viewBox.append(viewableObjectCreator(element))
    );
}

// this adds the given file to the viewBox and the currentFolder
function addToDir(obj) {
    // Check if the given folder already exists or has a valid name
    if (
        [...viewHandler.currentFolder.nameList].indexOf(obj.name.trim()) !=
            -1 ||
        !obj.name ||
        obj.name.trim().length == 0
    ) {
        alert("invalid folder name");
        return;
    }

    // if the object name is valid then add the arg to the viewBox and the currentFolder
    viewBox.append(viewableObjectCreator(obj));
    viewHandler.currentFolder.insertItem(obj.name, obj);
}

// it opens the previous folder
function gotoLastFolder() {
    // check if the the current Folder has a previous folder
    if (!viewHandler.currentFolder.previousFolder) {
        alert("no previous folder found");
        return;
    }

    openFolder(viewHandler.currentFolder.previousFolder);
}

// creates and returns a object which has its styles defined in css
function viewableObjectCreator(obj) {
    // creates a div
    var mainDiv = document.createElement("div");
    mainDiv.classList.add("view-item");

    // gives the div an internal structure
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

    // added a event listener for onClick
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
