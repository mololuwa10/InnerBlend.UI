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
		const response = await fetch(
			`http://${ip}:5133/api/UserAccount/delete-user`,
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
