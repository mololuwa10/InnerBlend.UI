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

export interface UpdateJournalInput {
	journalTitle: string;
	journalDescription: string;
}

export interface UpdateJournalEntryInput {
	title: string;
	content: string;
	mood?: "VerySad" | "Sad" | "Neutral" | "Happy" | "VeryHappy";
	location?: string;
	tags?: string[];
}

export interface MoveJournalEntry {
	entryId: string | number;
	journalId: string | number;
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

// JOURNAL ======================================================================
// Update Journal // PUT: api/journal/:journalId
export const updateJournal = async (
	journalId: string,
	update: UpdateJournalInput
): Promise<boolean | null> => {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) throw new Error("No token found");

		const response = await fetch(`http://${ip}:5183/api/journal/${journalId}`, {
			method: "PUT",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(update),
		});

		if (!response.ok) {
			const errorMsg = await response.text();
			console.error("Failed to update journal:", errorMsg);
			return false;
		}

		const data = await response.json();
		return data;
	} catch (error: any) {
		console.error("There was an error updating journal: ", error);
		return null;
	}
};
// ===============================================================================

// JOURNAL ENTRY  ================================================================
// PUT: Update a journal entry by ID
export const updateJournalEntry = async (
	entryId: string,
	update: UpdateJournalEntryInput
): Promise<boolean | null> => {
	try {
		const token = AsyncStorage.getItem("token");
		if (!token) throw new Error("No token found");

		const response = await fetch(
			`http://${ip}:5183/api/journalentry/${entryId}`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(update),
			}
		);

		if (!response.ok) {
			const errorMsg = await response.text();
			console.error("Failed to update journal entry:", errorMsg);
			return false;
		}

		const data = await response.json();
		return data;
	} catch (error: any) {
		console.error("There was an error updating journal entry: ", error);
		return null;
	}
};

// MOVE JOURNAL ENTRY
export const moveJournalEntry = async (
	entryId: string,
	journalId: string
): Promise<boolean | null> => {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) throw new Error("No token found");

		const payload: MoveJournalEntry = {
			entryId,
			journalId,
		};

		const response = await fetch(
			`http://${ip}:5183/api/journalentry/move-entry`,
			{
				method: "PUT",
				headers: {
					"Content-Type": "application/json",
					Authorization: `Bearer ${token}`,
				},
				body: JSON.stringify(payload),
			}
		);

		if (!response.ok) {
			const errorMsg = await response.text();
			console.error("Failed to move journal entry:", errorMsg);
			return false;
		}

		const result = await response.text();
		console.log(result);
		return true;
	} catch (error: any) {
		console.error("There was an error moving journal entry: ", error);
		return null;
	}
};
