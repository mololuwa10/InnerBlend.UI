/* eslint-disable import/no-unresolved */

import { Colors } from "@/constants/Colors";
import { fetchUserDetails } from "@/lib/auth";
import AsyncStorage from "@react-native-async-storage/async-storage";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useRouter } from "expo-router";
import { ChevronRight } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	Image,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function Index() {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const [loading, setLoading] = useState(true);
	const router = useRouter();

	useEffect(() => {
		const checkAuth = async () => {
			try {
				const isNew = await AsyncStorage.getItem("isNewUser");

				if (isNew !== null && isNew !== "true") {
					const token = await AsyncStorage.getItem("token");
					if (!token) {
						router.replace("/");
						return;
					}

					const userDetails = await fetchUserDetails();
					if (userDetails) {
						router.replace("/(tabs)/HomeScreen");
					} else {
						navigation.navigate("index");
						// router.replace("/");
					}
				} else {
					// router.replace("/");
					navigation.navigate("index");
				}
			} catch (error) {
				console.error("Error checking auth: ", error);
				// router.replace("/");
				navigation.navigate("index");
			} finally {
				setLoading(false);
			}
		};

		const timeout = setTimeout(checkAuth, 3000);

		return () => clearTimeout(timeout); // Clean up on unmount
	}, [router]);

	if (loading) {
		return (
			<View style={{ flex: 1, justifyContent: "center", alignItems: "center" }}>
				<ActivityIndicator size="large" />
			</View>
		);
	}

	return (
		<>
			<View style={styles.container}>
				<View style={styles.topRow}>
					<Text style={styles.appName}>Inner Blend</Text>
				</View>

				{/* Image for Onboarding */}
				<Image
					source={require("../assets/images/Onboarding/Onboarding1.png")}
					style={styles.image}
					resizeMode="contain"
				/>

				{/* Text Content */}
				<View style={styles.textContainer}>
					<Text style={styles.title}>JOURNAL YOUR HEART AND MIND OUT</Text>
					<Text style={styles.subtitle}>
						digitalize your moods and thoughts from different parts of life
					</Text>
				</View>
				{/* Bottom Navigation */}
				<View style={styles.bottomNav}>
					<TouchableOpacity
						onPress={() => {
							navigation.navigate("WelcomeScreen");
						}}
					>
						<Text style={styles.skip}>Skip</Text>
					</TouchableOpacity>

					{/* Dots Indicator */}
					<View style={styles.dotsContainer}>
						<View style={[styles.dot, styles.activeDot]} />
						<View style={styles.dot} />
						<View style={styles.dot} />
					</View>

					<TouchableOpacity
						style={styles.nextButton}
						onPress={() => navigation.navigate("OnboardingTwo")} // next onboarding screen
					>
						<ChevronRight style={styles.nextButtonText} />
					</TouchableOpacity>
				</View>
				{/* Terms and Privacy */}
				<View style={styles.termsContainer}>
					<Text style={styles.termsText}>
						By continuing, you agree to our
						<Text style={styles.linkText}> Terms & Conditions </Text>
						and
						<Text style={styles.linkText}> Privacy Policy</Text>.
					</Text>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		alignItems: "center",
		justifyContent: "space-between",
		paddingVertical: 20,
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
		height: 390,
		marginTop: 50,
	},
	textContainer: {
		alignItems: "center",
		marginTop: 10,
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
		marginTop: 30,
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
	termsContainer: {
		width: "100%",
		alignItems: "center",
		marginTop: 10,
		paddingHorizontal: 20,
	},
	termsText: {
		fontSize: 14,
		color: Colors.accent,
		textAlign: "center",
		fontFamily: "ComicNeue-Regular",
	},
	linkText: {
		textDecorationLine: "underline",
		fontFamily: "ComicNeue-Bold",
	},
});
