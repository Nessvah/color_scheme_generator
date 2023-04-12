const form = document.getElementById("color-form");
const colorGrid = document.getElementById("color__grid");

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
      // data.colors[0].hex.value;
      // get the color info into an array
      const colorInfo = data.colors.map((color) => color.hex.value);
      console.log(colorInfo);

      // if there's already child elements on the grid container,
      // remove all of them
      removePreviousChilds();

      // go through each color
      colorInfo.forEach((color) => {
        // create each div and change its background color to the correspoding code
        const el = document.createElement("div");
        el.style.backgroundColor = color;

        colorGrid.appendChild(el);
      });

      // we need to do this 2x separated otherwise the grid
      // will be broken

      colorInfo.forEach((color) => {
        const el2 = document.createElement("div");
        el2.classList.add("color__code");

        el2.innerHTML = color;

        el2.addEventListener("dblclick", function () {
          navigator.clipboard
            .writeText(color)
            .then(() => {
              console.log(`Copied text to clipboard: ${text}`);
              alert(`Copied text to clipboard: ${text}`);
            })
            .catch((error) => {
              console.error(`Could not copy text: ${error}`);
            });
        });

        colorGrid.appendChild(el2);
      });
    })
    .catch((error) => console.error(error));
});

function removePreviousChilds() {
  while (colorGrid.hasChildNodes()) {
    colorGrid.removeChild(colorGrid.firstChild);
  }
}

/* STRETCH GOALS - COPY HEX CODE TO CLIPBOARD */

// let text = document.getElementById("1").innerHTML;
// const copyContent = async () => {
//   try {
//     await navigator.clipboard.writeText(text);
//     console.log("Content copied to clipboard");
//   } catch (err) {
//     console.error("Failed to copy: ", err);
//   }
// };
