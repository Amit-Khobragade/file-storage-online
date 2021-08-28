import uploadModule from "../../modules/upload-file-module/script/module.mjs";
import newFolderModule from "../../modules/new-folder-module/script/module.mjs";
import deleteModule from "../../modules/delete-module/script/module.mjs";

const mainHandlerObject = (function () {
    const home = new Folder("home", null);
    var view = document.getElementById("view");
    const ctrls = document.getElementById("ctrls");
    var checkUpdateFlag = false; //true if update view is calling the functions

    var returnableObject = {
        ctrls: ctrls,
        currentFolder: home,
        addToDir: addToDir,
        goBackFolder: setCurrentFolderToPrevFolder,
        updateView: updateView,
    };
    toggleShade();

    // * =============================================
    // *============== functions =====================

    function addToDir(obj) {
        if (
            !checkUpdateFlag &&
            ([...returnableObject.currentFolder.names].indexOf(
                obj.name.trim()
            ) != -1 ||
                !obj.name ||
                obj.name.trim().length == 0)
        ) {
            alert("invalid folder name");
            return;
        }
        var viewItem = document.createElement("div");
        var itemName = document.createElement("p");
        var itemImg = document.createElement("img");
        viewItem.classList.add("view-item");
        itemName.append(document.createTextNode(obj.name));
        if (obj instanceof Folder) {
            itemImg.src = "./images/folder-1.svg";
            itemImg.alt = "folder";
            returnableObject.currentFolder.insertItem(obj.name, obj);
        } else {
            viewItem.classList.add("file");
            itemImg.src = "./images/file.svg";
            itemImg.alt = "file";
            returnableObject.currentFolder.insertItem(obj.name, obj);
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
        view.appendChild(viewItem);
    }

    function setCurrentFolderToPrevFolder() {
        if (returnableObject.currentFolder.getPreviousFolder()) {
            returnableObject.currentFolder =
                returnableObject.currentFolder.getPreviousFolder();
            return true;
        } else {
            return false;
        }
    }

    function openFolder(item) {
        if (!item instanceof Folder) return;

        returnableObject.currentFolder = item;
        updateView();
    }

    function updateView() {
        checkUpdateFlag = true;
        while (view.firstChild) {
            view.removeChild(view.firstChild);
        }
        [...returnableObject.currentFolder.list].forEach((val) => {
            if (val instanceof Folder) addToDir(val);
            else addToDir(val);
        });
        checkUpdateFlag = false;
    }

    return returnableObject;
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
            mainHandlerObject.addToDir(val);
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
        .querySelector("#folder-btn")
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

const deleteHandlerObject = (function () {
    const btn = mainHandlerObject.ctrls.querySelector("#delete-btn");
    deleteModule.deletePrompt.classList.toggle(invisibleClass);
    btn.addEventListener("click", () => {
        if (mainHandlerObject.currentFolder.isEmpty()) {
            alert("nothing to delete");
            return;
        }

        deleteModule.clearList();
        deleteModule.deletePrompt.classList.toggle(invisibleClass);
        toggleShade();
        [...mainHandlerObject.currentFolder.names].forEach((elem) => {
            deleteModule.addElement(elem);
        });
    });
    document.addEventListener(deleteModule.submitEvent.type, () => {
        toggleShade();
        deleteModule.deletePrompt.classList.toggle(invisibleClass);
        deleteModule.getSelected().forEach((elem) => {
            mainHandlerObject.currentFolder.deleteItem(elem.value);
        });
        mainHandlerObject.updateView();
    });
    document.addEventListener(deleteModule.cancelEvent.type, () => {
        toggleShade();
        deleteModule.deletePrompt.classList.toggle(invisibleClass);
    });
})();

const searchHandlerObject = (function () {
    const searchBtn = document.querySelector("#search");
    searchBtn.addEventListener("focus", () => {
        toggleShade();
    });
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
    } else {
        toggleShade();
    }
});
