import React from "react";
import { Image, View } from "react-native";

const logos = [
    require("../assets/images/Categories/Disney-Logo.png"),
    require("../assets/images/Categories/Pixar-Logo.png"),
    require("../assets/images/Categories/Marvel-Logo.png"),
    require("../assets/images/Categories/StarWars-Logo.png"),
    require("../assets/images/Categories/NatGeo-Logo.png"),
    require("../assets/images/Categories/HBO-Logo.png"),
];

export default function Categories() {
    return (
        // negative margins to align gutters to the screen edges
        <View className="flex-row flex-wrap">
            {logos.map((src, i) => (
                <View key={i} className="w-1/3 px-1 py-1">
                    {/* full-width, fixed-height rectangle */}
                    <View className="bg-dark-100 w-full h-20 rounded-lg justify-center items-center">
                        <Image
                            source={src}
                            className="w-3/4 h-24"
                            resizeMode="contain"
                        />
                    </View>
                </View>
            ))}
        </View>
    );
}
