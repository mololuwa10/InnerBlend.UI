"use client";

import Constants from "expo-constants";
import { UserDetails } from "./auth";

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
