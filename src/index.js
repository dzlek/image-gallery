const KEY = "75WtYzlIo2JmB57Y0Y0N4E-zRTG_4x-VCz4TlI0-v4I";
const grid = document.getElementById("grid");

async function getData(request) {
  try {
    const response = await fetch(
      `https://api.unsplash.com/search/photos?query=${request}&per_page=30&orientation=landscape&client_id=${KEY}`
    );
    if (!response.ok) {
      throw new Error(`HTTP error! Status: ${response.status}`);
    }
    const data = await response.json();
    console.log(data);
    data.results.map((result) => {
      const img = document.createElement("img");
      document.body.appendChild(img);
      img.classList.add("gallery-img");
      img.src = result.urls.small;
      img.alt = `image`;
    });
  } catch (error) {
    console.error("Fetch error:", error);
  }
}

getData("wheel");
