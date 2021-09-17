import globalObj from "../../../global/script/global.mjs";
import viewHandler from "../../view-module/script/module.mjs";

const thisModule = document.getElementById("upload-module");
const inpElem = thisModule.querySelector("file-input");
const field = document.createElement("div");
const uploadMsg = inpElem.previousElementSibling;
const dropBox = inpElem.parentElement;
// * Custom events for clicking on add or closing the prompt
const closeEvent = new Event("update-Module-Close-Event");
const changeEvent = new Event("changedItem");

let list = [];
let isFeildActive = false;

field.classList.add("text-area");

// * =============================================
// *============== functions =====================

function getInputFiles() {
    return list;
}

function clearInputStream() {
    list = [];
    dropBox.dispatchEvent(changeEvent);
}

function addToList(inputFiles) {
    Array.from(inputFiles.files).forEach((file) => {
        list.push(file);
    });
}

dropBox.addEventListener(changeEvent.type, function () {
    if (list.length == 0 && isFeildActive) {
        addBtn.classList.add(globalObj.invisibleClass);
        uploadMsg.classList.remove(globalObj.invisibleClass);
        field.remove();
        isFeildActive = false;
    } else if (list.length > 0 && !isFeildActive) {
        addBtn.classList.remove(globalObj.invisibleClass);
        uploadMsg.classList.add(globalObj.invisibleClass);
        dropBox.prepend(field);
        isFeildActive = true;
    }
    if (isFeildActive) {
        while (field.firstChild) {
            field.removeChild(field.firstChild);
        }
        list.forEach((file) => {
            var h1 = document.createElement("h1");
            h1.append(document.createTextNode(file.name));
            field.prepend(h1);
        });
    }
});

function isVisible() {
    return !dropBox.parentElement.classList.contains(globalObj.invisibleClass);
}

function toggleVisibility() {
    globalObj.toggleShade();
    thisModule.classList.toggle(globalObj.invisibleClass);
}

// *==========================================
// *================ Events ==================

//close event
thisModule.firstElementChild.addEventListener("click", () =>
    document.dispatchEvent(closeEvent)
);

thisModule.lastElementChild.addEventListener("click", (e) => {
    e.preventDefault();
    list.forEach((element) => {
        viewHandler.addToView(element);
    });
    clearInputStream();
});

dropBox.addEventListener("click", () => inpElem.click());

inpElem.addEventListener("change", (e) => {
    if (inpElem.files.length == 0) return;
    addToList(inpElem);
    dropBox.dispatchEvent(changeEvent);
});

dropBox.addEventListener("drop", (e) => {
    e.preventDefault();
    addToList(e.dataTransfer);
    dropBox.dispatchEvent(changeEvent);
});

dropBox.addEventListener("dragover", (e) => {
    e.preventDefault();
});

const uploadModule = {
    closeEvent: closeEvent,
    addEvent: addEvent,
    getInputFiles: getInputFiles,
    clearInputStream: clearInputStream,
    isVisible: isVisible,
};

export default uploadModule;
