import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import { Alert, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import MapView, { MapPressEvent, Marker, Region } from "react-native-maps";

export default function LocationPickerScreen() {
	const router = useRouter();
	const [selectedLocation, setSelectedLocation] = useState<{
		latitude: number;
		longitude: number;
	} | null>(null);
	const [initialRegion, setInitialRegion] = useState<Region | null>(null);
	const [selectedAddress, setSelectedAddress] = useState<string | null>(null);

	useEffect(() => {
		(async () => {
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				Alert.alert("Permission denied", "Location access is required.");
				return;
			}

			const location = await Location.getCurrentPositionAsync({});
			setInitialRegion({
				latitude: location.coords.latitude,
				longitude: location.coords.longitude,
				latitudeDelta: 0.01,
				longitudeDelta: 0.01,
			});
		})();
	}, []);

	const handleMapPress = async (event: MapPressEvent) => {
		const coords = event.nativeEvent.coordinate;
		setSelectedLocation(coords);

		try {
			const addressInfo = await Location.reverseGeocodeAsync(coords);

			if (addressInfo && addressInfo.length > 0) {
				const address = addressInfo[0];
				const formatted = `${address.name ?? ""} ${address.street ?? ""}, ${
					address.city ?? ""
				} ${address.postalCode ?? ""}, ${address.country ?? ""}`;
				setSelectedAddress(formatted.trim());
			} else {
				setSelectedAddress("Unknown Location");
			}
		} catch (error) {
			console.error("Reverse geocoding failed:", error);
			setSelectedAddress("Failed to fetch address");
		}
	};

	const handleConfirm = () => {
		if (!selectedLocation || !selectedAddress) {
			Alert.alert(
				"No location selected",
				"Tap on the map to choose a location."
			);
			return;
		}

		router.replace({
			pathname: "/Journal/NewEntryScreen",
			params: { location: selectedAddress },
		});
	};
	return (
		<>
			<View style={styles.container}>
				{initialRegion && (
					<MapView
						style={StyleSheet.absoluteFill}
						initialRegion={initialRegion}
						onPress={handleMapPress}
					>
						{selectedLocation && <Marker coordinate={selectedLocation} />}
					</MapView>
				)}

				<View style={styles.buttonRow}>
					<TouchableOpacity
						style={styles.cancelButton}
						onPress={() => router.replace("/Journal/NewEntryScreen")}
					>
						<Ionicons name="close" size={20} color="white" />
						<Text style={styles.buttonText}>Cancel</Text>
					</TouchableOpacity>
					<TouchableOpacity
						style={styles.confirmButton}
						onPress={handleConfirm}
					>
						<Ionicons name="checkmark" size={20} color="white" />
						<Text style={styles.buttonText}>Confirm</Text>
					</TouchableOpacity>
				</View>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
	},
	buttonRow: {
		position: "absolute",
		bottom: 40,
		left: 0,
		right: 0,
		flexDirection: "row",
		justifyContent: "space-around",
	},
	cancelButton: {
		backgroundColor: "#555",
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 8,
		flexDirection: "row",
		alignItems: "center",
	},
	confirmButton: {
		backgroundColor: "#4CAF50",
		paddingHorizontal: 20,
		paddingVertical: 12,
		borderRadius: 8,
		flexDirection: "row",
		alignItems: "center",
	},
	buttonText: {
		color: "white",
		marginLeft: 6,
		fontSize: 16,
	},
});
