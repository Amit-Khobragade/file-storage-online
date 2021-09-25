import globalObj from "../../../global/script/global.mjs";
import viewHandler from "../../view-module/script/module.mjs";

/*
    The given module consist of 2 variables needed for internal working:
        -> deletePrompt: the overall delete section excluding the shade
        -> list: the list of items that can be deleted
*/
const deletePrompt = document.getElementById("delete-module");
const list = deletePrompt.firstElementChild;

// *======================================================
// *===================functions==========================

// adds new elements to the list
function addElement(value) {
    // Create a input of type checkbox with the value of arg
    const obj = document.createElement("input");
    obj.type = "checkbox";
    obj.value = value;
    obj.name = value;

    // Create a label for the checkbox
    const label = document.createElement("label");
    label.setAttribute("for", value);
    label.append(document.createTextNode(value));

    // append it to the list
    list.append(obj, label);
}

// Gets the checked input elements from the list
function getSelected() {
    return list.querySelectorAll("input:checked");
}

// tells if the module is currently interactable
function isVisible() {
    return !deletePrompt.classList.contains(globalObj.invisibleClass);
}

// toggles interactability of the module
function toggleVisibility() {
    if (!isVisible()) {
        // checks if there is something to delete
        if (viewHandler.currentFolder.isEmpty()) {
            alert("no files to delete");
            return;
        }

        // clears the list
        while (list.firstChild) {
            list.firstChild.remove();
        }

        // adds new items
        [...viewHandler.currentFolder.nameList].forEach((elem) =>
            addElement(elem)
        );
    }

    // makes the prompt visible / invisible
    deletePrompt.classList.toggle(globalObj.invisibleClass);
    globalObj.toggleShade();
}

// *=========================================================================
// *========================event listeners==================================

// on cancel --> toggle visibility
deletePrompt
    .querySelector("#cancel-btn")
    .addEventListener("click", () => toggleVisibility());

// on confirm --> toggle visibility --> delete the selected items --> update the view
deletePrompt.querySelector("#confirm-btn").addEventListener("click", () => {
    toggleVisibility();
    getSelected().forEach((elem) =>
        viewHandler.currentFolder.deleteItem(elem.value)
    );
    viewHandler.openFolder(viewHandler.currentFolder);
});

/* 
    the delete module consists of two functions:
    isVisible and toggleVisibility.
*/
const deleteModule = {
    isVisible: isVisible,
    toggleVisibility: toggleVisibility,
};

export default deleteModule;
