import { Ionicons } from "@expo/vector-icons";
import * as Location from "expo-location";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { DarkColors } from "../../constants/Colors";

interface Props {
	visible: boolean;
	onClose: () => void;
	onLocationSet: (location: string) => void;
	currentLocation: string;
}

export default function LocationModal({
	visible,
	onClose,
	onLocationSet,
	currentLocation,
}: Props) {
	const [loading, setLoading] = useState(false);
	const router = useRouter();
	const getLocation = async () => {
		try {
			setLoading(true);
			const { status } = await Location.requestForegroundPermissionsAsync();
			if (status !== "granted") {
				alert("Permission to access location was denied");
				return;
			}

			const loc = await Location.getCurrentPositionAsync({});
			const address = await Location.reverseGeocodeAsync(loc.coords);

			const formatted = `${address[0]?.name ?? ""} ${
				address[0]?.street ?? ""
			}, ${address[0]?.city ?? ""} ${address[0]?.postalCode ?? ""}, ${
				address[0]?.country ?? ""
			}`;

			onLocationSet(formatted.trim());
			onClose();
		} catch (error) {
			console.error(error);
		} finally {
			setLoading(false);
		}
	};

	return (
		<>
			<Modal visible={visible} animationType="slide" transparent>
				<Pressable style={styles.overlay} onPress={onClose}>
					<Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
						<View style={styles.dragHandle} />

						<TouchableOpacity onPress={getLocation} disabled={loading}>
							<Text style={styles.locationText}>
								{loading
									? "Fetching current location..."
									: currentLocation || "Tap to set current location"}
							</Text>
						</TouchableOpacity>

						<View style={styles.optionRow}>
							<Ionicons
								name="location"
								size={24}
								color={DarkColors.textPrimary}
							/>
							<TouchableOpacity
								onPress={() => router.replace("/Journal/LocationPickerScreen")}
								disabled={loading}
							>
								<Text style={styles.option}>Pick a Place</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.optionRow}>
							<Ionicons
								name="pencil"
								color={DarkColors.textPrimary}
								size={24}
							/>
							<TouchableOpacity
								onPress={() => {
									onLocationSet("Custom Location");
									onClose();
								}}
							>
								<Text style={styles.option}>Rename</Text>
							</TouchableOpacity>
						</View>

						<View style={styles.optionRow}>
							<Ionicons name="close-circle" color={"red"} size={24} />
							<TouchableOpacity
								onPress={() => {
									onLocationSet("");
									onClose();
								}}
							>
								<Text style={[styles.option, { color: "red" }]}>
									Remove Location
								</Text>
							</TouchableOpacity>
						</View>
					</Pressable>
				</Pressable>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	card: {
		backgroundColor: "#1b1b1f",
		padding: 20,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	dragHandle: {
		alignSelf: "center",
		width: 40,
		height: 4,
		borderRadius: 2,
		backgroundColor: "#555",
		marginBottom: 10,
	},
	locationText: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Bold",
		marginBottom: 20,
		fontSize: 20,
	},
	optionRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 15,
		marginBottom: 16,
	},
	option: {
		fontSize: 18,
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
	},
});
