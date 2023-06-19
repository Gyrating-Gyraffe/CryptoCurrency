import CacheProvider from "./cacheProvider.js";
import ApiClient from "./apiClient.js";

// CryptoDataModule.ts
const cryptoDataModule = (() => {
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
            if(apiData.error) throw new Error(apiData.error); // if API returns an error on its side
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