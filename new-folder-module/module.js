const submitEvent = new Event("folderSubmit");
const cancelEvent = new Event("folderCancel");
var folderForm = document.forms.folderForm;

export function getFolderName() {
    return folderForm.name.value;
}

folderForm.addEventListener("submit", (e) => {
    document.dispatchEvent(submitEvent);
});
folderForm.addEventListener("submit", (e) => {
    document.dispatchEvent(submitEvent);
});
folderForm.cancel.addEventListener("click", (e) => {
    document.dispatchEvent(cancelEvent);
});
