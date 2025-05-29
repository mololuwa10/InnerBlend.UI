// components/Toolbar.tsx
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import { StyleSheet, TouchableOpacity, View } from "react-native";
import { DarkColors } from "../../constants/Colors";

export default function Toolbar({
	onTagPress,
	onLocationPress,
}: {
	onTagPress: () => void;
	onLocationPress: () => void;
}) {
	// const icons: (
	// 	| "image-outline"
	// 	// | "location-outline"
	// 	| "happy-outline"
	// 	| "person-outline"
	// )[] = [
	// 	"image-outline",
	// 	// "location-outline",
	// 	"happy-outline",
	// 	"person-outline",
	// ];

	return (
		<View style={styles.toolbar}>
			{/* {icons.map((icon, idx) => (
				<TouchableOpacity key={idx}>
					<Ionicons
						name={icon}
						color={DarkColors.highlight}
						size={24}
						style={styles.icon}
					/>
				</TouchableOpacity>
			))} */}
			<TouchableOpacity onPress={() => console.log("Image")}>
				<Ionicons name="image-outline" size={24} color={DarkColors.highlight} />
			</TouchableOpacity>

			<TouchableOpacity onPress={onLocationPress}>
				<Ionicons
					name="location-outline"
					size={24}
					color={DarkColors.highlight}
				/>
			</TouchableOpacity>

			<TouchableOpacity onPress={() => console.log("Mood")}>
				<Ionicons name="happy-outline" size={24} color={DarkColors.highlight} />
			</TouchableOpacity>

			<TouchableOpacity onPress={() => console.log("Profile")}>
				<Ionicons
					name="person-outline"
					size={24}
					color={DarkColors.highlight}
				/>
			</TouchableOpacity>

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
		paddingVertical: 20,
		paddingTop: 10,
		backgroundColor: "#1b1b1f",
		borderTopWidth: 1,
		borderTopColor: "#2A2A33",
		gap: 40,
	},
	icon: {
		marginHorizontal: 6,
		marginVertical: 6,
	},
});
