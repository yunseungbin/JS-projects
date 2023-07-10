const loadBtn = document.querySelector(".load-more");
const SearchInput = document.querySelector(".search-box input");
const imagesWrapper = document.querySelector(".images");

const API_KEY = "Your API KEY";
const perPage = 15;
let currentPage = 1;
let searchTerm = null;

const downloadImg = (ImageURL) => {
  fetch(ImageURL)
    .then((res) => res.blob())
    .then((file) => {
      const a = document.createElement("a");
      a.href = URL.createObjectURL(file);
      a.download = new Date().getTime();
      a.click();
    })
    .catch(() => alert("Failed to load images!"));
};

const ImageView = (e) => {
  const lightbox = document.querySelector(".lightbox");
  const IMG = document.querySelector(".img img");
  const CloseButton = document.querySelector(".buttons .uil-times");
  const ImageSave = document.querySelector(".buttons .uil-import");
  const TargetImage = e.target.closest("img");
  const Photographer = document.querySelector(".photographer span");
  const liElement = e.target.closest("li");
  const spanElement = liElement.querySelector(".details .photographer span");

  if (TargetImage === null) {
    return;
  }
  const ImageURL = TargetImage.src;
  lightbox.style.display = "block";
  IMG.setAttribute("src", ImageURL);

  Photographer.innerText = spanElement.innerText;

  CloseButton.addEventListener("click", () => {
    lightbox.style.display = "none";
  });

  ImageSave.addEventListener("click", () => {
    fetch(ImageURL)
      .then((res) => res.blob())
      .then((file) => {
        const a = document.createElement("a");
        a.href = URL.createObjectURL(file);
        a.download = new Date().getTime();
        a.click();
      })
      .catch(() => alert("Failed to load images!"));
  });
};

const CardHover = (e) => {
  const CardEvent = e.target.closest(".card").querySelector(".details");
  CardEvent.style.bottom = "0";
};

const CardLeave = (e) => {
  const CardEvent = e.target.closest(".card").querySelector(".details");
  CardEvent.style.bottom = "-100px";
};
const generateHTML = (images) => {
  const ImageList = document.querySelector(".images");
  ImageList.innerHTML += images
    .map((el) => {
      return `<li class="card">
        <img src="${el.src.large2x}" alt="img">
        <div class="details">
        <div class="photographer">
           <i class="uil uil-camera"></i>
           <span>${el.photographer}</span>
        </div>
        <button onclick="downloadImg('${el.src.large2x}')"><i class="uil uil-import"></i></button>
        </div>
      </li>`;
    })
    .join("");
  const $card = document.querySelectorAll(".card");

  $card.forEach((el) => {
    el.addEventListener("click", ImageView);
    el.addEventListener("mouseover", CardHover);
    el.addEventListener("mouseleave", CardLeave);
  });
};

const getImages = (apiURL) => {
  loadBtn.innerText = "Loading...";
  loadBtn.classList.add("disabled");
  fetch(apiURL, {
    headers: { Authorization: API_KEY },
  })
    .then((res) => res.json())
    .then((data) => {
      console.log(data);
      generateHTML(data.photos);
      loadBtn.innerText = "Load More";
      loadBtn.classList.remove("disabled");
    })
    .catch(() => alert("Failed to load images!"));
};

getImages(
  `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`
);

const loadMoreImages = () => {
  currentPage++;
  let apiURL = `https://api.pexels.com/v1/curated?page=${currentPage}&per_page=${perPage}`;
  apiURL = searchTerm
    ? `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`
    : apiURL;
  getImages(apiURL);
};

const loadSearchImages = (e) => {
  if (e.target.value === "") return (searchTerm = null);
  if (e.key === "Enter") {
    currentPage = 1;
    searchTerm = e.target.value;
    imagesWrapper.innerHTML = "";

    getImages(
      `https://api.pexels.com/v1/search?query=${searchTerm}&page=${currentPage}&per_page=${perPage}`
    );
  }
};

loadBtn.addEventListener("click", loadMoreImages);
SearchInput.addEventListener("keyup", loadSearchImages);
