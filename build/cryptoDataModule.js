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
        fetchData(url) {
            return __awaiter(this, void 0, void 0, function* () {
                // Implementation of fetching data from the API using the provided URL
                // Return the fetched data
                const response = yield fetch(url);
                const json = yield response.json();
                return json;
            });
        }
    }
    class CacheProvider {
        get(key) {
            // Implementation of retrieving data from the cache using the provided key
            // Return the cached data or null if not found
            const storedObj = JSON.parse(localStorage.getItem(key));
            return storedObj ? { date: storedObj.date, content: storedObj.content } : null;
        }
        set(key, value) {
            // Implementation of storing data in the cache using the provided key and value
            const obj = { date: new Date(), content: value };
            localStorage.setItem(key, JSON.stringify(obj));
        }
        isValid(data) {
            const timeout = 20000; // Timeout in miliseconds
            if (data.date)
                return !((new Date().getTime() - new Date(data.date).getTime()) > timeout);
            return false;
        }
    }
    const requestData = (url) => __awaiter(void 0, void 0, void 0, function* () {
        const apiClient = new ApiClient();
        const cacheProvider = new CacheProvider();
        const cachedData = cacheProvider.get(url);
        if (cacheProvider.isValid(cachedData)) {
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
            return cachedData.content;
        }
    });
    return {
        requestData
    };
})();
export default cryptoDataModule.requestData;
