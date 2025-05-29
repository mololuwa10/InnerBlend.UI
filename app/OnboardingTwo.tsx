import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts } from "expo-font";
import { ChevronRight } from "lucide-react-native";
import React from "react";
import {
	ActivityIndicator,
	Image,
	Platform,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { Colors } from "../constants/Colors";

export default function OnboardingTwo() {
	const navigation = useNavigation<StackNavigationProp<any>>();

	const [fontsLoaded] = useFonts({
		"DancingScript-Regular": require("../assets/fonts/DancingScript-VariableFont_wght.ttf"),
		"ComicNeue-Regular": require("../assets/fonts/ComicNeue-Regular.ttf"),
		"ComicNeue-Bold": require("../assets/fonts/ComicNeue-Bold.ttf"),
		"ComicNeue-Light": require("../assets/fonts/ComicNeue-Light.ttf"),
		"ComicNeue-BoldItalic": require("../assets/fonts/ComicNeue-BoldItalic.ttf"),
		"ComicNeue-Italic": require("../assets/fonts/ComicNeue-Italic.ttf"),
		"ComicNeue-LightItalic": require("../assets/fonts/ComicNeue-LightItalic.ttf"),
	});

	if (!fontsLoaded) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<View style={styles.container}>
			{/* Top Row App Name */}
			<View style={styles.topRow}>
				<Text style={styles.appName}>Inner Blend</Text>
			</View>

			{/* Image for Onboarding */}
			<Image
				source={require("../assets/images/Onboarding/Onboarding2.png")}
				style={styles.image}
				resizeMode="contain"
			/>

			{/* Text Content */}
			<View style={styles.textContainer}>
				<Text style={styles.title}>ADD MULTIMEDIA</Text>
				<Text style={styles.subtitle}>
					save the best memories of your life with pictures, videos and audio
				</Text>
			</View>

			{/* Bottom Navigation */}
			<View style={styles.bottomNav}>
				<TouchableOpacity onPress={() => navigation.navigate("Login")}>
					<Text style={styles.skip}>Skip</Text>
				</TouchableOpacity>

				{/* Dots Indicator */}
				<View style={styles.dotsContainer}>
					<View style={styles.dot} />
					<View style={[styles.dot, styles.activeDot]} />
					<View style={styles.dot} />
				</View>

				<TouchableOpacity
					style={styles.nextButton}
					onPress={() => navigation.navigate("OnboardingThree")} // next onboarding screen
				>
					<ChevronRight color={"white"} size={28} />
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		alignItems: "center",
		justifyContent: "space-between",
		paddingTop: Platform.OS === "ios" ? 50 : 45,
		paddingVertical: 35,
		paddingHorizontal: 20,
	},
	topRow: {
		width: "100%",
		// paddingHorizontal: 20,
		// marginBottom: 10,
	},
	appName: {
		fontSize: 30,
		color: Colors.textPrimary,
		fontFamily: "DancingScript-Regular",
	},
	image: {
		width: 800,
		height: 390,
		marginTop: 50,
	},
	textContainer: {
		alignItems: "center",
		marginTop: 30,
	},
	title: {
		fontSize: 26,
		color: Colors.textPrimary,
		textAlign: "center",
		marginBottom: 10,
		fontFamily: "ComicNeue-Bold",
	},
	subtitle: {
		fontSize: 15,
		color: Colors.accent,
		textAlign: "center",
		paddingHorizontal: 10,
		fontFamily: "ComicNeue-Regular",
	},
	bottomNav: {
		width: "100%",
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 70,
	},
	skip: {
		color: Colors.accent,
		fontSize: 23,
		textDecorationLine: "underline",
		fontFamily: "ComicNeue-Bold",
	},
	dotsContainer: {
		flexDirection: "row",
		alignItems: "center",
	},
	dot: {
		width: 8,
		height: 8,
		borderRadius: 4,
		backgroundColor: Colors.accent,
		marginHorizontal: 4,
		opacity: 0.3,
	},
	activeDot: {
		opacity: 1,
	},
	nextButton: {
		backgroundColor: Colors.accent,
		width: 45,
		height: 45,
		borderRadius: 22.5,
		alignItems: "center",
		justifyContent: "center",
	},
	nextButtonText: {
		color: "white",
		fontSize: 20,
		fontWeight: "bold",
	},
});
