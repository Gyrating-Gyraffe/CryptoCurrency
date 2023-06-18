var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
// CryptoDataModule.ts
const cryptoDataModule = (() => {
    class ApiClient {
        // Fetches data from the API 
        // Returns a JSON object
        fetchData(url) {
            return __awaiter(this, void 0, void 0, function* () {
                const response = yield fetch(url);
                const json = yield response.json();
                return json;
            });
        }
    }
    class CacheProvider {
        // Retrieves data from the cache using the provided key
        // Return the cached data or null if not found
        get(key) {
            const storedObj = JSON.parse(localStorage.getItem(key));
            return storedObj ? { timestamp: storedObj.timestamp, content: storedObj.content } : null;
        }
        // Stores data in the cache using the provided key and value
        // Data is stored inside an object containing "timestamp" - the time of storing and "content" - what we are storing
        set(key, value) {
            const obj = { timestamp: new Date(), content: value };
            localStorage.setItem(key, JSON.stringify(obj));
        }
        // Validates data (for cache retreival)
        isValid(data) {
            const timeout = 20000; // Timeout in miliseconds
            // Timestamp validation
            if (data.timestamp)
                return !((new Date().getTime() - new Date(data.timestamp).getTime()) > timeout);
            return false;
        }
    }
    const requestData = (url, ignoreCache) => __awaiter(void 0, void 0, void 0, function* () {
        const apiClient = new ApiClient();
        const cacheProvider = new CacheProvider();
        const cachedData = cacheProvider.get(url);
        // Return cached data if it exists, it's valid, and we don't intentionally want to ignore it
        if (cachedData && cacheProvider.isValid(cachedData) && !ignoreCache) {
            console.log("RETURNING CACHEDDATA because IT IS VALID");
            return cachedData.content;
        }
        try {
            const apiData = yield apiClient.fetchData(url);
            if (apiData.error)
                throw new Error(apiData.error);
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
    });
    return {
        requestData
    };
})();
export default cryptoDataModule.requestData;
