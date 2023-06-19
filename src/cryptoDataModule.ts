// CryptoDataModule.ts
const cryptoDataModule = (() => {
    class ApiClient {
        // Fetches data from the API 
        // Returns a JSON object
        async fetchData(url: string): Promise<any> {
            const response = await fetch(url);
            const json = await response.json();
            return json;
        }
    }

    class CacheProvider {
        // Retrieves data from the cache using the provided key
        // Return the cached data or null if not found
        get(key: string): any {
            const storedObj = JSON.parse(localStorage.getItem(key));
            return storedObj ? { timestamp: storedObj.timestamp, content: storedObj.content } : null;
        }
        // Stores data in the cache using the provided key and value
        // Data is stored inside an object containing "timestamp" - the time of storing and "content" - what we are storing
        set(key: string, value: any): void {
            const obj = { timestamp: new Date(), content: value };
            localStorage.setItem(key, JSON.stringify(obj));
        }
        // Validates data (for cache retreival)
        isValid(data: any): boolean {
            const timeout = 120000; // Timeout in miliseconds
            // Timestamp validation
            if(data.timestamp) return !((new Date().getTime() - new Date(data.timestamp).getTime()) > timeout);
            return false;
        }
    }

    const requestData = async (url: string, ignoreCache?: boolean): Promise<any> => {
        const apiClient = new ApiClient();
        const cacheProvider = new CacheProvider();
        const cachedData = cacheProvider.get(url);

        // Return cached data if it exists, it's valid, and we don't intentionally want to ignore it
        if(cachedData && cacheProvider.isValid(cachedData) && !ignoreCache) {
            console.log("RETURNING CACHEDDATA because IT IS VALID");
            return cachedData.content;    
        } 

        try {
            const apiData = await apiClient.fetchData(url); // Fetch API data
            if(apiData.error) throw new Error(apiData.error); // if API returns an error on their side
            cacheProvider.set(url, apiData); // Store data

            console.log("RETURNING APIDATA because CACHEDATA IS INVALID");
            return apiData;
        } 
        catch (error) {
            // Handle API error
            console.error('Failed to fetch data from API:', error);
            console.log("RETURNING CACHEDDATA because API UNRESPONSIVE");
            // Return cache if exists (valid or not doesn't matter), undefined if doesn't exist
            return cachedData ? cachedData.content : { undefined }; 
        }
    }

    return {
        requestData
    };
})();

export default cryptoDataModule.requestData;