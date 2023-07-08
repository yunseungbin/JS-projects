const $container = document.querySelector(".container");
const $button = document.querySelector(".button");
const $body = document.querySelector("body");
const $h1 = document.querySelector("h1");

$container.addEventListener("click", () => {
  if (!$button.classList.contains("addclass")) {
    $button.classList.add("addclass");
    $container.style.backgroundColor = "rgb(207,153,196)";
    setTimeout(() => {
      $h1.innerText = "You Click the button!";
    }, 100);
  } else {
    $button.classList.remove("addclass");
    $container.style.backgroundColor = "";
    $h1.innerText = "";
  }
});
