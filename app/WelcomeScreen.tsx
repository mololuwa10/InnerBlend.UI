import React from "react";
import { View, Text, TouchableOpacity, StyleSheet } from "react-native";
import { Colors } from "@/constants/Colors";
import { StackNavigationProp } from "@react-navigation/stack";
import { useNavigation } from "@react-navigation/native";

export default function WelcomeScreen() {
	const navigation = useNavigation<StackNavigationProp<any>>();

	return (
		<View style={styles.container}>
			{/* Welcome Text */}
			<View style={styles.textContainer}>
				<Text style={styles.welcomeTitle}>WELCOME!</Text>
				<Text style={styles.subtitle}>
					Let&apos;s start your journey with InnerBlend
				</Text>
			</View>

			{/* Buttons */}
			<View style={styles.buttonContainer}>
				<TouchableOpacity
					style={styles.loginButton}
					onPress={() => navigation.navigate("LogInScreen")}
				>
					<Text style={styles.buttonText}>LOGIN</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={styles.signupButton}
					onPress={() => navigation.navigate("SignUpScreen")}
				>
					<Text style={styles.buttonText}>SIGN-UP</Text>
				</TouchableOpacity>
			</View>
		</View>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: Colors.background,
		justifyContent: "center",
		alignItems: "center",
		paddingHorizontal: 20,
	},
	textContainer: { marginBottom: 60, alignItems: "center" },
	welcomeTitle: {
		fontSize: 50,
		color: Colors.textPrimary,
		marginBottom: 10,
		fontFamily: "ComicNeue-Bold",
	},
	subtitle: {
		fontSize: 20,
		color: Colors.accent,
		textAlign: "center",
		fontFamily: "ComicNeue-Regular",
	},
	buttonContainer: {
		width: "100%",
		marginBottom: 40,
	},
	loginButton: {
		backgroundColor: Colors.accent,
		paddingVertical: 15,
		borderRadius: 10,
		marginBottom: 15,
		alignItems: "center",
	},
	signupButton: {
		backgroundColor: Colors.accent,
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		fontWeight: "bold",
		fontSize: 16,
	},
	skipText: {
		color: Colors.accent,
		fontSize: 14,
		textDecorationLine: "underline",
		fontFamily: "ComicNeue-Italic",
	},
});
