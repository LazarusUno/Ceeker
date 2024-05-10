document.addEventListener("DOMContentLoaded", function() {
    // Wait for the DOM content to be fully loaded
    
    // Find the logo element in the received HTML content
    var logoElement = document.querySelector("spline-viewer").shadowRoot.querySelector("#logo");
    
    // If the logo element exists, remove it
    if (logoElement) {
        logoElement.remove();
    }
});
 