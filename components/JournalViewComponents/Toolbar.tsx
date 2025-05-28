/* eslint-disable import/no-unresolved */
// components/Toolbar.tsx
import { DarkColors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";

export default function Toolbar({ onTagPress }: { onTagPress: () => void }) {
	const icons = ["image", "location", "happy", "person"];

	return (
		<View style={styles.toolbar}>
			{icons.map((icon, idx) => (
				<TouchableOpacity key={idx}>
					<Ionicons
						name={`${icon}-outline`}
						color={DarkColors.highlight}
						size={24}
						style={styles.icon}
					/>
				</TouchableOpacity>
			))}
			<TouchableOpacity onPress={onTagPress}>
				<Ionicons
					name="pricetag-outline"
					color={DarkColors.highlight}
					size={24}
					style={styles.icon}
				/>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	toolbar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		paddingVertical: 15,
		backgroundColor: "#1b1b1f",
		borderTopWidth: 1,
		borderTopColor: "#2A2A33",
		gap: 20,
	},
	icon: {
		marginHorizontal: 6,
		marginVertical: 6,
	},
});
