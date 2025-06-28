/* eslint-disable @typescript-eslint/no-unused-vars */
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { router } from "expo-router";
import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import Toast from "react-native-toast-message";
import { Colors } from "../constants/Colors";
import { useLogin } from "../lib/auth";

export default function LogInScreen() {
	const navigation = useNavigation<StackNavigationProp<any>>();

	const [email, setEmail] = useState("");
	const [password, setPassword] = useState("");
	const [isLoading, setIsLoading] = useState(false);
	const [errorMessage, setErrorMessage] = useState("");
	const { login, error } = useLogin();
	const [confirmationMessage, setConfirmationMessage] = useState("");
	const [showPassword, setShowPassword] = useState(false);

	const [errors, setErrors] = useState({
		UsernameOrEmail: "",
		Password: "",
	});

	const handleLogin = async () => {
		setIsLoading(true);
		try {
			await login(email, password);
			Toast.show({
				type: "success",
				text1: "Login Successful",
				text2: "Welcome back!",
			});
			setErrorMessage("");
			setIsLoading(false);
			router.push("/(tabs)/HomeScreen");
			// navigation.navigate("Navigation");
		} catch (e) {
			setConfirmationMessage("");
			Toast.show({
				type: "error",
				text1: "Login Failed",
				text2: "Please check your credentials and try again.",
			});
			setIsLoading(false);
			console.error("Login failed:", e);
		}
	};

	return (
		<>
			<KeyboardAvoidingView
				behavior={Platform.OS === "ios" ? "padding" : "height"}
				keyboardVerticalOffset={Platform.OS === "ios" ? 80 : 0}
				style={{ flex: 1 }}
			>
				<ScrollView
					contentContainerStyle={styles.container}
					keyboardShouldPersistTaps="handled"
				>
					<Text style={styles.title}>Log In</Text>

					<Text style={styles.subtitle}>
						{" "}
						Welcome Back! Glad to see you again
					</Text>
					<TextInput
						placeholder="Email/Username"
						style={styles.input}
						value={email}
						onChangeText={(text) => {
							setEmail(text);
							setErrors((prev) => ({ ...prev, email: "" }));
						}}
						placeholderTextColor={Colors.accent}
						keyboardType="email-address"
						inputMode="email"
					/>
					{errors.UsernameOrEmail ? (
						<Text style={styles.errorText}>{errors.UsernameOrEmail}</Text>
					) : null}

					{/* Password */}
					<TextInput
						placeholder="Password"
						secureTextEntry={!showPassword}
						style={styles.input}
						value={password}
						onChangeText={setPassword}
						placeholderTextColor={Colors.accent}
					/>
					<TouchableOpacity
						style={styles.showPasswordContainer}
						activeOpacity={0.8}
						onPress={() => setShowPassword(!showPassword)}
					>
						<Switch
							value={showPassword}
							onValueChange={(value) => setShowPassword(value)}
							trackColor={{ false: "#ccc", true: Colors.accent }}
							thumbColor={showPassword ? "#fff" : "#fff"}
						/>
						<Text style={styles.showPasswordText}>
							{showPassword ? "Hide Password" : "Show Password"}
						</Text>
					</TouchableOpacity>

					{/* Signup Button */}
					<TouchableOpacity style={styles.signupButton} onPress={handleLogin}>
						<Text style={styles.signupButtonText}>LOG IN</Text>
					</TouchableOpacity>

					{/* Footer */}
					<TouchableOpacity onPress={() => navigation.navigate("SignUpScreen")}>
						<Text style={styles.loginText}>
							New to InnerBlend?{" "}
							<Text
								style={{ fontWeight: "bold", textDecorationLine: "underline" }}
							>
								Sign In
							</Text>
						</Text>
					</TouchableOpacity>
				</ScrollView>
			</KeyboardAvoidingView>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flexGrow: 1,
		backgroundColor: Colors.background,
		paddingHorizontal: 20,
		paddingBottom: 100,
		paddingVertical: 80,
	},
	title: {
		fontSize: 35,
		marginBottom: 30,
		fontFamily: "ComicNeue-Bold",
		textAlign: "center",
		color: Colors.textPrimary,
	},
	subtitle: {
		fontSize: 17,
		color: Colors.accent,
		textAlign: "center",
		paddingHorizontal: 10,
		marginBottom: 20,
		fontFamily: "ComicNeue-Bold",
	},
	input: {
		width: "100%",
		height: 50,
		backgroundColor: "white",
		borderRadius: 10,
		paddingHorizontal: 15,
		marginBottom: 15,
		fontSize: 16,
		fontFamily: "ComicNeue-Regular",
	},
	showPasswordContainer: {
		flexDirection: "row",
		alignItems: "center",
		marginBottom: 15,
	},
	showPasswordText: {
		marginLeft: 10,
		fontSize: 16,
		color: Colors.accent,
		fontFamily: "ComicNeue-Regular",
	},

	checkIcon: {
		marginLeft: 10,
	},
	signupButton: {
		backgroundColor: Colors.accent,
		width: "100%",
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: "center",
		marginBottom: 20,
	},
	signupButtonText: {
		color: "white",
		fontSize: 20,
		fontFamily: "ComicNeue-Bold",
	},
	orText: {
		fontSize: 14,
		color: Colors.accent,
		marginBottom: 10,
		textAlign: "center",
		fontFamily: "ComicNeue-Regular",
	},
	googleButton: {
		backgroundColor: "white",
		borderWidth: 1,
		borderColor: Colors.accent,
		width: "100%",
		paddingVertical: 15,
		borderRadius: 10,
		alignItems: "center",
		marginBottom: 20,
	},
	googleButtonText: {
		color: Colors.accent,
		fontSize: 20,
		fontFamily: "ComicNeue-Bold",
	},
	errorText: {
		color: "red",
		fontSize: 13,
		marginBottom: 10,
		fontFamily: "ComicNeue-Regular",
	},
	loginText: {
		fontSize: 16,
		color: Colors.accent,
		textAlign: "center",
		marginTop: 10,
		fontFamily: "ComicNeue-Regular",
	},
});
