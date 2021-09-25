import globalObj from "../../../global/script/global.mjs";
import viewHandler from "../../view-module/script/module.mjs";
import Folder from "../../../Data/folder.mjs";

var folderForm = document.forms.folderForm;

// *===============================================
// *================ functions ====================
function getFolderName() {
    return folderForm.folderName.value;
}

function clearInput() {
    folderForm.folderName.value = null;
}

function isVisible() {
    return !folderForm.classList.contains(globalObj.invisibleClass);
}

function toggleVisibility() {
    globalObj.toggleShade();
    folderForm.classList.toggle(globalObj.invisibleClass);
    clearInput();
}

// *===============================================================
// *========================== Event Listeners ====================

folderForm.add.addEventListener("click", (e) => {
    if (
        folderForm.folderName.value.trim() === "" &&
        folderForm.checkValidity()
    ) {
        alert("invalid input");
        return;
    }
    viewHandler.addToView(
        new Folder(getFolderName(), viewHandler.currentFolder)
    );
    toggleVisibility();
});

folderForm.cancel.addEventListener("click", (e) => toggleVisibility());

const newFolderModule = {
    toggleVisibility: toggleVisibility,
    isVisible: isVisible,
};

export default newFolderModule;
