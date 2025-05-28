/* eslint-disable import/no-unresolved */
import DateModal from "@/components/JournalViewComponents/DateModal";
import TagModal from "@/components/JournalViewComponents/TagModal";
import Toolbar from "@/components/JournalViewComponents/Toolbar";
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
	const [showTagsModal, setShowTagsModal] = useState(false);
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState("");
	const [showDateModal, setShowDateModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());

	const formattedDate = selectedDate
		.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		})
		.toUpperCase();

	const handleSave = () => {
		// TODO: Save the entry to the database
		router.back();
	};

	return (
		<>
			<TagModal
				visible={showTagsModal}
				onClose={() => setShowTagsModal(false)}
				tags={tags}
				setTags={setTags}
				tagInput={tagInput}
				setTagInput={setTagInput}
			/>

			<DateModal
				visible={showDateModal}
				date={selectedDate}
				onConfirm={(date: Date) => setSelectedDate(date)}
				onClose={() => setShowDateModal(false)}
			/>

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
						style={styles.dateRow}
						onPress={() => setShowDateModal(true)}
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

				<Toolbar onTagPress={() => setShowTagsModal(true)} />
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
	dateRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "center",
		gap: 4,
	},
	date: {
		color: DarkColors.highlight,
		fontFamily: "ComicNeue-Bold",
		fontSize: 16,
	},
	body: {
		flex: 1,
	},
	input: {
		flex: 1,
		backgroundColor: "#000",
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		fontSize: 18,
		borderRadius: 10,
		padding: 16,
	},
});
