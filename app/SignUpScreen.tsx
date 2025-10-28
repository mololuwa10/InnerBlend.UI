import { Colors } from "@/constants/Colors";
import { registerUser } from "@/lib/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { router } from "expo-router";
import { CheckCircle, Eye, EyeClosed } from "lucide-react-native";
import React, { useState } from "react";
import {
	ActivityIndicator,
	Alert,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";

export default function SignUpScreen() {
	const navigation = useNavigation<StackNavigationProp<any>>();

	// Form states
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");
	const [showPassword, setShowPassword] = useState(false);
	const [showConfirmPassword, setShowConfirmPassword] = useState(false);
	const [isLoading, setIsLoading] = useState(false);
	const [errors, setErrors] = useState({
		firstname: "",
		lastname: "",
		email: "",
		username: "",
		password: "",
		confirmPassword: "",
	});

	const isPasswordMatch = password !== "" && password === confirmPassword;

	const validate = () => {
		let valid = true;
		const newErrors = {
			firstname: "",
			lastname: "",
			email: "",
			username: "",
			password: "",
			confirmPassword: "",
		};

		if (firstName.trim() === "") {
			newErrors.firstname = "First name is required.";
			valid = false;
		}
		if (lastName.trim() === "") {
			newErrors.lastname = "Last name is required.";
			valid = false;
		}
		if (username.trim() === "") {
			newErrors.username = "Username is required.";
			valid = false;
		}
		const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
		if (!emailRegex.test(email)) {
			newErrors.email = "Invalid email address.";
			valid = false;
		}
		const passwordRegex =
			/^(?=.*[A-Z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/;
		if (!passwordRegex.test(password)) {
			newErrors.password =
				"At least 8 characters, 1 uppercase letter, 1 number, and 1 special character.";
			valid = false;
		}
		if (password !== confirmPassword) {
			newErrors.confirmPassword = "Passwords do not match.";
			valid = false;
		}

		setErrors(newErrors);
		return valid;
	};

	const SignUp = async () => {
		if (validate()) {
			setIsLoading(true);
			try {
				const userData = {
					FirstName: firstName,
					LastName: lastName,
					username,
					email,
					password,
					confirmPassword,
				};
				await registerUser(userData);
				Toast.show({
					type: "success",
					text1: "Registration Successful",
					text2: "Welcome To Inner Blend!",
				});
				router.push("/(tabs)/HomeScreen");
				// navigation.navigate("Navigation");
			} catch (error) {
				Toast.show({
					type: "error",
					text1: "Registration Failed",
					text2: "Please check your credentials and try again.",
				});
				console.log("Registration Error", (error as Error).message);
			} finally {
				setIsLoading(false);
			}
		} else {
			Alert.alert("Validation Error", "Please correct the errors in the form.");
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
					<Text style={styles.title}>Sign Up</Text>
					{/* First Name */}
					<TextInput
						style={styles.input}
						placeholder="First Name"
						value={firstName}
						onChangeText={(text) => {
							setFirstName(text);
							setErrors((prev) => ({ ...prev, firstname: "" }));
						}}
						placeholderTextColor={Colors.accent}
					/>{" "}
					{errors.firstname ? (
						<Text style={styles.errorText}>{errors.firstname}</Text>
					) : null}
					{/* Last Name */}
					<TextInput
						placeholder="Last Name"
						style={styles.input}
						value={lastName}
						onChangeText={(text) => {
							setLastName(text);
							setErrors((prev) => ({ ...prev, lastname: "" }));
						}}
						placeholderTextColor={Colors.accent}
					/>
					{errors.lastname ? (
						<Text style={styles.errorText}>{errors.lastname}</Text>
					) : null}
					{/* Email */}
					<TextInput
						placeholder="Email"
						style={styles.input}
						value={email}
						onChangeText={(text) => {
							setEmail(text);
							setErrors((prev) => ({ ...prev, email: "" }));
						}}
						placeholderTextColor={Colors.accent}
					/>
					{errors.email ? (
						<Text style={styles.errorText}>{errors.email}</Text>
					) : null}
					{/* Username */}
					<TextInput
						placeholder="Username"
						style={styles.input}
						value={username}
						onChangeText={(text) => {
							setUsername(text);
							setErrors((prev) => ({ ...prev, username: "" }));
						}}
						placeholderTextColor={Colors.accent}
					/>
					{errors.username ? (
						<Text style={styles.errorText}>{errors.username}</Text>
					) : null}
					{/* Password */}
					<View style={styles.confirmPasswordContainer}>
						<TextInput
							placeholder="Password"
							secureTextEntry={!showPassword}
							style={styles.confirmInput}
							value={password}
							onChangeText={setPassword}
							placeholderTextColor={Colors.accent}
						/>

						<TouchableOpacity onPress={() => setShowPassword(!showPassword)}>
							<Text style={styles.showPasswordText}>
								{showPassword ? <EyeClosed /> : <Eye />}
							</Text>
						</TouchableOpacity>
					</View>
					{errors.password ? (
						<Text style={styles.errorText}>{errors.password}</Text>
					) : null}
					{/* Confirm Password */}
					<View style={styles.confirmPasswordContainer}>
						<TextInput
							placeholder="Confirm Password"
							secureTextEntry={!showConfirmPassword}
							style={styles.confirmInput}
							value={confirmPassword}
							onChangeText={setConfirmPassword}
							placeholderTextColor={Colors.accent}
						/>

						<TouchableOpacity
							onPress={() => setShowConfirmPassword(!showConfirmPassword)}
						>
							<Text style={styles.showPasswordText}>
								{showConfirmPassword ? <EyeClosed /> : <Eye />}
							</Text>
						</TouchableOpacity>

						{isPasswordMatch && (
							<CheckCircle
								size={24}
								color={Colors.highlight}
								style={styles.checkIcon}
							/>
						)}
					</View>
					{/* Signup Button */}
					<TouchableOpacity
						style={[styles.signupButton, isLoading && { opacity: 0.8 }]}
						onPress={SignUp}
						disabled={isLoading}
					>
						{isLoading ? (
							<ActivityIndicator size="small" color="#fff" />
						) : (
							<Text style={styles.signupButtonText}>SIGN UP</Text>
						)}
					</TouchableOpacity>
					{/* Divider */}
					<Text style={styles.orText}>or</Text>
					{/* Google Sign up Button */}
					<TouchableOpacity style={styles.googleButton}>
						<Text style={styles.googleButtonText}>Sign up with Google</Text>
					</TouchableOpacity>
					{/* Footer */}
					<TouchableOpacity onPress={() => navigation.navigate("LogInScreen")}>
						<Text style={styles.loginText}>
							Already have an account?{" "}
							<Text
								style={{ fontWeight: "bold", textDecorationLine: "underline" }}
							>
								Log in
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
		paddingVertical: 60,
	},
	title: {
		fontSize: 35,
		marginBottom: 30,
		fontFamily: "ComicNeue-Bold",
		textAlign: "center",
		color: Colors.textPrimary,
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
	confirmPasswordContainer: {
		width: "100%",
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "white",
		borderRadius: 10,
		marginBottom: 15,
		paddingHorizontal: 15,
	},
	confirmInput: {
		flex: 1,
		height: 50,
		fontSize: 16,
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
});
