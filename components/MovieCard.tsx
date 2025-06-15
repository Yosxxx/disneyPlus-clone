// components/MovieCard.tsx
import React, { useEffect, useState } from "react";
import { ActivityIndicator, FlatList, Image, View } from "react-native";
import {
    fetchActionMoviePosters,
    fetchChineseMoviePosters,
    fetchComedyMoviePosters,
    fetchHorrorMoviePosters,
    fetchKoreanMoviePosters,
    fetchPopularMoviePosters,
    fetchRomanceMoviePosters,
    fetchThrillerMoviePosters,
} from "../utils/tmdb";

const FETCHERS = [
    fetchPopularMoviePosters,
    fetchActionMoviePosters,
    fetchComedyMoviePosters,
    fetchRomanceMoviePosters,
    fetchKoreanMoviePosters,
    fetchChineseMoviePosters,
    fetchHorrorMoviePosters,
    fetchThrillerMoviePosters,
] as const;

type Props = {
    /** 0 = “Popular”, 1 = Action, 2 = Comedy, … 7 = Thriller */
    index: number;
    /** how many posters to load */
    limit?: number;
};

export default function MovieCard({ index, limit = 10 }: Props) {
    const [urls, setUrls] = useState<string[]>([]);
    const [loading, setLoading] = useState(true);

    // pick the right fetcher (fallback to “popular” if out of bounds)
    const fetchFn = FETCHERS[index] ?? FETCHERS[0];

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const list = await fetchFn(1, limit);
                if (mounted) setUrls(list);
            } catch (err) {
                console.error(err);
            } finally {
                if (mounted) setLoading(false);
            }
        })();
        return () => {
            mounted = false;
        };
    }, [fetchFn, limit]);

    if (loading) {
        return (
            <View style={{ height: 180, justifyContent: "center" }}>
                <ActivityIndicator />
            </View>
        );
    }

    return (
        <FlatList
            data={urls}
            keyExtractor={(uri) => uri}
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item: uri }) => (
                <Image
                    source={{ uri }}
                    style={{
                        width: 120,
                        height: 180,
                        marginRight: 8,
                        borderRadius: 6,
                    }}
                    resizeMode="cover"
                />
            )}
        />
    );
}
