import PopularMovieCard from "@/components/PopularMovieCard";
import { Ionicons } from "@expo/vector-icons";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (
        <View className="flex-1 bg-dark-300 p-2">
            <SafeAreaView>
                <View className="flex-row justify-between">
                    <View>
                        <Ionicons
                            name="person-circle-outline"
                            size={36}
                            color="#fff"
                        ></Ionicons>
                        <Text></Text>
                    </View>
                    <Ionicons
                        name="notifications-outline"
                        size={36}
                        color="#fff"
                    ></Ionicons>
                </View>

                <View>
                    <View>
                        <Text className="text-white font-montserrat text-4xl font-bold mb-5">
                            Popular Movies
                        </Text>
                        <PopularMovieCard />
                    </View>

                    <View>
                        <Text className="text-white font-montserrat text-2xl font-bold mb-5">
                            TV Series
                        </Text>
                    </View>

                    <View>
                        <Text className="text-white font-montserrat text-2xl font-bold mb-5">
                            Action Movies
                        </Text>
                    </View>

                    <View>
                        <Text className="text-white font-montserrat text-2xl font-bold mb-5">
                            Comedies
                        </Text>
                    </View>
                </View>
            </SafeAreaView>
        </View>
    );
}
