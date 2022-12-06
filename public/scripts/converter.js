const uploadForm = document.querySelector("#upload-form");
const imageDisplay = document.querySelector(".image-display");
const submitter = document.querySelector("#form-uploader");
const fileHolder = document.querySelector(".file-holder");
const warningPanel = document.querySelector(".warning-panel");

submitter.addEventListener("click", (e) => {
  uploadForm.submit(function (e) {
    e.preventDefault();
  });
});

fileHolder.addEventListener("change", (input) => {
  if (input.target.files.length > 10) {
    warningPanel.style.display = "block";
    input.target.value = "";
    submitter.disabled = true;
    imageDisplay.innerHTML = "";
    return;
  } else {
    warningPanel.style.display = "none";
    submitter.disabled = false;
    imageDisplay.innerHTML = "";
    const files = Array.from(input.target.files);
    files.forEach((file) => {
      const imageByte = new FileReader();
      imageByte.readAsDataURL(file);
      imageByte.addEventListener("load", (e) => {
        const image = document.createElement("img");
        image.className = "max-w-full h-auto";
        image.src = e.target.result;
        imageDisplay.appendChild(image);
      });
    });
    return;
  }
});

fileHolder.value = "";

if (fileHolder.files.length > 10) {
  warningPanel.style.display = "block";
} else {
  warningPanel.style.display = "none";
}
