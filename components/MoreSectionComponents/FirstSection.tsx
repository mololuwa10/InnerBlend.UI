/* eslint-disable import/no-unresolved */
/* eslint-disable @typescript-eslint/no-unused-vars */

import { DarkColors } from "@/constants/Colors";
import { fetchUserDetails, UserDetails } from "@/lib/auth";
import { Ionicons } from "@expo/vector-icons";
import { useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { useFocusEffect } from "expo-router";
import React, { useCallback, useState } from "react";
import { Text, TouchableOpacity, View } from "react-native";

type RootStackParamList = {
	Navigation: undefined;
	Register: undefined;
	// Add other screen names and their respective params here
};

type NavigationProp = StackNavigationProp<
	RootStackParamList,
	"Navigation",
	"Register"
>;

export default function FirstSection() {
	const [userDetails, setUserDetails] = useState<UserDetails | null>(null);
	const navigation = useNavigation<StackNavigationProp<any>>();

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

	return (
		<>
			{/* First section */}
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
						// navigation.navigate("UserTaskProfile");
					}}
				>
					<Text
						style={{
							color: DarkColors.textPrimary,
							fontSize: 16,
							textAlign: "center",
							width: 50,
							height: 50,
							borderRadius: 25,
							borderWidth: 3,
							borderColor: DarkColors.textPrimary,
							lineHeight: 40,
						}}
					>
						{userDetails?.firstName.charAt(0)}
					</Text>

					<Text style={{ color: DarkColors.textPrimary, fontSize: 16 }}>
						{userDetails?.firstName} {userDetails?.lastName}
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
						name="notifications-outline"
						size={35}
						color={DarkColors.textPrimary}
						style={{
							color: DarkColors.textPrimary,
							textAlign: "center",
							width: 50,
						}}
					/>

					<Text style={{ color: DarkColors.textPrimary, fontSize: 16 }}>
						Notifications
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
						navigation.navigate("TaskList");
					}}
				>
					<Ionicons
						name="book-outline"
						size={35}
						color={"#FFFFFF"}
						style={{
							color: DarkColors.textPrimary,
							textAlign: "center",
							width: 50,
						}}
					/>

					<Text style={{ color: DarkColors.textPrimary, fontSize: 16 }}>
						My Journals
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
						name="people-outline"
						size={35}
						color={"#FFFFFF"}
						style={{
							color: "#fff",
							textAlign: "center",
							width: 50,
						}}
					/>

					<Text style={{ color: "#fff", fontSize: 16 }}>Friends</Text>
				</TouchableOpacity> */}
			</View>
		</>
	);
}
