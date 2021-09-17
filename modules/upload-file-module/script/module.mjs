import globalObj from "../../../global/script/global.mjs";
import viewHandler from "../../view-module/script/module.mjs";

const thisModule = document.getElementById("upload-module");
const inpElem = thisModule.querySelector("#file-input");
const field = document.createElement("div");
const uploadMsg = inpElem.previousElementSibling;
const addBtn = thisModule.lastElementChild;
const dropBox = inpElem.parentElement;

let list = [];

field.classList.add("text-area");

// * =============================================
// *============== functions =====================

function clearInputStream() {
    list = [];
    changeDropBoxView();
}

function addToList(inputFiles) {
    Array.from(inputFiles.files).forEach((file) => {
        list.push(file);
    });
}

function isVisible() {
    return !dropBox.parentElement.classList.contains(globalObj.invisibleClass);
}

function toggleVisibility() {
    globalObj.toggleShade();
    thisModule.classList.toggle(globalObj.invisibleClass);
    clearInputStream();
}

function changeDropBoxView() {
    if (list.length == 0) {
        addBtn.classList.add(globalObj.invisibleClass);
        uploadMsg.classList.remove(globalObj.invisibleClass);
    } else if (list.length > 0) {
        addBtn.classList.remove(globalObj.invisibleClass);
        uploadMsg.classList.add(globalObj.invisibleClass);
    }
    while (dropBox.firstChild) {
        if (dropBox.firstChild == uploadMsg) break;

        dropBox.firstChild.remove();
    }
    list.forEach((file) => {
        dropBox.prepend(viewHandler.viewableObjectCreator(file));
    });
}

// *===================================================
// *==================== main btns ====================
thisModule.firstElementChild.addEventListener("click", () =>
    uploadModule.toggleVisibility()
);

addBtn.addEventListener("click", (e) => {
    e.preventDefault();
    list.forEach((element) => {
        viewHandler.addToView(element);
    });
    clearInputStream();
    toggleVisibility();
});

dropBox.addEventListener("click", () => inpElem.click());

// *====================================================
// *======= main events necessary for functioning ======

inpElem.addEventListener("change", (e) => {
    if (inpElem.files.length == 0) return;
    addToList(inpElem);
    changeDropBoxView();
});

dropBox.addEventListener("drop", (e) => {
    e.preventDefault();
    addToList(e.dataTransfer);
    changeDropBoxView();
});

dropBox.addEventListener("dragover", (e) => e.preventDefault());

// *==============================================
// *================= module object ==============
const uploadModule = {
    isVisible: isVisible,
    toggleVisibility: toggleVisibility,
};

export default uploadModule;
