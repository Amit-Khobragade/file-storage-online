const uploadModule = (function () {
    const inpElem = document.getElementById("file-input");
    const field = document.createElement("div");
    const uploadMsg = inpElem.previousElementSibling;
    const dropBox = inpElem.parentElement;
    const addBtn = dropBox.parentElement.lastElementChild;
    var list = [];
    var isFeildActive = false;
    // * Custom events for clicking on add or closing the prompt
    const addEvent = new Event("update-Module-Add-Event");
    const closeEvent = new Event("update-Module-Close-Event");
    const changeEvent = new Event("changedItem");

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

    function updateFeild() {
        if (list.length == 0 && isFeildActive) {
            addBtn.classList.add(invisibleClass);
            uploadMsg.classList.remove(invisibleClass);
            field.remove();
            isFeildActive = false;
        } else if (list.length > 0 && !isFeildActive) {
            addBtn.classList.remove(invisibleClass);
            uploadMsg.classList.add(invisibleClass);
            dropBox.prepend(field);
            isFeildActive = true;
        }
        if (isFeildActive) {
            while (field.firstChild) {
                field.removeChild(field.firstChild);
            }
            list.forEach((file) => {
                var h1 = createh1(`\u001C ${file.name}`);
                field.prepend(h1);
            });
        }
    }

    // *==========================================
    // *================ Events ==================

    //close event
    document.querySelectorAll("#shade,#close-btn").forEach((e) => {
        e.addEventListener("click", () => {
            document.dispatchEvent(closeEvent);
        });
    });
    // add event
    addBtn.addEventListener("click", (e) => {
        e.preventDefault();
        document.dispatchEvent(addEvent);
    });

    dropBox.addEventListener("click", (e) => {
        inpElem.click();
    });

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

    dropBox.addEventListener("changedItem", updateFeild);
    return {
        closeEvent: closeEvent,
        addEvent: addEvent,
        getInputFiles: getInputFiles,
        clearInputStream: clearInputStream,
    };
})();

export default uploadModule;
