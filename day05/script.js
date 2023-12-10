function createSnowflake() {
  const maxSnowflakes = 100;
  const snowflakes = document.querySelectorAll(".snowflake");

  if (snowflakes.length < maxSnowflakes) {
    const remainingSnowflakes = maxSnowflakes - snowflakes.length;
    const numberOfSnowflakes = Math.min(4, remainingSnowflakes);

    for (let i = 0; i < numberOfSnowflakes; i++) {
      const snowflake = document.createElement("div");
      snowflake.classList.add("snowflake");

      const size = Math.floor(Math.random() * 10) + 4;
      const opacity = Math.random() * 0.5 + 0.3;

      snowflake.style.width = `${size}px`;
      snowflake.style.height = `${size}px`;
      snowflake.style.opacity = opacity;

      const positionX = Math.random() * (window.innerWidth * 0.95 - size);
      const positionY = Math.random() * (window.innerHeight * 0.95 - size);
      snowflake.style.left = `${positionX}px`;
      snowflake.style.top = `${positionY}px`;

      snowflake.style.animationDuration = `${Math.random() * 3 + 2}s`;

      document.querySelector(".snowflakes").appendChild(snowflake);

      setTimeout(() => {
        snowflake.remove();
      }, 5000);
    }
  }
}

window.addEventListener("resize", function () {
  document.querySelectorAll(".snowflake").forEach((snowflake) => {
    snowflake.remove();
  });
  createSnowflake();
});

setInterval(createSnowflake, 300);
createSnowflake();
