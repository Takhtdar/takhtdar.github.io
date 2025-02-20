export const Database = (function () {
    let instance = null; // To store the fetched data
    const cacheName = "markdown-cache"; // Cache name for Markdown files

    // Internal Function
    async function fetchData() {
        try {
            const response = await fetch(document.location.origin + "/resc/Database.json");
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const dataObject = await response.json();
            return dataObject;
        } catch (error) {
            console.error("Error fetching JSON data:", error);
            return null;
        }
    }

    async function fetchMarkdownData(address, version) {
        try {
            // Open the cache
            const cache = await caches.open(cacheName);

            // Check if the file is already cached
            const cachedResponse = await cache.match(document.location.origin + `${address}?v=${version}`);
            if (cachedResponse) {
                console.log("Serving markdown from cache:", `${address}?v=${version}`);
                return cachedResponse.text();
            }

            // If not cached, fetch from the server
            console.log("Fetching markdown from server:", `${address}?v=${version}`);
            const response = await fetch(document.location.origin + `${address}?v=${version}`);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }

            // Cache the response for future use
            await cache.put(document.location.origin + `${address}?v=${version}`, response.clone());

            // Return the fetched content
            return response.text();
        } catch (error) {
            console.error("Error fetching markdown data:", error);
            return null;
        }
    }

    // Function to get the instance of the fetched data
    async function getInstance() {
        if (!instance) {
            instance = await fetchData(); // Fetch data only once
        }
        return instance; // Return the cached instance
    }

    return {
        getInstance: getInstance,
        fetchMarkdownData: fetchMarkdownData
    };
})();
