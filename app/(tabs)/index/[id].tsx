import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
    ActivityIndicator,
    FlatList,
    Image,
    Pressable,
    ScrollView,
    Share,
    Text,
    View,
} from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";
import {
    fetchMovieDetails,
    fetchSimilarMovies,
    PosterItem,
} from "../../../utils/tmdb";

const IMAGE_BASE_URL = "https://image.tmdb.org/t/p/w500";

export default function MovieDetail() {
    const { id } = useLocalSearchParams<{ id: string }>();
    const router = useRouter();
    const [movie, setMovie] = useState<any>(null);
    const [loading, setLoading] = useState(true);
    const [saved, setSaved] = useState(false);
    const [similarMovies, setSimilarMovies] = useState<PosterItem[]>([]);

    useEffect(() => {
        if (!id) return;
        let mounted = true;

        (async () => {
            try {
                const details = await fetchMovieDetails(id);
                const similar = await fetchSimilarMovies(id);
                if (mounted) {
                    setMovie(details);
                    setSimilarMovies(similar);
                }
            } catch (e) {
                console.error(e);
            } finally {
                if (mounted) setLoading(false);
            }
        })();

        return () => {
            mounted = false;
        };
    }, [id]);

    const handleSave = () => setSaved(!saved);

    const handleShare = () => {
        Share.share({
            message: `Check out "${movie.title}" on TMDB!`,
            url: `https://www.themoviedb.org/movie/${movie.id}`,
            title: movie.title,
        });
    };

    const handleDownload = () => {
        console.log("Download pressed for", movie.title);
    };

    if (loading) {
        return (
            <View className="flex-1 justify-center items-center bg-dark-300">
                <ActivityIndicator />
            </View>
        );
    }

    if (!movie) {
        return (
            <View className="flex-1 justify-center items-center bg-dark-300">
                <Text className="text-white">Movie not found.</Text>
            </View>
        );
    }

    const year = new Date(movie.release_date).getFullYear();
    const hours = Math.floor(movie.runtime / 60);
    const minutes = movie.runtime % 60;
    const language = (movie.original_language || "").toUpperCase();

    const renderSimilarMovie = ({ item }: { item: PosterItem }) => (
        <Pressable
            className="mr-4 w-32"
            onPress={() => router.push(`/movies/${item.id}`)}
        >
            <Image
                source={{ uri: item.uri }}
                className="w-full h-48 rounded-lg"
            />
        </Pressable>
    );

    return (
        <View className="flex-1 bg-dark-300">
            <SafeAreaView className="flex-1 px-4">
                <ScrollView contentContainerStyle={{ paddingBottom: 24 }}>
                    {movie.backdrop_path && (
                        <Image
                            source={{
                                uri: `${IMAGE_BASE_URL}${movie.backdrop_path}`,
                            }}
                            className="w-full h-52 mb-4 rounded-lg"
                        />
                    )}

                    <View className="items-center mb-4">
                        <Text className="text-white text-2xl font-bold mb-2 text-center">
                            {movie.title}
                        </Text>
                        <Text className="text-gray-400 text-sm mb-4 text-center">
                            {year} • {hours}h {minutes}m • {language}
                        </Text>

                        <Pressable
                            className="bg-white py-2 px-4 rounded mb-4 w-full"
                            onPress={() => {
                                /* handle "watch now" */
                            }}
                        >
                            <View className="flex-row gap-x-2 items-center justify-center">
                                <Ionicons name="play" size={24} />
                                <Text className="text-black font-semibold text-xl">
                                    Watch Now
                                </Text>
                            </View>
                        </Pressable>

                        <Text className="text-white text-md my-1 text-center">
                            {movie.genres.map((g: any) => g.name).join(" | ")}
                        </Text>
                    </View>

                    <Text className="text-gray-500 text-base leading-relaxed mb-6">
                        {movie.overview}
                    </Text>

                    <View className="flex-row gap-x-12 justify-center">
                        <Pressable
                            onPress={handleSave}
                            className="items-center"
                        >
                            <Ionicons
                                name={saved ? "bookmark" : "bookmark-outline"}
                                size={24}
                                color="#fff"
                            />
                            <Text className="text-white text-xs mt-1">
                                Save
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={handleShare}
                            className="items-center"
                        >
                            <Ionicons
                                name="share-social-outline"
                                size={24}
                                color="#fff"
                            />
                            <Text className="text-white text-xs mt-1">
                                Share
                            </Text>
                        </Pressable>

                        <Pressable
                            onPress={handleDownload}
                            className="items-center"
                        >
                            <Ionicons
                                name="download-outline"
                                size={24}
                                color="#fff"
                            />
                            <Text className="text-white text-xs mt-1">
                                Download
                            </Text>
                        </Pressable>
                    </View>

                    <View className="mt-5">
                        <Text className="text-white text-2xl font-semibold mb-3">
                            More Like This
                        </Text>
                        <FlatList
                            data={similarMovies}
                            horizontal
                            keyExtractor={(item) => item.id.toString()}
                            renderItem={renderSimilarMovie}
                            showsHorizontalScrollIndicator={false}
                        />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
