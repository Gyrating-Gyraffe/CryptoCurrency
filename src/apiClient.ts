class ApiClient {
    // Fetches data from the API 
    // Returns a JSON object
    async fetchData(url: string): Promise<any> {
        const response = await fetch(url);
        const json = await response.json();
        return json;
    }
}

export default ApiClient;