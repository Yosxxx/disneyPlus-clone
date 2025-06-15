import Constants from "expo-constants";

type ExtraConfig = {
    TMDB_BEARER_TOKEN: string;
    TMDB_API_BASE_URL: string;
};

export interface Genre {
    id: number;
    name: string;
}

export interface PosterItem {
    id: number;
    uri: string;
}

export interface MovieDetails {
    id: number;
    title: string;
    overview: string;
    poster_path: string | null;
    backdrop_path: string | null;
    release_date: string;
    runtime: number;
    vote_average: number;
    genres: Genre[];
    // add any other fields you need...
}

const extra = Constants.expoConfig?.extra as ExtraConfig;
const { TMDB_BEARER_TOKEN, TMDB_API_BASE_URL } = extra;

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

// Details
export async function fetchMovieDetails(
    movieId: number | string
): Promise<MovieDetails> {
    const res = await fetch(
        `${TMDB_API_BASE_URL}/movie/${movieId}?language=en-US`,
        {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
            },
        }
    );

    if (!res.ok) {
        throw new Error(`TMDB details fetch error: ${res.status}`);
    }

    const json = await res.json();
    return json as MovieDetails;
}

/** Core discover function under the hood */
async function discoverPosters(
    params: Record<string, string>,
    page = 1,
    limit = 25
): Promise<PosterItem[]> {
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
    const { results } = (await res.json()) as {
        results: Array<{ id: number; poster_path: string | null }>;
    };

    return results
        .filter((m) => m.poster_path)
        .slice(0, limit)
        .map((m) => ({
            id: m.id,
            uri: `${IMAGE_BASE_URL}${m.poster_path!}`,
        }));
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

export async function fetchSimilarMovies(
    movieId: number | string,
    limit = 25
): Promise<PosterItem[]> {
    const res = await fetch(
        `${TMDB_API_BASE_URL}/movie/${movieId}/similar?language=en-US&page=1`,
        {
            headers: {
                accept: "application/json",
                Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
            },
        }
    );
    if (!res.ok) throw new Error(`TMDB fetch error: ${res.status}`);
    const { results } = await res.json();
    return results
        .filter((m: any) => m.poster_path)
        .slice(0, limit)
        .map((m: any) => ({
            id: m.id,
            uri: `${IMAGE_BASE_URL}${m.poster_path}`,
        }));
}
