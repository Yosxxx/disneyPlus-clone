import Constants from "expo-constants";

type ExtraConfig = {
    TMDB_BEARER_TOKEN: string;
    TMDB_API_BASE_URL: string;
};

const extra = Constants.expoConfig?.extra as ExtraConfig;
const { TMDB_BEARER_TOKEN, TMDB_API_BASE_URL } = extra;

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

/** Core discover function under the hood */
async function discoverPosters(
    params: Record<string, string>,
    page = 1,
    limit = 25
): Promise<string[]> {
    const qs = new URLSearchParams({
        ...params,
        language: "en-US",
        page: String(page),
        sort_by: "popularity.desc",
    });
    const res = await fetch(`${TMDB_API_BASE_URL}/discover/movie?${qs}`, {
        headers: {
            accept: "application/json",
            Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
        },
    });
    if (!res.ok) throw new Error(`TMDB fetch error: ${res.status}`);
    const json = await res.json();
    const movies = json.results as Array<{ poster_path: string | null }>;
    return movies
        .slice(0, limit)
        .map((m) =>
            m.poster_path ? `${IMAGE_BASE_URL}${m.poster_path}` : null
        )
        .filter((u): u is string => !!u);
}

/** Popular overall */
export function fetchPopularMoviePosters(page = 1, limit = 25) {
    return discoverPosters({}, page, limit);
}

/** By genre */
export function fetchActionMoviePosters(page = 1, limit = 25) {
    return discoverPosters({ with_genres: "28" }, page, limit);
}
export function fetchComedyMoviePosters(page = 1, limit = 25) {
    return discoverPosters({ with_genres: "35" }, page, limit);
}
export function fetchRomanceMoviePosters(page = 1, limit = 25) {
    return discoverPosters({ with_genres: "10749" }, page, limit);
}
export function fetchHorrorMoviePosters(page = 1, limit = 25) {
    return discoverPosters({ with_genres: "27" }, page, limit);
}
export function fetchThrillerMoviePosters(page = 1, limit = 25) {
    return discoverPosters({ with_genres: "53" }, page, limit);
}

/** By original language */
export function fetchKoreanMoviePosters(page = 1, limit = 25) {
    return discoverPosters({ with_original_language: "ko" }, page, limit);
}
export function fetchChineseMoviePosters(page = 1, limit = 25) {
    return discoverPosters({ with_original_language: "zh" }, page, limit);
}
