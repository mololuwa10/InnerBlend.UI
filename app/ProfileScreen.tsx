/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ionicons } from "@expo/vector-icons";
import {
	CommonActions,
	useFocusEffect,
	useNavigation,
} from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { ArrowLeft, ArrowRight, LogOut, Trash2 } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
	Alert,
	Platform,
	ScrollView,
	StyleSheet,
	Switch,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { DarkColors } from "../constants/Colors";
import { deleteUser } from "../lib/apiDeleteActions";
import { fetchUserDetails, useLogout, UserDetails } from "../lib/auth";

export default function ProfileScreen() {
	const navigation = useNavigation<StackNavigationProp<any>>();
	const [isDarkMode, setIsDarkMode] = useState(false);
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const { logout } = useLogout();

	useFocusEffect(
		useCallback(() => {
			let isMounted = true;
			const getUserDetails = async () => {
				const details = await fetchUserDetails();
				if (details) {
					setUserDetails(details);
				}
			};

			getUserDetails();

			return () => {
				isMounted = false;
			};
		}, [])
	);

	const handleLogout = () => {
		Alert.alert("Logout", "Are you sure you want to logout?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Logout",
				onPress: async () => {
					await logout();
					navigation.dispatch(
						CommonActions.reset({
							index: 0,
							routes: [{ name: "Login" }],
						})
					);
				},
			},
		]);
	};

	const handleDeleteAccount = () => {
		Alert.alert(
			"Delete Account",
			"Are you sure you want to delete your account? This action cannot be undone.",
			[
				{
					text: "Cancel",
					style: "cancel",
				},
				{
					text: "Delete",
					style: "destructive",
					onPress: async () => {
						try {
							await deleteUser();
							navigation.dispatch(
								CommonActions.reset({
									index: 0,
									routes: [{ name: "LaunchScreen" }],
								})
							);
						} catch (error: any) {
							Alert.alert(
								"Delete Failed",
								"An error occurred while deleting your account. Please try again."
							);
							console.log(error);
						}
					},
				},
			]
		);
	};

	return (
		<>
			<View style={styles.container}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => navigation.goBack()}>
						<ArrowLeft size={22} color="white" />
					</TouchableOpacity>
					<View style={styles.headerTitleWrapper}>
						<Text style={styles.headerTitle}>Profile</Text>
					</View>
				</View>

				<ScrollView contentContainerStyle={styles.scrollContent}>
					{/* User Info Section */}
					<View style={styles.userInfoContainer}>
						<Ionicons
							name="person-circle"
							size={100}
							color={DarkColors.highlight}
						/>
						<Text style={styles.userName}>
							{userDetails?.firstName} {userDetails?.lastName}
						</Text>
						<Text style={styles.userEmail}>
							{userDetails ? userDetails.email : ""}
						</Text>
					</View>

					{/* General Settings */}
					<View>
						<Text style={styles.sectionHeader}>General</Text>
						<View style={styles.sectionContainer}>
							<TouchableOpacity
								style={styles.sectionRow}
								onPress={() => navigation.navigate("PersonalInfo")}
							>
								<Text style={styles.textWhite}>Personal Info</Text>
								<ArrowRight color={"#fff"} />
							</TouchableOpacity>

							<TouchableOpacity style={styles.sectionRow}>
								<Text style={styles.textWhite}>Dark Mode</Text>
								<Switch
									value={isDarkMode}
									onValueChange={() => setIsDarkMode(!isDarkMode)}
								/>
							</TouchableOpacity>
							<TouchableOpacity
								style={styles.sectionRow}
								onPress={() => navigation.navigate("TaskList")}
							>
								<Text style={styles.textWhite}>All Journals</Text>
								<ArrowRight color={"#fff"} />
							</TouchableOpacity>
						</View>
					</View>

					{/* Support Section */}
					<View style={{ marginTop: 10 }}>
						<Text style={styles.sectionHeader}>Support</Text>
						<View
							style={{
								backgroundColor: DarkColors.buttonColor,
								padding: 15,
								borderRadius: 10,
								marginBottom: 10,
								elevation: 2,
							}}
						>
							<TouchableOpacity style={styles.sectionRow}>
								<Text style={styles.textWhite}>Help Center</Text>
								<ArrowRight color={"#fff"} />
							</TouchableOpacity>

							<TouchableOpacity style={styles.sectionRow}>
								<Text style={styles.textWhite}>Contact Us</Text>
								<ArrowRight color={"#fff"} />
							</TouchableOpacity>
						</View>
					</View>

					{/* General Settings */}
					<View style={{ marginTop: 10 }}>
						<Text style={styles.sectionHeader}>Account</Text>
						<View style={styles.sectionContainer}>
							<TouchableOpacity
								style={styles.sectionRow}
								onPress={handleLogout}
							>
								<Text style={styles.textWhite}>Logout</Text>
								<LogOut color={"white"} size={20} />
							</TouchableOpacity>

							<TouchableOpacity
								style={styles.sectionRow}
								onPress={handleDeleteAccount}
							>
								<Text style={styles.textWhite}>Delete Account</Text>
								<Trash2 color={"white"} size={20} />
							</TouchableOpacity>
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
	header: {
		flexDirection: "row",
		alignItems: "center",
		paddingHorizontal: 20,
		paddingTop: Platform.OS === "ios" ? 50 : 40,
	},
	headerTitleWrapper: {
		flex: 1,
		alignItems: "center",
	},
	headerTitle: {
		fontSize: 23,
		fontFamily: "ComicNeue-Bold",
		color: "white",
		textAlign: "center",
	},
	scrollContent: {
		flexGrow: 1,
		padding: 20,
		paddingTop: 0,
		paddingBottom: 20,
	},
	userInfoContainer: {
		alignItems: "center",
		marginVertical: 20,
	},
	userName: {
		fontSize: 26,
		fontFamily: "ComicNeue-Bold",
		marginTop: 10,
		color: "#fff",
	},
	userEmail: {
		color: "#fff",
		marginBottom: 20,
		fontFamily: "ComicNeue-Regular",
	},
	sectionHeader: {
		fontSize: 20,
		fontFamily: "ComicNeue-Bold",
		marginBottom: 10,
		color: "#fff",
	},
	sectionContainer: {
		backgroundColor: DarkColors.buttonColor,
		padding: 15,
		borderRadius: 10,
		marginBottom: 10,
		elevation: 2,
	},
	sectionRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingBottom: 10,
		borderBottomWidth: 0.5,
		borderBottomColor: "#444", // Optional
	},
	sectionRowNoBorder: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		paddingTop: 10,
		paddingBottom: 10,
	},
	textWhite: {
		color: "#fff",
		fontFamily: "ComicNeue-Regular",
		fontSize: 15,
	},
});
