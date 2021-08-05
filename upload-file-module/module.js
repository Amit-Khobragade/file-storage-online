const addEvent = new Event("add-clicked");
const closeEvent = new Event("close-clicked");

//close event
document.querySelectorAll("#shade,#close-btn").forEach((e) => {
    document.dispatchEvent(closeEvent);
});

const inpElem = document.getElementById("file-input");
const dropBox = inpElem.parentElement;

dropBox.addEventListener("click", (e) => {
    inpElem.click();
});

dropBox.addEventListener("drop", (e) => {
    e.preventDefault();
    var list = new DataTransfer();
    for (var i = 0; i < inpElem.files.length; ++i) {
        list.items.add(inpElem.files[i]);
    }
    for (var i = 0; i < e.dataTransfer.files.length; ++i) {
        list.items.add(e.dataTransfer.files.item(i));
    }

    inpElem.files = list.files;
    inpElem.dispatchEvent(new Event("change"));
    // console.log(inpElem.files);
});

dropBox.addEventListener("dragover", (e) => {
    e.preventDefault();
});

inpElem.addEventListener("change", (e) => {
    var feild = document.querySelector(".text-area");
    if (inpElem.files.length == 1) {
        inpElem.previousElementSibling.classList.toggle("invisible");
        inpElem.nextElementSibling.classList.toggle("invisible");
        feild = document.createElement("div");
        feild.classList.toggle("text-area");
        dropBox.prepend(feild);
    }
    feild.querySelectorAll(".fileName").forEach((toDelete) => {
        toDelete.remove();
    });
    for (var i = 0; i < inpElem.files.length; ++i) {
        var name = inpElem.files[i].name;
        const txt = document.createTextNode("\n" + name);
        const node = document.createElement("h1");
        node.append(txt);
        node.classList.toggle("fileName");
        feild.prepend(node);
    }
});
