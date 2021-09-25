import Folder from "../../Data/folder.mjs";
import viewHandler from "../../modules/view-module/script/module.mjs";
import globalObj from "../../global/script/global.mjs";
import uploadModule from "../../modules/upload-file-module/script/module.mjs";
import newFolderModule from "../../modules/new-folder-module/script/module.mjs";
import deleteModule from "../../modules/delete-module/script/module.mjs";
import searchModule from "../../modules/search-module/script/module.mjs";
// import searchModule from "../../modules/search-module/script/module.mjs";

const ctrls = document.getElementById("ctrls");

uploadModule.toggleVisibility();
newFolderModule.toggleVisibility();
deleteModule.toggleVisibility();
// globalObj.toggleShade();

// * =============================================
// *============= Event Listeners ================

ctrls
    .querySelector("#upload-btn")
    .addEventListener("click", () => uploadModule.toggleVisibility());

ctrls
    .querySelector("#folder-btn")
    .addEventListener("click", () => newFolderModule.toggleVisibility());

ctrls
    .querySelector("#back-btn")
    .addEventListener("click", () => viewHandler.gotoLastFolder());

ctrls
    .querySelector("#delete-btn")
    .addEventListener("click", () => deleteModule.toggleVisibility());

// *========================================
// *========= listener for shade ===========

shade.addEventListener("click", (e) => {
    if (uploadModule.isVisible()) {
        uploadModule.toggleVisibility();
    } else if (newFolderModule.isVisible()) {
        newFolderModule.toggleVisibility();
    } else if (deleteModule.isVisible()) {
        deleteModule.toggleVisibility();
    } else if (searchModule.isVisible()) {
        searchModule.toggleVisibility();
    } else {
        globalObj.toggleShade();
    }
});
