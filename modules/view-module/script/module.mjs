import Folder from "../../../Data/folder.mjs";

const obj = {
    currentFolder: new Folder("home", null),
    gotoLastFolder: openFolder.bind(this.currentFolder.previousFolder),
};

const viewBox = document.getElementById("view");

function viewableObjectCreator(obj) {
    var mainDiv = document.createElement("div");
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
}

function openFolder(folder) {
    if (!folder instanceof Folder) {
        console.error("openFolder argument is not a folder");
        return;
    }

    clearView();
    folder.list.forEach((element) =>
        viewBox.append(viewableObjectCreator(element))
    );
}

function clearView() {
    while (viewBox.hasChildNodes()) {
        viewBox.firstElementChild.remove();
    }
}
