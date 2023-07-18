const previewImg = document.getElementById("preview");

const Filters = document.querySelectorAll(".filter");

Filters.forEach((el) => {
  el.addEventListener("input", ImageFilter);
});

function ImageFilter() {
  const $blur = document.querySelector("#blur").value;
  const brightness = document.querySelector("#brightness").value;
  const contrast = document.querySelector("#contrast").value;
  const grayscale = document.querySelector("#grayscale").value;
  const hue_rotate = document.querySelector("#hue-rotate").value;

  previewImg.style.filter = `blur(${$blur * 0.2}px) brightness(${
    brightness * 0.02
  }) contrast(${contrast * 0.02}) grayscale(${grayscale * 0.01}) hue-rotate(${
    hue_rotate * 3.6
  }deg)`;
}

window.onload = function () {
  const uploadInput = document.getElementById("upload");

  uploadInput.addEventListener("change", function () {
    const file = uploadInput.files[0];
    const reader = new FileReader();
    const $h2 = document.querySelector("header > h2");
    previewImg.style.display = "block";
    $h2.innerText = "";

    reader.onload = function (e) {
      previewImg.src = e.target.result;
    };

    reader.readAsDataURL(file);
  });
};

function downloadImage() {
  const canvas = document.createElement("canvas");
  const ctx = canvas.getContext("2d");

  canvas.width = previewImg.width;
  canvas.height = previewImg.height;

  ctx.filter = previewImg.style.filter;
  ctx.drawImage(previewImg, 0, 0, canvas.width, canvas.height);

  const link = document.createElement("a");
  link.href = canvas.toDataURL("image/png");
  link.download = "filtered_image.png";
  link.click();
}

const downloadButton = document.getElementById("download");
downloadButton.addEventListener("click", downloadImage);
