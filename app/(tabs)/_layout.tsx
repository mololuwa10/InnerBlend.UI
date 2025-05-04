import { createBottomTabNavigator } from "@react-navigation/bottom-tabs";
import {
	Home,
	PlusSquare,
	BookText,
	User,
	Menu,
	Calendar,
} from "lucide-react-native";
import React from "react";
import { View, Text } from "react-native";
import { Colors, DarkColors } from "@/constants/Colors";
import MoreSection from "@/components/ProfilePageComponents/MoreSection";
import HomeScreen from "./HomeScreen";
import CalenderViewScreen from "./CalendarViewScreen";

const Tab = createBottomTabNavigator();

// Placeholder screens
// const HomeScreen = () => (
// 	<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
// 		<Text>Home</Text>
// 	</View>
// );
const WriteScreen = () => (
	<View>
		<Text>New Entry</Text>
	</View>
);
const JournalScreen = () => (
	<View>
		<Text>All Entries</Text>
	</View>
);
const ProfileScreen = () => (
	<View>
		<Text>Profile</Text>
	</View>
);

export default function BottomTabs() {
	return (
		<Tab.Navigator
			screenOptions={({ route }) => ({
				headerShown: false,
				tabBarActiveTintColor: DarkColors.highlight,
				tabBarInactiveTintColor: "#888",
				tabBarStyle: {
					backgroundColor: DarkColors.background,
					borderTopColor: "transparent",
					borderTopWidth: 0,
					elevation: 0,
					shadowOpacity: 0,
					height: 70,
					paddingBottom: 10,
				},
				tabBarIcon: ({ color, size }) => {
					switch (route.name) {
						case "Home":
							return <Home color={color} size={22} />;
						case "Calendar":
							return <Calendar color={color} size={22} />;
						case "Journal":
							return <BookText color={color} size={22} />;
						case "Menu":
							return <Menu color={color} size={22} />;
						default:
							return null;
					}
				},
				tabBarLabelStyle: {
					fontSize: 14,
					fontFamily: "ComicNeue-Regular",
				},
			})}
		>
			<Tab.Screen
				name="Home"
				component={HomeScreen}
				options={{ headerShown: false }}
			/>
			<Tab.Screen name="Calendar" component={CalenderViewScreen} />
			<Tab.Screen name="Journal" component={JournalScreen} />
			<Tab.Screen name="Menu" component={MoreSection} />
		</Tab.Navigator>
	);
}
