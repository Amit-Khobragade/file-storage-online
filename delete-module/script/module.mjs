const deleteModule = (function () {
    const deletePrompt = document.getElementById("delete-module");
    const list = deletePrompt.firstElementChild;
    const cancelEvent = new Event("DeletePromptClosed");
    const submitEvent = new Event("DeletePromptSubmitted");

    deletePrompt.querySelector("#cancel-btn").addEventListener("click", () => {
        document.dispatchEvent(cancelEvent);
    });
    deletePrompt.querySelector("#confirm-btn").addEventListener("click", () => {
        document.dispatchEvent(submitEvent);
    });

    function addElement(value) {
        const obj = document.createElement("input");
        obj.type = "checkbox";
        obj.value = value;
        obj.name = value;
        const label = document.createElement("label");
        label.setAttribute("for", value);
        label.append(document.createTextNode(value));
        list.append(obj, label);
    }

    function getSelected() {
        return list.querySelectorAll("input:checked");
    }

    function isVisible() {
        return !deletePrompt.classList.contains(invisibleClass);
    }

    function clearList() {
        while (list.firstChild) {
            list.firstChild.remove();
        }
    }

    return {
        deletePrompt: deletePrompt,
        cancelEvent: cancelEvent,
        submitEvent: submitEvent,
        addElement: addElement,
        getSelected: getSelected,
        isVisible: isVisible,
        clearList: clearList,
    };
})();

export default deleteModule;
