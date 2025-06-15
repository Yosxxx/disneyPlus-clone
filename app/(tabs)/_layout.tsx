import { Ionicons } from "@expo/vector-icons";
import { Tabs } from "expo-router";

export default function Navbar() {
    return (
        <>
            <Tabs
                screenOptions={{
                    headerShown: false,
                    tabBarActiveTintColor: "#ffffff",
                    tabBarInactiveTintColor: "#898a8c",
                    tabBarStyle: {
                        borderTopColor: "#898a8c",
                        borderTopWidth: 0.3,
                        paddingTop: 5,
                        height: 80,
                        backgroundColor: "#0f1013",
                        shadowColor: "#000",
                        shadowOffset: { width: 10, height: -5 },
                        shadowOpacity: 1,
                        shadowRadius: 20,
                    },
                }}
            >
                <Tabs.Screen
                    name="index"
                    options={{
                        title: "Home",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="home-outline"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="search"
                    options={{
                        title: "Search",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="search-outline"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="watch-later"
                    options={{
                        title: "Watch Later",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="stopwatch-outline"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />

                <Tabs.Screen
                    name="profile"
                    options={{
                        title: "Profile",
                        tabBarIcon: ({ color, size }) => (
                            <Ionicons
                                name="person-circle-outline"
                                color={color}
                                size={size}
                            />
                        ),
                    }}
                />
            </Tabs>
        </>
    );
}
