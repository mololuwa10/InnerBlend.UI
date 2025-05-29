import { DarkColors } from "../../constants/Colors";
import * as Location from "expo-location";
import React, { useState } from "react";
import { StyleSheet } from "react-native";

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

	return <></>;
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
		borderTopLeftRadius: 20,
		borderTopRightRadius: 20,
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
		fontSize: 16,
	},
	optionRow: {
		flexDirection: "row",
		alignItems: "center",
		gap: 10,
		marginBottom: 16,
	},
	option: {
		fontSize: 15,
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
	},
});
