// components/MovieCard.tsx
import { router } from "expo-router"; // <-- import router
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    View,
} from "react-native";
import {
    fetchActionMoviePosters,
    fetchChineseMoviePosters,
    fetchComedyMoviePosters,
    fetchHorrorMoviePosters,
    fetchKoreanMoviePosters,
    fetchPopularMoviePosters,
    fetchRomanceMoviePosters,
    fetchThrillerMoviePosters,
    PosterItem, // <-- import the type
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
    index: number;
    limit?: number;
};

export default function MovieCard({ index, limit = 10 }: Props) {
    const [items, setItems] = useState<PosterItem[]>([]); // <-- now PosterItem[]
    const [loading, setLoading] = useState(true);

    const fetchFn = FETCHERS[index] ?? FETCHERS[0];

    useEffect(() => {
        let mounted = true;
        (async () => {
            try {
                const list = await fetchFn(1, limit);
                if (mounted) setItems(list);
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
            data={items}
            keyExtractor={(item) => item.id.toString()} // <-- toString(), not localToString
            horizontal
            showsHorizontalScrollIndicator={false}
            renderItem={({ item }) => (
                <Pressable
                    onPress={() => router.push(`/movieDetail/${item.id}`)} // <-- navigate!
                    style={{ marginRight: 8 }}
                >
                    <Image
                        source={{ uri: item.uri }}
                        style={{ width: 120, height: 180, borderRadius: 6 }}
                        resizeMode="cover"
                    />
                </Pressable>
            )}
        />
    );
}
