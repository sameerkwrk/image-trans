const uploadForm = document.querySelector("#upload-form");
const imageDisplay = document.querySelector(".image-display");
const submitter = document.querySelector("#form-uploader");
const fileHolder = document.querySelector(".file-holder");
const warningPanel = document.querySelector(".warning-panel");

uploadForm.addEventListener("submit", (e) => {
  e.preventDefault();
});

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
  } else {
    warningPanel.style.display = "none";
    submitter.disabled = false;
  }
  console.log(input.target.files);
  imageDisplay.innerHTML = "";
  const files = Array.from(input.target.files);
  files.forEach((file) => {
    const image = document.createElement("img");
    image.src = URL.createObjectURL(file);
    image.className = "max-w-full h-auto";
    imageDisplay.appendChild(image);
  });
});

fileHolder.value = "";

if (fileHolder.files.length > 10) {
  warningPanel.style.display = "block";
} else {
  warningPanel.style.display = "none";
}
