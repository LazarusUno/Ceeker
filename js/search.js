// Retrieve previous search queries from localStorage
let previousSearches = JSON.parse(localStorage.getItem('previousSearches')) || [];

// Trie data structure implementation
class TrieNode {
    constructor() {
        this.children = {};
        this.isEndOfWord = false;
    }
}

class Trie {
    constructor() {
        this.root = new TrieNode();
    }

    insert(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                node.children[char] = new TrieNode();
            }
            node = node.children[char];
        }
        node.isEndOfWord = true;
    }

    search(word) {
        let node = this.root;
        for (let char of word) {
            if (!node.children[char]) {
                return false;
            }
            node = node.children[char];
        }
        return node.isEndOfWord;
    }

    startsWith(prefix) {
        let node = this.root;
        let suggestions = [];

        for (let char of prefix) {
            if (!node.children[char]) {
                return suggestions;
            }
            node = node.children[char];
        }

        function collectSuggestions(node, prefix) {
            if (node.isEndOfWord) {
                suggestions.push(prefix);
            }
            for (let char in node.children) {
                collectSuggestions(node.children[char], prefix + char);
            }
        }

        collectSuggestions(node, prefix);

        return suggestions;
    }
}

// Function to save previous search queries to localStorage
function savePreviousSearches() {
    localStorage.setItem('previousSearches', JSON.stringify(previousSearches));
}

// Function to display autocomplete suggestions
function displayAutocompleteSuggestions(value) {
    let trie = new Trie();
    for (let query of previousSearches) {
        trie.insert(query);
    }

    // Get autocomplete suggestions using prefix matching
    let suggestions = trie.startsWith(value.toLowerCase());

    return suggestions;
}

// Execute function when form is submitted
let searchForm = document.querySelector(".search-container");
searchForm.addEventListener("submit", (e) => {
    let input = document.querySelector(".search-input");
    let value = input.value.trim();

    // Store the query if the input is not empty
    if (value !== "") {
        previousSearches.push(value);
        savePreviousSearches();
    }
});

// Execute function on keyup
let input = document.querySelector(".search-input");
input.addEventListener("input", (e) => {
    let value = input.value.trim();

    // Get autocomplete suggestions from previous search queries
    let suggestions = displayAutocompleteSuggestions(value);
    // Display autocomplete suggestions only if input is focused or not empty
    if (value !== "" && document.activeElement === input) {
        displayAutocomplete(suggestions);
    } else {
        clearAutocomplete();
    }
});

// Function to display autocomplete suggestions
function displayAutocomplete(suggestions) {
    let autocompleteContainer = document.getElementById("autocomplete-container");
    autocompleteContainer.innerHTML = " ";

    if (suggestions.length > 0) {
        // If there are suggestions, display them as a list
        let suggestionList = document.createElement("ul");
        for (let suggestion of suggestions) {
            let suggestionItem = document.createElement("li");
            suggestionItem.textContent = suggestion;
            suggestionItem.classList.add("autocomplete-item");
            suggestionItem.addEventListener("click", () => {
                input.value = suggestion;
                clearAutocomplete();
            });
            suggestionList.appendChild(suggestionItem);
        }
        autocompleteContainer.appendChild(suggestionList);
    }
}

// Function to clear autocomplete suggestions
function clearAutocomplete() {
    let autocompleteContainer = document.getElementById("autocomplete-container");
    autocompleteContainer.innerHTML = " ";
}
