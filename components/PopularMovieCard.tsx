// components/PopularMovieCard.tsx
import Constants from "expo-constants";
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, Text, View } from "react-native";

type ExtraConfig = {
    TMDB_BEARER_TOKEN: string;
    TMDB_API_BASE_URL: string;
};

type Movie = {
    id: number;
    title: string;
    poster_path: string | null;
    genre_ids: number[];
};

type Genre = {
    id: number;
    name: string;
};

const extra = Constants.expoConfig?.extra as ExtraConfig;
const { TMDB_BEARER_TOKEN, TMDB_API_BASE_URL } = extra;

export default function PopularMovieCard() {
    const [movies, setMovies] = useState<Movie[]>([]);
    const [genres, setGenres] = useState<Record<number, string>>({});
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState<string | null>(null);

    useEffect(() => {
        // Fetch genres
        const genrePromise = fetch(
            `${TMDB_API_BASE_URL}/genre/movie/list?language=en-US`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
                },
            }
        )
            .then((res) => {
                if (!res.ok) throw new Error(`Genres HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => {
                const map: Record<number, string> = {};
                (json.genres as Genre[]).forEach((g) => (map[g.id] = g.name));
                setGenres(map);
            });

        // Fetch top movies
        const moviesPromise = fetch(
            `${TMDB_API_BASE_URL}/movie/popular?language=en-US&page=1`,
            {
                headers: {
                    accept: "application/json",
                    Authorization: `Bearer ${TMDB_BEARER_TOKEN}`,
                },
            }
        )
            .then((res) => {
                if (!res.ok) throw new Error(`Movies HTTP ${res.status}`);
                return res.json();
            })
            .then((json) => setMovies((json.results as Movie[]).slice(0, 10)));

        Promise.all([genrePromise, moviesPromise])
            .catch((err) => setError(err.message))
            .finally(() => setLoading(false));
    }, []);

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center">
                <ActivityIndicator />
            </View>
        );
    }
    if (error) {
        return (
            <View className="p-4">
                <Text className="text-red-500 text-center">{error}</Text>
            </View>
        );
    }

    return (
        <FlatList
            data={movies}
            horizontal
            showsHorizontalScrollIndicator={false}
            keyExtractor={(item) => item.id.toString()}
            contentContainerStyle={{ paddingHorizontal: 16 }}
            renderItem={({ item }) => (
                <View className="mr-4 w-38 mb-5">
                    {item.poster_path && (
                        <Image
                            source={{
                                uri: `https://image.tmdb.org/t/p/w300${item.poster_path}`,
                            }}
                            className="h-40 aspect-[16/9] rounded-lg mb-2"
                            resizeMode="cover"
                        />
                    )}
                    <Text
                        className="text-white font-semibold text-sm mb-1"
                        numberOfLines={1}
                    >
                        {item.title}
                    </Text>
                    <Text className="text-gray-400 text-xs" numberOfLines={2}>
                        {item.genre_ids
                            .map((id) => genres[id])
                            .filter(Boolean)
                            .slice(0, 2)
                            .join(", ")}
                    </Text>
                </View>
            )}
        />
    );
}
