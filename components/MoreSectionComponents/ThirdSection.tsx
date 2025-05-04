/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { Text, TouchableOpacity, View } from "react-native";

import { DarkColors } from "@/constants/Colors";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";

type RootStackParamList = {
	ProfileScreen: undefined;
	// Add other screen names and their respective params here
};

type NavigationProp = StackNavigationProp<RootStackParamList, "ProfileScreen">;
export default function ThirdSection() {
	const navigation = useNavigation<NavigationProp>();
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
						navigation.navigate("ProfileScreen");
					}}
				>
					{/* Checklist icon */}
					<Ionicons
						name="settings-outline"
						size={35}
						color={"#FFFFFF"}
						style={{
							color: DarkColors.textPrimary,
							textAlign: "center",
							width: 50,
						}}
					/>

					<Text style={{ color: DarkColors.textPrimary, fontSize: 16 }}>
						Account Settings
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
					<Ionicons
						name="moon-outline"
						size={35}
						color={"#FFFFFF"}
						style={{
							color: DarkColors.textPrimary,
							textAlign: "center",
							width: 50,
						}}
					/>

					<Text style={{ color: DarkColors.textPrimary, fontSize: 16 }}>
						App theme
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
						name="cloud-outline"
						size={35}
						color={DarkColors.textPrimary}
						style={{
							color: DarkColors.textPrimary,
							textAlign: "center",
							width: 50,
						}}
					/>

					<Text style={{ color: DarkColors.textPrimary, fontSize: 16 }}>
						Backup/Sync
					</Text>
				</TouchableOpacity>
			</View>
		</>
	);
}
