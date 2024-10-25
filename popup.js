document.addEventListener('DOMContentLoaded', () => {
    const scrapeButton = document.getElementById('scrape-btn');

    // Log if the button exists or not
    if (scrapeButton) {
        console.log("Scrape button found!");
        scrapeButton.addEventListener('click', () => {
            console.log("Scrape button clicked!");

            chrome.tabs.query({ active: true, currentWindow: true }, (tabs) => {
                chrome.scripting.executeScript({
                    target: { tabId: tabs[0].id },
                    function: scrapeData
                });
            });
        });
    } else {
        console.error("Scrape button not found!");
    }
});


function scrapeData() {
    console.log("Scraping data from the current website...");

    // Select all the table rows (listings) from the page
    let listings = document.querySelectorAll('tbody tr');

    listings.forEach((listing) => {
        // Extract the username
        let username = listing.querySelector('td a').textContent.trim();

        // Extract the audience size
        let audience = listing.querySelector('td.hidden-xs:nth-child(3)').textContent.trim();

        // Extract the price
        let price = listing.querySelector('td.hidden-xs:nth-child(4)').textContent.trim();

        // Extract the listing date
        let listingDate = listing.querySelector('td.hidden-xs:nth-child(5) span').textContent.trim();

        // Extract the type (icon for platform type)
        let typeElement = listing.querySelector('td:nth-child(2) i'); // Second column <i> element
        let type = typeElement ? typeElement.className : "Unknown"; // Get the class of the icon

        // Log the scraped data
        console.log("Username:", username);
        console.log("Audience:", audience);
        console.log("Price:", price);
        console.log("Listing Date:", listingDate);
        console.log("Type (Platform):", type);
    });
}



