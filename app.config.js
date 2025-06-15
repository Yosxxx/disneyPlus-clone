// app.config.js
import "dotenv/config"; // loads .env into process.env

export default ({ config }) => ({
    ...config,
    extra: {
        TMDB_BEARER_TOKEN: process.env.TMDB_BEARER_TOKEN,
        TMDB_API_BASE_URL: process.env.TMDB_API_BASE_URL,
    },
});
