import globalObj from "../../../global/script/global.mjs";

const newFolderModule = (function () {
    const submitEvent = new Event("folderSubmit");
    const cancelEvent = new Event("folderCancel");
    var folderForm = document.forms.folderForm;

    function getFolderName() {
        return folderForm.folderName.value;
    }

    function clearInput() {
        folderForm.folderName.value = null;
    }
    function isVisible() {
        return !folderForm.classList.contains(globalObj.invisibleClass);
    }

    folderForm.add.addEventListener("click", (e) => {
        if (
            folderForm.folderName.value.trim() === "" &&
            folderForm.checkValidity()
        ) {
            alert("invalid input");
            return;
        }
        document.dispatchEvent(submitEvent);
    });
    folderForm.cancel.addEventListener("click", (e) => {
        document.dispatchEvent(cancelEvent);
    });
    return {
        folderForm: folderForm,
        submitEvent: submitEvent,
        cancelEvent: cancelEvent,
        getFolderName: getFolderName,
        isVisible: isVisible,
        clearInput: clearInput,
    };
})();

export default newFolderModule;
