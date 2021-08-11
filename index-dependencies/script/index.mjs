import uploadModule from "../../upload-file-module/script/module.mjs";
import newFolderModule from "../../new-folder-module/script/module.mjs";

const mainHandlerObject = (function () {
    const home = new Folder("home", null);
    var currentFolder = home;
    var view = document.getElementById("view");
    const ctrls = document.getElementById("ctrls");

    toggleShade();

    // * =============================================
    // *============== functions =====================

    function addToDir(type, obj) {
        if (obj instanceof Folder) {
            currentFolder.insertItem(obj.name, obj);
        } else {
            currentFolder.insertItem(obj.name, obj);
        }
        var newh1 = createh1(`${type} : ${obj.name}`);
        newh1.addEventListener("click", (e) => {
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
        view.appendChild(newh1);
    }

    function setCurrentFolderToPrevFolder() {
        if (currentFolder.getPreviousFolder()) {
            currentFolder = currentFolder.getPreviousFolder();
            return true;
        } else {
            return false;
        }
    }

    function openFolder(item) {
        if (!item instanceof Folder) return;

        currentFolder = item;
        updateView();
    }

    function updateView() {
        while (view.firstChild) {
            view.removeChild(view.firstChild);
        }
        [...currentFolder.list].forEach((val) => {
            if (val instanceof Folder) addToDir("folder", val);
            else addToDir("file", val);
        });
    }
    return {
        ctrls: ctrls,
        currentFolder: currentFolder,
        addToDir: addToDir,
        goBackFolder: setCurrentFolderToPrevFolder,
        updateView: updateView,
    };
})();

const uploadHandlerObject = (function () {
    const uploadPrompt = document.getElementById("upload-module");
    uploadPrompt.classList.toggle(invisibleClass);

    // * =============================================
    // *============= Event Listeners ================

    document.addEventListener(uploadModule.closeEvent.type, (e) => {
        uploadPrompt.classList.toggle(invisibleClass);
        toggleShade();
        uploadModule.clearInputStream();
    });

    document.addEventListener(uploadModule.addEvent.type, (e) => {
        uploadPrompt.classList.toggle(invisibleClass);
        uploadModule.getInputFiles().forEach((val) => {
            mainHandlerObject.addToDir("file", val);
        });
        toggleShade();
        uploadModule.clearInputStream();
    });
    mainHandlerObject.ctrls
        .querySelector("#upload-btn")
        .addEventListener("click", () => {
            uploadPrompt.classList.toggle(invisibleClass);
            toggleShade();
        });
})();

const folderHandlerObject = (function () {
    newFolderModule.folderForm.classList.toggle(invisibleClass);
    document.addEventListener(newFolderModule.submitEvent.type, () => {
        toggleShade();
        newFolderModule.folderForm.classList.toggle(invisibleClass);
        mainHandlerObject.addToDir(
            "folder",
            new Folder(
                newFolderModule.getFolderName(),
                mainHandlerObject.currentFolder
            )
        );
        newFolderModule.clearInput();
    });
    document.addEventListener(newFolderModule.cancelEvent.type, () => {
        toggleShade();
        newFolderModule.folderForm.classList.toggle(invisibleClass);
        newFolderModule.clearInput();
    });
    mainHandlerObject.ctrls
        .querySelector("#add-btn")
        .addEventListener("click", () => {
            toggleShade();
            newFolderModule.folderForm.classList.toggle(invisibleClass);
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
// *========================================
// *========= listener for shade ===========

shade.addEventListener("click", (e) => {
    if (uploadModule.isVisible()) {
        document.dispatchEvent(uploadModule.closeEvent);
    } else if (newFolderModule.isVisible()) {
        document.dispatchEvent(newFolderModule.cancelEvent);
    }
});
