const uploadPrompt = document.getElementById("upload-module");
uploadPrompt.classList.toggle("invisible");

const ctrls = document.getElementById("ctrls");
ctrls.querySelector("#upload-btn").addEventListener("click", () => {
    uploadPrompt.classList.toggle("invisible");
});

document.addEventListener("closeClicked", (e) => {
    uploadPrompt.classList.toggle("invisible");
});
