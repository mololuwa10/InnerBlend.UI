import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";
import Toast from "react-native-toast-message";

const ip =
	Constants.expoConfig?.extra?.apiHost ||
	Constants.manifest2?.extra?.apiHost ||
	"localhost";

// USER DELETE OPERATIONS
export const deleteUser = async () => {
	const token = await AsyncStorage.getItem("token");

	if (!token) {
		throw new Error("No token found");
	}

	try {
		const response = await fetch(`http://${ip}:5183/api/UserAccount/delete`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			Toast.show({
				type: "success",
				text1: "Delete Successful",
				text2: "Your profile has been deleted successfully.",
			});
		} else {
			const errorMessage = `Failed to delete user: ${response.statusText}`;
			Toast.show({
				type: "error",
				text1: "Delete Failed",
				text2: errorMessage,
			});
			throw new Error(errorMessage);
		}
	} catch (error: any) {
		console.error("Error deleting user:", error.message);
		throw new Error("Failed to delete the user. Please try again.");
	}
};

// JOURNAL ENTRIES ================================================================
// DELETE JOURNAL ENTRY
export const deleteJournalEntry = async (
	entryId: string | number
): Promise<boolean | null> => {
	const token = await AsyncStorage.getItem("token");
	if (!token) {
		throw new Error("No token found");
	}

	try {
		const response = await fetch(
			`http://${ip}:5183/api/journalentry/${entryId}`,
			{
				method: "DELETE",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (response.ok) {
			Toast.show({
				type: "success",
				text1: "Entry Deleted",
				text2: "Your journal entry was successfully removed.",
			});
			return true;
		} else {
			const errorText = await response.text();
			Toast.show({
				type: "error",
				text1: "Delete Failed",
				text2: errorText || "Something went wrong.",
			});
			return false;
		}
	} catch (error: any) {
		console.error("Error deleting journal entry:", error.message);
		Toast.show({
			type: "error",
			text1: "Network Error",
			text2: "Failed to delete journal entry. Please try again.",
		});
		return false;
	}
};
// ==========================================================================

// JOURNAL ====================================================================
export const deleteJournal = async (
	journalId: string
): Promise<boolean | null> => {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) {
			throw new Error("No token found");
		}

		const response = await fetch(`http://${ip}:5183/api/journal/${journalId}`, {
			method: "DELETE",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const errorText = await response.text();
			console.error("Failed to delete journal:", errorText);
			Toast.show({
				type: "error",
				text1: "Delete Failed",
				text2: "Could not delete journal. Try again.",
			});
			return false;
		}

		Toast.show({
			type: "success",
			text1: "Deleted",
			text2: "Journal has been successfully deleted.",
		});

		return true;
	} catch (error: any) {
		console.error("There was an error deleting journal: ", error);
		return null;
	}
};
