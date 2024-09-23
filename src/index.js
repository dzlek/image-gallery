const KEY = "75WtYzlIo2JmB57Y0Y0N4E-zRTG_4x-VCz4TlI0-v4I";
const grid = document.getElementById("grid");
const input = document.getElementById("input");

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
    console.log(data);
    data.results.map((result) => {
      createImage(result);
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

getData("laos");

function createImage(result) {
  const img = document.createElement("img");
  const div = document.createElement("div");
  grid.appendChild(div);
  div.classList.add("grid_wrapper");
  div.appendChild(img);
  img.classList.add("grid_image");
  img.src = result.urls.regular;
  img.alt = `image`;
}

input.addEventListener("change", (event) => {
  getData(event.target.value);
});

document.addEventListener("DOMContentLoaded", () => {
  if (input) {
    input.focus();
  }
});
