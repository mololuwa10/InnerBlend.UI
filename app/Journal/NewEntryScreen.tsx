/* eslint-disable import/no-unresolved */
import { DarkColors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

export default function NewEntryScreen() {
	const router = useRouter();
	const [entry, setEntry] = useState("");
	const [date] = useState(new Date());

	const formattedDate = date
		.toLocaleDateString("en-US", {
			year: "numeric",
			month: "long",
			day: "2-digit",
		})
		.toUpperCase();

	const handleSave = () => {
		// TODO: Save the entry to the database
		router.back();
	};

	return (
		<>
			<KeyboardAvoidingView
				style={styles.wrapper}
				behavior={Platform.OS === "ios" ? "padding" : undefined}
			>
				<View style={styles.header}>
					<TouchableOpacity onPress={handleSave}>
						<Ionicons
							name="checkmark"
							color={DarkColors.textPrimary}
							size={24}
						/>
					</TouchableOpacity>

					<TouchableOpacity
						style={{
							flexDirection: "row",
							alignItems: "center",
							justifyContent: "center",
							gap: 4,
						}}
					>
						<Text style={styles.date}>{formattedDate}</Text>
						<Ionicons
							name="chevron-down"
							size={18}
							color={DarkColors.highlight}
						/>
					</TouchableOpacity>
				</View>

				<View style={styles.body}>
					<TextInput
						style={styles.input}
						value={entry}
						onChangeText={setEntry}
						placeholder="Start journaling..."
						placeholderTextColor={DarkColors.highlight}
						multiline
						textAlignVertical="top"
					/>
				</View>

				{/* Bottom Action Bar */}
				<View style={styles.toolbar}>
					{["image", "location", "happy", "person", "pricetag"].map(
						(icon, idx) => (
							<TouchableOpacity key={idx}>
								<Ionicons
									name={`${icon}-outline`}
									color={DarkColors.highlight}
									size={24}
									style={{
										marginHorizontal: 6,
										marginBottom: 6,
										fontWeight: "900",
									}}
								/>
							</TouchableOpacity>
						)
					)}
				</View>
			</KeyboardAvoidingView>
		</>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: DarkColors.background,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		paddingHorizontal: 20,
		paddingTop: Platform.OS === "ios" ? 50 : 40,
		paddingBottom: 15,
	},
	date: {
		color: DarkColors.highlight,
		fontFamily: "ComicNeue-Bold",
		fontSize: 16,
	},
	placeholder: {
		color: DarkColors.textPrimary,
		marginBottom: 15,
		fontFamily: "ComicNeue-Regular",
	},
	template: {
		color: DarkColors.highlight,
		fontFamily: "ComicNeue-Bold",
	},
	body: {
		flex: 1,
	},
	input: {
		flex: 1,
		backgroundColor: "#000",
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		fontSize: 16,
		borderRadius: 10,
		padding: 16,
	},
	toolbar: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 10,
		paddingVertical: 20,
		paddingBottom: 20,
		backgroundColor: "#1b1b1f",
		borderTopWidth: 1,
		borderTopColor: "#2A2A33",
	},
});
