/* eslint-disable import/no-unresolved */

import { DarkColors } from "@/constants/Colors";
import { useLogout } from "@/lib/auth";
import { Ionicons } from "@expo/vector-icons";
import { CommonActions, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React from "react";
import { Alert, Text, TouchableOpacity, View } from "react-native";

// type RootStackParamList = {
// 	Login: undefined;
// };

// type NavigationProp = StackNavigationProp<RootStackParamList, "Login">;

export default function FourthSection() {
	const { logout } = useLogout();
	const navigation = useNavigation<StackNavigationProp<any>>(); // Handle navigation in the component

	const handleLogout = () => {
		Alert.alert("Logout", "Are you sure you want to logout?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Logout",
				onPress: async () => {
					await logout(); // Call the logout function and wait for it to finish
					navigation.dispatch(
						CommonActions.reset({
							index: 0,
							routes: [{ name: "LogInScreen" }], // Replace the entire stack with the Login screen
						})
					);
				},
			},
		]);
	};

	return (
		<>
			{/* Third Section */}
			<View style={{ flex: 1 }}>
				<TouchableOpacity
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						gap: 20,
						marginStart: 10,
					}}
					onPress={() => {
						console.log("Settings");
					}}
				>
					<Ionicons
						name="share-social-outline"
						size={35}
						color={DarkColors.textPrimary}
						style={{
							color: DarkColors.textPrimary,
							textAlign: "center",
							width: 50,
						}}
					/>
					<Text
						style={{
							color: DarkColors.textPrimary,
							fontSize: 18,
							fontFamily: "ComicNeue-Bold",
						}}
					>
						Share Inner Blend
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						marginTop: 20,
						gap: 20,
						marginStart: 10,
					}}
					onPress={() => {
						console.log("Notifications");
					}}
				>
					{/* info icon */}

					<Ionicons
						name="information-circle-outline"
						size={35}
						color={DarkColors.textPrimary}
						style={{
							color: DarkColors.textPrimary,
							textAlign: "center",
							width: 50,
						}}
					/>

					<Text
						style={{
							color: DarkColors.textPrimary,
							fontSize: 18,
							fontFamily: "ComicNeue-Bold",
						}}
					>
						About Inner Blend
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						marginTop: 20,
						gap: 20,
						marginStart: 10,
					}}
					onPress={() => {
						console.log("Settings");
					}}
				>
					<Ionicons
						name="help-outline"
						size={35}
						color={DarkColors.textPrimary}
						style={{
							color: DarkColors.textPrimary,
							textAlign: "center",
							width: 50,
						}}
					/>

					<Text
						style={{
							color: DarkColors.textPrimary,
							fontSize: 18,
							fontFamily: "ComicNeue-Bold",
						}}
					>
						Help
					</Text>
				</TouchableOpacity>

				{/* <TouchableOpacity
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						marginTop: 20,
						gap: 20,
						marginStart: 10,
					}}
					onPress={() => {
						console.log("Settings");
					}}
				>
					<Ionicons
						name="earth-outline"
						size={35}
						color={DarkColors.textPrimary}
						style={{
							color: DarkColors.textPrimary,
							textAlign: "center",
							width: 50,
						}}
					/>

					<Text style={{ color: DarkColors.textPrimary, fontSize: 18 }}>Language</Text>
				</TouchableOpacity> */}

				<TouchableOpacity
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						marginTop: 20,
						gap: 20,
						marginStart: 10,
					}}
					onPress={handleLogout}
				>
					<Ionicons
						name="exit-outline"
						size={35}
						color={DarkColors.textPrimary}
						style={{
							color: DarkColors.textPrimary,
							textAlign: "center",
							width: 50,
						}}
					/>

					<Text
						style={{
							color: DarkColors.textPrimary,
							fontSize: 18,
							fontFamily: "ComicNeue-Bold",
						}}
					>
						Sign Out
					</Text>
				</TouchableOpacity>

				<TouchableOpacity
					style={{
						flex: 1,
						flexDirection: "row",
						alignItems: "center",
						marginTop: 20,
						gap: 20,
						marginStart: 10,
					}}
					onPress={() => {
						console.log("Settings");
					}}
				>
					<Ionicons
						name="trash-outline"
						size={35}
						color={DarkColors.textPrimary}
						style={{
							color: DarkColors.textPrimary,
							textAlign: "center",
							width: 50,
						}}
					/>

					<Text
						style={{
							color: DarkColors.textPrimary,
							fontSize: 18,
							fontFamily: "ComicNeue-Bold",
						}}
					>
						Delete Account
					</Text>
				</TouchableOpacity>
			</View>
		</>
	);
}
