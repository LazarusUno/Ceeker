const searchForm = document.querySelector(".search-container");
const searchBox = document.getElementById("search-box");
const searchResults = document.querySelector(".search-results");
const showMoreBtn = document.getElementById("show-more-btn");
const accessKey = "DQHh87TMeD6LPVd6mnKuMAzm8OCSE2-IbPkZ9iw9z6E";
let keyword = "";

let page = 1;
document.addEventListener('DOMContentLoaded', function() {
  // Extract the query parameter from the URL
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');

  // If there is a query, fetch and display images related to it
  if (query) {
    fetchAndDisplayImages(query);
  } else {
    console.log("No search query provided.");
  }
});

async function fetchAndDisplayImages(query) {
  const endpoint = `https://api.unsplash.com/search/photos?query=${encodeURIComponent(query)}&client_id=${accessKey}&per_page=10`;

  try {
    const response = await fetch(endpoint);
    const data = await response.json();

    // Clear previous results
    const searchResults = document.querySelector('.search-results');
    searchResults.innerHTML = '';

    // Display new results
    data.results.forEach(image => {
      const imageElement = document.createElement('img');
      imageElement.src = image.urls.small; // Use `.small` for smaller images, or `.regular` for larger images
      imageElement.alt = image.description || 'Unsplash Image';
      searchResults.appendChild(imageElement);
    });

    // Handle case with no results
    if (data.results.length === 0) {
      searchResults.innerHTML = '<p>No images found. Try a different search.</p>';
    }

  } catch (error) {
    console.error("Error fetching images:", error);
    // Optionally, update the UI to inform the user that an error occurred
    document.querySelector('.search-results').innerHTML = '<p>Error loading images.</p>';
  }
}


async function searchImages(query) {
  keyword = searchBox.value;
  const url = `https://api.unsplash.com/search/photos?page=${page}&query=${keyword}&client_id=${accessKey}&per_page=12`;
  const response = await fetch(url);
  const data = await response.json();
  
  // Clear previous results
  if (page === 1) {
    searchResults.innerHTML = "";
  }
  const results = data.results;

  // Shuffle the results array
  shuffleArray(results);

  results.forEach((result) => {
    const { urls, alt_description, links } = result;
    const imageWrapper = document.createElement("div");
    imageWrapper.classList.add("search-result");
    const image = document.createElement("img");
    image.src = urls.small;
    image.alt = alt_description;
    const imageLink = document.createElement("a");
    imageLink.href = links.html;
    imageLink.target = "_blank";
    imageLink.textContent = alt_description;

    imageWrapper.appendChild(image);
    imageWrapper.appendChild(imageLink);
    searchResults.appendChild(imageWrapper);
  });

  page++;
  if (page > 1) {
    showMoreBtn.style.display = "block";
  }
}

function shuffleArray(array) {
  for (let i = array.length - 1; i > 0; i--) {
    const j = Math.floor(Math.random() * (i + 1));
    [array[i], array[j]] = [array[j], array[i]];
  }
}
searchForm.addEventListener("submit", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});
const searchBtn = document.querySelector(".search-btn");
searchBtn.addEventListener("click", (e) => {
  e.preventDefault();
  page = 1;
  searchImages();
});

showMoreBtn.addEventListener("click", () => {
  searchImages();
});
