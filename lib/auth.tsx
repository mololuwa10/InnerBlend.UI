"use client";

// import { useRouter } from "next/navigation";
// import { useNavigation } from "@react-navigation/native";
import React, { useState, useEffect, useCallback } from "react";
import { StackNavigationProp } from "@react-navigation/stack";
import AsyncStorage from "@react-native-async-storage/async-storage";
import axios from "axios";
// import { NetworkInfo } from "react-native-network-info";
import { Alert } from "react-native";
// import getLocalHost from "react-native-localhost";
// import * as Network from "expo-network";
import Constants from "expo-constants";

type RootStackParamList = {
	Login: undefined;
};

type AuthNavigationProp = StackNavigationProp<RootStackParamList, "Login">;

export interface UserDetails {
	id: string;
	firstName: string;
	lastName: string;
	userName: string;
	email: string;
	dateCreated: string;
	toDoItems: any[] | null;
	phoneNumber: string;
	phoneNumberConfirmed: boolean;
	twoFactorEnabled: boolean;
	lockoutEnabled: boolean;
	lockoutEnd: string | null;
	accessFailedCount: number;
	concurrencyStamp: string;
	securityStamp: string;
	emailConfirmed: boolean;
}

axios.interceptors.request.use(
	(request) => {
		console.log("Starting Request", request);
		return request;
	},
	(error) => {
		console.log("Request Error", error);
		return Promise.reject(error);
	}
);

axios.interceptors.response.use(
	(response) => {
		console.log("Response:", response);
		return response;
	},
	(error) => {
		console.log("Response Error", error);
		return Promise.reject(error);
	}
);

// export const getApiBaseUrl = async () => {
// 	const ip = await getLocalIpAddress();
// 	const port = "5133";
// 	return `http://${ip}:${port}/api`;
// };
// const ip = NetworkInfo.getIPV4Address();
// console.log(ip);

// const ip = getLocalIpAddress();
// const ip = Network.getIpAddressAsync();
// console.log(ip);

const ip =
	Constants.expoConfig?.extra?.apiHost ||
	Constants.manifest2?.extra?.apiHost ||
	"localhost";

export const registerUser = async (userData: any) => {
	console.log("IP Address being used in registerUser:", ip);
	try {
		const response = await fetch(`http://${ip}:5183/api/Account/register`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
			},
			body: JSON.stringify(userData),
		});

		if (response.ok) {
			const data = await response.json();
			await AsyncStorage.setItem("token", data.token);
			return data;
		} else {
			let errorMessage = `Error during registration: ${response.status}`;
			if (response.headers.get("Content-Type")?.includes("application/json")) {
				const errorData = await response.json();
				if (Array.isArray(errorData.messages)) {
					errorMessage = errorData.messages.join(" ");
				} else {
					errorMessage = errorData.message || errorMessage;
				}
			}
			throw new Error(errorMessage);
		}
	} catch (error) {
		console.error("There was an error registering the user: ", error);
		throw error;
	}
};

export const useLogin = () => {
	const [error, setError] = useState<string | null>(null);

	const login = async (usernameOrEmail: string, password: string) => {
		try {
			console.log("IP Address being used in login:", ip);

			console.log("Sending data:", { usernameOrEmail, password });
			// const ip = getLocalHost;
			console.log("ip", ip);

			const response = await fetch(`http://${ip}:5183/api/Account/login`, {
				method: "POST",
				headers: {
					"Content-Type": "application/json",
				},
				body: JSON.stringify({
					usernameOrEmail,
					password,
				}),
			});

			console.log("Response status:", response.status);
			console.log("Response headers:", response.headers);

			if (!response.ok) {
				throw new Error(`HTTP error! status: ${response.status}`);
			}

			const data = await response.json();
			console.log("Response data:", data);
			await AsyncStorage.setItem("token", data.token);

			// Mark the user as not new
			await AsyncStorage.setItem("isNewUser", "false");

			setError(null);
			return data;
		} catch (err) {
			setError("Login failed. Please check your credentials and try again.");
			console.error("Login error:", err);
			throw err;
		}
	};

	return { login, error };
};

export const fetchUserDetails = async (): Promise<UserDetails | null> => {
	try {
		const token = await AsyncStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		const response = await fetch(`http://${ip}:5183/api/Account/details`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		if (response.ok) {
			const responseText = await response.text();

			// Check if responseText is empty
			if (!responseText) {
				throw new Error("Empty response from server");
			}

			const data = JSON.parse(responseText);
			console.log(data);
			return data;
		} else {
			const contentType = response.headers.get("content-type");
			const errorText = await response.text();

			if (contentType && contentType.includes("application/json")) {
				const errorData = JSON.parse(errorText);
				throw new Error(errorData.message || "Failed to fetch user details");
			} else {
				throw new Error(errorText || "Failed to fetch user details");
			}
		}
	} catch (error: any) {
		console.error("There was an error fetching user details: ", error.message);
		return null;
	}
};

export const useLogout = () => {
	// const navigation = useNavigation<AuthNavigationProp>(); // Valid hook call at the top

	const logout = async () => {
		// Async function inside the hook
		const token = await AsyncStorage.getItem("token");

		if (!token) {
			throw new Error("No token found");
		}

		try {
			const response = await fetch(`http://${ip}:5183/api/account/logout`, {
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			});

			if (response.ok) {
				// Handle successful logout
				Alert.alert("Logout", "Logout successful!");
				await AsyncStorage.removeItem("token");
			} else {
				// Handle failed logout
				Alert.alert("Error", "Logout failed. Please try again.");
			}
		} catch (error: any) {
			console.error("There was an error logging out: ", error.message);
			Alert.alert("Error", "An error occurred during logout.");
		}
	};

	return { logout }; // Return the logout function from the hook
};
