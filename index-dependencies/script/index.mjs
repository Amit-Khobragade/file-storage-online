import Folder from "../../Data/folder.mjs";
import viewHandler from "../../modules/view-module/script/module.mjs";
import globalObj from "../../global/script/global.mjs";
import uploadModule from "../../modules/upload-file-module/script/module.mjs";
import newFolderModule from "../../modules/new-folder-module/script/module.mjs";
import deleteModule from "../../modules/delete-module/script/module.mjs";
import searchModule from "../../modules/search-module/script/module.mjs";

const home = new Folder("home", null);
const ctrls = document.getElementById("ctrls");

    const uploadPrompt = document.getElementById("upload-module");
    uploadPrompt.classList.toggle(globalObj.invisibleClass);

    // * =============================================
    // *============= Event Listeners ================

    document.addEventListener(uploadModule.closeEvent.type, (e) => {
        uploadPrompt.classList.toggle(globalObj.invisibleClass);
        globalObj.toggleShade();
        uploadModule.clearInputStream();
    });

    
    mainHandlerObject.ctrls
        .querySelector("#upload-btn")
        .addEventListener("click", () => {
            uploadPrompt.classList.toggle(globalObj.invisibleClass);
            globalObj.toggleShade();
        });
})();

const folderHandlerObject = (function () {
    newFolderModule.folderForm.classList.toggle(globalObj.invisibleClass);
    document.addEventListener(newFolderModule.submitEvent.type, () => {
        globalObj.toggleShade();
        newFolderModule.folderForm.classList.toggle(globalObj.invisibleClass);
        mainHandlerObject.addToDir(
            new Folder(
                newFolderModule.getFolderName(),
                mainHandlerObject.currentFolder
            )
        );
        newFolderModule.clearInput();
    });
    document.addEventListener(newFolderModule.cancelEvent.type, () => {
        globalObj.toggleShade();
        newFolderModule.folderForm.classList.toggle(globalObj.invisibleClass);
        newFolderModule.clearInput();
    });
    mainHandlerObject.ctrls
        .querySelector("#folder-btn")
        .addEventListener("click", () => {
            globalObj.toggleShade();
            newFolderModule.folderForm.classList.toggle(
                globalObj.invisibleClass
            );
        });
})();

const backHandlerObject = (function () {
    mainHandlerObject.ctrls
        .querySelector("#back-btn")
        .addEventListener("click", () => {
            if (mainHandlerObject.goBackFolder()) {
                mainHandlerObject.updateView();
            } else {
                alert("no previous folder Found");
            }
        });
})();

const deleteHandlerObject = (function () {
    const btn = mainHandlerObject.ctrls.querySelector("#delete-btn");
    deleteModule.deletePrompt.classList.toggle(globalObj.invisibleClass);
    btn.addEventListener("click", () => {
        if (mainHandlerObject.currentFolder.isEmpty()) {
            alert("nothing to delete");
            return;
        }

        deleteModule.clearList();
        deleteModule.deletePrompt.classList.toggle(globalObj.invisibleClass);
        globalObj.toggleShade();
        [...mainHandlerObject.currentFolder.names].forEach((elem) => {
            deleteModule.addElement(elem);
        });
    });
    document.addEventListener(deleteModule.submitEvent.type, () => {
        globalObj.toggleShade();
        deleteModule.deletePrompt.classList.toggle(globalObj.invisibleClass);
        deleteModule.getSelected().forEach((elem) => {
            mainHandlerObject.currentFolder.deleteItem(elem.value);
        });
        mainHandlerObject.updateView();
    });
    document.addEventListener(deleteModule.cancelEvent.type, () => {
        globalObj.toggleShade();
        deleteModule.deletePrompt.classList.toggle(globalObj.invisibleClass);
    });
})();

const searchHandlerObject = (function () {
    document.addEventListener(
        searchModule.cancelEvent.type,
        searchModule.toggleVisibility
    );
})();

// *========================================
// *========= listener for shade ===========

shade.addEventListener("click", (e) => {
    if (uploadModule.isVisible()) {
        document.dispatchEvent(uploadModule.closeEvent);
    } else if (newFolderModule.isVisible()) {
        document.dispatchEvent(newFolderModule.cancelEvent);
    } else if (deleteModule.isVisible()) {
        document.dispatchEvent(deleteModule.cancelEvent);
    } else if (searchModule.isVisible()) {
        document.dispatchEvent(searchModule.cancelEvent);
    } else {
        globalObj.toggleShade();
    }
});
