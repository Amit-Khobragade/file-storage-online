import Folder from "../../../Data/folder.mjs";

function viewableObjectCreator(obj) {
    var mainDiv = document.createElement("div");
    mainDiv.innerHTML =
        "<p></p>" +
        `<img ${(function () {
            if (obj instanceof Folder) {
                return `src="./images/folder-1.svg" alt="folder"`;
            } else {
                mainDiv.classList.add("file");
                return `src="./images/file.svg" alt="file"`;
            }
        })()}>`;
}
