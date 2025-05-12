"use client";

import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import { UserDetails } from "./auth";

export interface EditUserModel {
	FirstName: string;
	LastName: string;
	Email: string;
	Username: string;
	PhoneNumber: string;
}

const ip =
	Constants.expoConfig?.extra?.apiHost ||
	Constants.manifest2?.extra?.apiHost ||
	"localhost";

// USER ACCOUNT =================================
export const editUserDetails = async (
	updatedData: Partial<UserDetails>,
	token: string
) => {
	try {
		const response = await fetch(`http://${ip}:5183/api/UserAccount/edit`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(updatedData),
		});

		if (!response.ok) {
			const errorData = await response.json();
			console.log("Update failed:", errorData);
			throw new Error("Failed to update user");
		}

		const data: UserDetails = await response.json();
		console.log("Updated user data:", data);
		return data;
	} catch (error) {
		console.error("There was an error editing the user details: ", error);
		throw error;
	}
};

// http://localhost:5183/api/UserAccount/edit
//==================================================================================

// Users Profile
export const updateUserProfile = async (editUserModel: EditUserModel) => {
	const token = await AsyncStorage.getItem("token");

	if (!token) {
		throw new Error("No token found");
	}

	try {
		const response = await fetch(`http://${ip}:5183/api/UserAccount/edit`, {
			method: "PUT",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
			body: JSON.stringify(editUserModel),
		});

		if (response.ok) {
			const data = await response.json();
			console.log("User profile updated successfully: ", data);
			return data;
		} else {
			const errorText = await response.text();
			console.error("Error updating user profile: ", errorText);
			return null;
		}
	} catch (error: any) {
		console.error("Error updating user profile: ", error.message);
		return null;
	}
};
