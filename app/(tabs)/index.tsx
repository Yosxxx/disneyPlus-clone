// app/index.tsx
import Categories from "@/components/Categories";
import MovieCard from "@/components/MovieCard";
import React from "react";
import { ScrollView, Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (
        <View className="flex-1 bg-dark-300">
            <SafeAreaView edges={["top"]} className="flex-1 bg-dark-300 px-2">
                <ScrollView
                    style={{ flex: 1, backgroundColor: "#0f1013" }}
                    contentContainerStyle={{ paddingTop: 16 }}
                    showsVerticalScrollIndicator={false}
                >
                    {/* Category tiles at the top */}
                    <Categories />

                    {/* Hard‐coded movie sections */}
                    <View className="ml-1 mb-6 mt-5">
                        <Text className="text-white mb-5 text-2xl font-extrabold">
                            Popular
                        </Text>
                        <MovieCard index={0} limit={25} />
                    </View>

                    <View className="ml-1 mb-6">
                        <Text className="text-white mb-5 text-2xl font-extrabold">
                            Action
                        </Text>
                        <MovieCard index={1} limit={25} />
                    </View>

                    <View className="ml-1 mb-6">
                        <Text className="text-white mb-5 text-2xl font-extrabold">
                            Comedy
                        </Text>
                        <MovieCard index={2} limit={25} />
                    </View>

                    <View className="ml-1 mb-6">
                        <Text className="text-white mb-5 text-2xl font-extrabold">
                            Romance
                        </Text>
                        <MovieCard index={3} limit={25} />
                    </View>

                    <View className="ml-1 mb-6">
                        <Text className="text-white mb-5 text-2xl font-extrabold">
                            Korean
                        </Text>
                        <MovieCard index={4} limit={25} />
                    </View>

                    <View className="ml-1 mb-6">
                        <Text className="text-white mb-5 text-2xl font-extrabold">
                            Chinese
                        </Text>
                        <MovieCard index={5} limit={25} />
                    </View>

                    <View className="ml-1 mb-6">
                        <Text className="text-white mb-5 text-2xl font-extrabold">
                            Horror
                        </Text>
                        <MovieCard index={6} limit={25} />
                    </View>

                    <View className="ml-1 mb-6">
                        <Text className="text-white mb-5 text-2xl font-extrabold">
                            Thriller
                        </Text>
                        <MovieCard index={7} limit={25} />
                    </View>
                </ScrollView>
            </SafeAreaView>
        </View>
    );
}
