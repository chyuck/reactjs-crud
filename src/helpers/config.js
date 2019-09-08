const config = {
    api: {
        use: process.env.REACT_APP_USE_API === "true",
        url: process.env.REACT_APP_API_URL
    }
};

export default config;