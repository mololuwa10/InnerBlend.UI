/* eslint-disable import/no-unresolved */
import { DarkColors } from "@/constants/Colors";
import { updateUserProfile } from "@/lib/apiPutActions";
import { fetchUserDetails, UserDetails } from "@/lib/auth";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import * as ImagePicker from "expo-image-picker";
import { ArrowLeft, Camera } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
	Image,
	Platform,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import Toast from "react-native-toast-message";

const LabeledInput = ({ label, value, onChange, fieldType, ...props }: any) => (
	<View style={styles.inputGroup}>
		<Text style={styles.label}>{label}</Text>
		<View style={styles.inputWrapper}>
			<TextInput
				value={value}
				onChangeText={onChange}
				autoComplete={fieldType}
				style={{
					color: "white",
					fontFamily: "ComicNeue-Regular",
					fontSize: 15,
				}}
				{...props}
			/>
		</View>
	</View>
);

export default function PersonalInfo() {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const [selectedImage, setSelectedImage] = useState<string | undefined>(
		undefined
	);
	const [firstName, setFirstName] = useState("");
	const [lastName, setLastName] = useState("");
	const [email, setEmail] = useState("");
	const [username, setUsername] = useState("");
	const [phoneNumber, setPhoneNumber] = useState("");
	const [password, setPassword] = useState("");
	const [confirmPassword, setConfirmPassword] = useState("");

	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);

	useEffect(() => {
		const fetchData = async () => {
			try {
				const details = await fetchUserDetails();
				setUserDetails(details);
			} catch (error) {
				console.error("Error fetching user details: ", error);
				Toast.show({
					type: "error",
					text1: "Fetch Failed",
					text2: "Unable to fetch user details. Please try again.",
				});
			}
		};

		fetchData();
	}, []);

	useEffect(() => {
		if (userDetails) {
			setFirstName(userDetails.firstName || "");
			setLastName(userDetails.lastName || "");
			setEmail(userDetails.email || "");
			setUsername(userDetails.userName || "");
			setPhoneNumber(userDetails.phoneNumber || "");
		}
	}, [userDetails]);

	const handleImageSelection = async () => {
		try {
			const result = await ImagePicker.launchImageLibraryAsync({
				mediaTypes: ImagePicker.MediaTypeOptions.All,
				allowsEditing: true,
				aspect: [4, 4],
				quality: 1,
			});

			if (!result.canceled && result.assets && result.assets.length > 0) {
				setSelectedImage(result.assets[0].uri);
			}
		} catch (error) {
			console.error("Error selecting image: ", error);
			Toast.show({
				type: "error",
				text1: "Image Selection Failed",
				text2: "Something went wrong. Please try again.",
			});
		}
	};

	const handleUpdateProfile = async () => {
		const updateUserItem = {
			FirstName: firstName,
			LastName: lastName,
			Email: email,
			Username: username,
			PhoneNumber: phoneNumber,
		};

		try {
			const response = await updateUserProfile(updateUserItem);
			if (response) {
				Toast.show({
					type: "success",
					text1: "Update Successful",
					text2: "Your profile has been updated successfully.",
				});
			} else {
				Toast.show({
					type: "error",
					text1: "Update Failed",
					text2: "Failed to update profile. Please try again.",
				});
			}
		} catch (error: any) {
			Toast.show({
				type: "error",
				text1: "Update Failed",
				text2: "Failed to update profile. Please try again.",
			});
			console.log(error);
		}
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.headerContainer}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<ArrowLeft size={22} color="white" />
					</TouchableOpacity>

					<View style={{ flex: 1, alignItems: "center" }}>
						<Text style={styles.headerText}>Edit Profile</Text>
					</View>

					<TouchableOpacity
						onPress={() => handleUpdateProfile()}
						style={styles.saveButton}
					>
						<Text style={styles.saveButtonText}>Save</Text>
					</TouchableOpacity>
				</View>

				<ScrollView style={styles.scrollContainer}>
					<View style={styles.imageContainer}>
						<TouchableOpacity onPress={handleImageSelection}>
							<Image
								source={{ uri: selectedImage || "https://picsum.photos/200" }}
								style={styles.profileImage}
							/>

							<View style={styles.cameraIconWrapper}>
								<Camera
									size={32}
									color={"#ffff"}
									style={{ paddingHorizontal: 25, paddingVertical: 5 }}
								/>
							</View>
						</TouchableOpacity>
					</View>

					<View>
						{/* First name */}
						<LabeledInput
							label="First Name"
							value={firstName}
							onChangeText={(value: React.SetStateAction<string>) =>
								setFirstName(value)
							}
						/>

						{/* Last name */}
						<LabeledInput
							label="Last Name"
							value={lastName}
							onChangeText={(value: React.SetStateAction<string>) =>
								setLastName(value)
							}
						/>

						{/* Email */}
						<LabeledInput
							label="Email"
							value={email}
							onChangeText={(value: React.SetStateAction<string>) =>
								setEmail(value)
							}
						/>

						{/* Username */}
						<LabeledInput
							label="Username"
							value={username}
							onChangeText={(value: React.SetStateAction<string>) =>
								setUsername(value)
							}
						/>

						{/* Phone Number */}
						<LabeledInput
							label="Phone Number"
							value={phoneNumber}
							onChangeText={(value: React.SetStateAction<string>) =>
								setPhoneNumber(value)
							}
						/>

						{/* Password */}
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Password</Text>
							<View style={styles.inputWrapper}>
								<TextInput
									value={password}
									onChangeText={(value) => setPassword(value)}
									editable={true}
									secureTextEntry={true}
									style={styles.textInput}
								/>
							</View>
						</View>

						{/* Confirm Password */}
						<View style={styles.inputGroup}>
							<Text style={styles.label}>Confirm Password</Text>
							<View style={styles.inputWrapper}>
								<TextInput
									value={confirmPassword}
									onChangeText={(value) => setConfirmPassword(value)}
									editable={true}
									secureTextEntry={true}
									style={styles.textInput}
								/>
							</View>
						</View>
					</View>
				</ScrollView>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: DarkColors.background,
	},
	headerContainer: {
		flexDirection: "row",
		alignItems: "center",
		paddingVertical: 10,
		paddingHorizontal: 20,
		paddingTop: Platform.OS === "ios" ? 50 : 10,
	},
	headerText: {
		fontSize: 20,
		fontFamily: "ComicNeue-Bold",
		color: "white",
		textAlign: "center",
	},
	saveButton: {
		borderRadius: 50,
		backgroundColor: DarkColors.buttonColor,
	},
	saveButtonText: {
		color: "white",
		paddingHorizontal: 25,
		paddingVertical: 15,
		fontFamily: "ComicNeue-Bold",
	},
	scrollContainer: {
		paddingHorizontal: 20,
		marginBottom: 10,
	},
	imageContainer: {
		alignItems: "center",
		marginVertical: 22,
	},
	profileImage: {
		height: 170,
		width: 170,
		borderRadius: 85,
		borderWidth: 5,
		borderColor: "#3f3f3f",
	},
	cameraIconWrapper: {
		position: "absolute",
		bottom: 0,
		right: 10,
		zIndex: 9999,
		backgroundColor: "#3f3f3f",
		borderRadius: 20,
	},
	inputGroup: {
		flexDirection: "column",
		marginBottom: 6,
	},
	label: {
		fontSize: 17,
		color: "white",
		fontFamily: "ComicNeue-Bold",
		marginBottom: 6,
	},
	inputWrapper: {
		height: 44,
		width: "100%",
		borderColor: DarkColors.accent,
		borderWidth: 1,
		borderRadius: 4,
		marginVertical: 6,
		justifyContent: "center",
		paddingLeft: 8,
	},
	textInput: {
		color: "white",
	},
});
