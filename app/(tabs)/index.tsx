import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

export default function Home() {
    return (
        <View className="flex-1 bg-dark-300">
            <SafeAreaView>
                <View>
                    <Text className="text-white font-montserrat text-4xl font-bold">
                        Popular Movies
                    </Text>
                </View>

                <View>
                    <Text className="text-white font-montserrat text-2xl font-bold">
                        TV Series
                    </Text>
                </View>

                <View>
                    <Text className="text-white font-montserrat text-2xl font-bold">
                        Action Movies
                    </Text>
                </View>

                <View>
                    <Text className="text-white font-montserrat text-2xl font-bold">
                        Comedies
                    </Text>
                </View>
            </SafeAreaView>
        </View>
    );
}
