const KEY = "75WtYzlIo2JmB57Y0Y0N4E-zRTG_4x-VCz4TlI0-v4I";
const grid = document.getElementById("grid");
const input = document.getElementById("input");
const clearButton = document.getElementById("clearButton");

async function getData(request) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${request}&per_page=30&orientation=landscape&client_id=${KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    grid.innerHTML = "";
    if (data.results.length === 0) grid.innerHTML = "<div> no results...</div>";
    input.innerText = request;
    clearButton.style.display = input.value ? "block" : "none";
    data.results.map((result) => {
      createImage(result);
    });
  } catch (error) {
    if (error) grid.innerHTML = "<div> error on API side ...</div>";
    console.error("Fetch error:", error);
  }
}

getData("laos");

function createImage(result) {
  const div = document.createElement("div");
  const img = document.createElement("img");
  grid.appendChild(div);
  div.classList.add("grid_wrapper");
  div.appendChild(img);
  img.classList.add("grid_image");
  img.src = result.urls.regular;
  img.alt = `image`;
}

function clearInput() {
  input.value = "";
  clearButton.style.display = "none";
  input.focus();
}

input.addEventListener("change", (event) => {
  getData(event.target.value);
});

clearButton.addEventListener("click", clearInput);

document.addEventListener("DOMContentLoaded", () => {
  if (input) {
    input.focus();
  }
});
