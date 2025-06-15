import Constants from "expo-constants";

type ExtraConfig = {
    TMDB_BEARER_TOKEN: string;
    TMDB_API_BASE_URL: string;
};

const extra = Constants.expoConfig?.extra as ExtraConfig;
const { TMDB_BEARER_TOKEN, TMDB_API_BASE_URL } = extra;

export interface Movie {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    release_date: string;
}

export async function fetchPopularMovies(
    page = 1,
    limit = 10
): Promise<Movie[]> {
    const res = await fetch(
        `${TMDB_API_BASE_URL}/movie/popular?language=en-US&page=${page}`,
        {
            method: "GET",
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
            },
        }
    );
    if (!res.ok) {
        throw new Error(`TMDB fetch error: ${res.status}`);
    }
    const json = await res.json();
    // slice off only the top `limit` entries
    return (json.results as Movie[]).slice(0, limit);
}
