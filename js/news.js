const apikey = "8872c46cc50b4d559d469c7ce3afdc8d";
const blogContainer = document.getElementById("blog-container");
const SearchField = document.getElementById("Search-input");
const SearchBotton = document.querySelector(".search-button");
const searchForm = document.querySelector(".search-container");

async function fetchRandomNews() {
  try {
    const apiUrl = `https://newsapi.org/v2/top-headlines?country=us&apikey=${apikey}&pageSize=12`;
    const response = await fetch(apiUrl);
    const data = await response.json();

    return data.articles;
  } catch (error) {
    console.error("Error feching random News", error);
    return [];
  }
}
SearchBotton.addEventListener("click", async (e) => {
  e.preventDefault();
  page = 1;
  const query = SearchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchSearchResults(query);

      displayBlogs(articles);

      // Show "Show more" button if there are more results
    } catch (error) {
      console.error("Error feching  News by query", error);
      return [];
    }
  }
});
searchForm.addEventListener("submit", async (e) => {
  e.preventDefault();
  page = 1;
  const query = SearchField.value.trim();
  if (query !== "") {
    try {
      const articles = await fetchSearchResults(query);
      displayBlogs(articles);
    } catch (error) {
      console.error("Error feching  News by query", error);
      return [];
    }
  }
});
document.addEventListener('DOMContentLoaded', async(e) => {
  const urlParams = new URLSearchParams(window.location.search);
  const query = urlParams.get('q');
  if (query) {
    e.preventDefault();
    page = 1;
    const articles = await fetchSearchResults(query);
    displayBlogs(articles);  }
});
async function fetchSearchResults(query) {
  try {
    const apiUrl = `https://newsapi.org/v2/everything?q=${query}&apiKey=${apikey}&pageSize=12`;
    const response = await fetch(apiUrl);
    const data = await response.json();
    return data.articles;
  } catch (error) {
    console.error("Error feching random News", error);
    return [];
  }
}
function displayBlogs(articles) {
  blogContainer.innerHTML = "";

  articles.forEach((article) => {
    const blogCard = document.createElement("div");
    blogCard.classList.add("blog-card");
    const img = document.createElement("img");
    img.src = article.urlToImage;
    img.alt = article.title;
    const title = document.createElement("h2");
    const truncatedTitle = article.title.slice(0, 50);
    title.textContent = truncatedTitle;
    const description = document.createElement("p");
    description.textContent = article.description;
    blogCard.appendChild(img);
    blogCard.appendChild(title);
    blogCard.appendChild(description);
    blogCard.addEventListener("click", () => {
      window.open(article.url, "_blank");
    });
    blogContainer.appendChild(blogCard);
  });
}
(async () => {
  try {
    const articles = await fetchRandomNews();
    displayBlogs(articles);
  } catch (error) {
    console.error("Error feching random News", error);
    return [];
  }
})();
