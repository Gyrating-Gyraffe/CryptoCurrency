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
        const timeout = 12000; // Timeout in miliseconds
        // Timestamp validation
        if (data.timestamp)
            return !((new Date().getTime() - new Date(data.timestamp).getTime()) > timeout);
        return false;
    }
}
export default CacheProvider;
