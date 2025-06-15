import React from "react";
import { Text, View } from "react-native";
import { SafeAreaView } from "react-native-safe-area-context";

const Profile = () => {
    return (
        <View className="flex-1 bg-dark-300">
            <SafeAreaView>
                <Text>Profile</Text>
            </SafeAreaView>
        </View>
    );
};

export default Profile;
