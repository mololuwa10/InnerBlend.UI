import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFonts } from "expo-font";
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

export default function OnboardingThree() {
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
				source={require("../assets/images/Onboarding/Onboarding3.png")}
				style={styles.image}
				resizeMode="contain"
			/>

			{/* Text Content */}
			<View style={styles.textContainer}>
				<Text style={styles.title}>SAFEGUARD YOUR JOURNAL</Text>
				<Text style={styles.subtitle}>
					Your journal entries stay private, secure, and personal, just for you.
				</Text>
			</View>

			{/* Bottom Navigation */}
			<View style={styles.bottomNav}>
				{/* Dots Indicator */}
				<View style={styles.dotsContainer}>
					<View style={styles.dot} />
					<View style={styles.dot} />
					<View style={[styles.dot, styles.activeDot]} />
				</View>

				<TouchableOpacity
					style={styles.startButton}
					onPress={() => navigation.navigate("WelcomeScreen")}
				>
					<Text style={styles.startButtonText}>START YOUR JOURNEY</Text>
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
	},
	appName: {
		fontSize: 30,
		color: Colors.textPrimary,
		fontFamily: "DancingScript-Regular",
	},
	image: {
		width: 800,
		height: 350,
		marginTop: 50,
	},
	textContainer: {
		alignItems: "center",
		marginTop: 30,
	},
	title: {
		fontSize: 28,
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
		alignItems: "center",
		marginTop: 40,
	},
	startButton: {
		backgroundColor: Colors.accent,
		paddingVertical: 15,
		paddingHorizontal: 70,
		borderRadius: 30,
	},
	startButtonText: {
		color: "white",
		fontSize: 16,
		fontFamily: "ComicNeue-Bold",
	},
	dotsContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 30,
		marginTop: 10,
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
});
