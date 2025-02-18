export const Database = (function () {
    let instance = null; // To store the fetched data

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

    async function fetchMarkdownData(address) { 
        try {
            const response = await fetch(document.location.origin + address);
            if (!response.ok) {
                throw new Error("Network response was not ok");
            }
            const dataObject = await response.text();
            return dataObject;
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