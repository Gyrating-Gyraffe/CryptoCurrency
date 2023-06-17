// CryptoDataModule.ts
const cryptoDataModule = (() => {
    class ApiClient {
        async fetchData(url: string): Promise<any> {
            // Implementation of fetching data from the API using the provided URL
            // Return the fetched data
            const response = await fetch(url);
            const json = await response.json();
            return json;
        }
    }

    class CacheProvider {
        get(key: string): any {
            // Implementation of retrieving data from the cache using the provided key
            // Return the cached data or null if not found
            const storedObj = JSON.parse(localStorage.getItem(key));
            return storedObj ? { timestamp: storedObj.timestamp, content: storedObj.content } : null;
        }

        set(key: string, value: any): void {
            // Implementation of storing data in the cache using the provided key and value
            const obj = { timestamp: new Date(), content: value };
            localStorage.setItem(key, JSON.stringify(obj));
        }

        isValid(data: any): boolean {
            const timeout = 20000; // Timeout in miliseconds
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
            const apiData = await apiClient.fetchData(url);
            if(apiData.error) throw new Error(apiData.error);
            cacheProvider.set(url, apiData);

            console.log("RETURNING APIDATA because CACHEDATA IS INVALID");
            return apiData;
        } 
        catch (error) {
            // Handle API error
            console.error('Failed to fetch data from API:', error);
            console.log("RETURNING CACHEDDATA because API UNRESPONSIVE");
            return cachedData ? cachedData.content : { undefined };
        }
    }

    return {
        requestData
    };
})();

export default cryptoDataModule.requestData;