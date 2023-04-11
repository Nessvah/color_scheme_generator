const form = document.getElementById("color-form");

// add event listener to form to get the data from the user
// and store it into an array
form.addEventListener("submit", (e) => {
  e.preventDefault();

  const color = document.getElementById("color").value;
  const mode = document.getElementById("mode").value;

  // remove the # from the hex value since the api doesnt support the use of it
  const finalColor = color.replace("#", "");

  const url = `https://www.thecolorapi.com/scheme?hex=${finalColor}&mode=${mode}`;

  fetch(url)
    .then((response) => response.json())
    .then((data) => {
      document.getElementById(
        "color-container"
      ).innerHTML = ` <img class="color-img" src="${data.image.bare}" alt=""/>`;
    })
    .catch((error) => console.error(error));
});
