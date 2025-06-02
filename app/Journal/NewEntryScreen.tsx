import MoodModal from "@/components/Modals/MoodModal";
import { createJournalEntry } from "@/lib/apiPostActions";
import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useState } from "react";
import {
	KeyboardAvoidingView,
	Platform,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import DateModal from "../../components/Modals/DateModal";
import LocationModal from "../../components/Modals/LocationModal";
import TagModal from "../../components/Modals/TagModal";
import Toolbar from "../../components/Modals/Toolbar";
import { DarkColors } from "../../constants/Colors";

export default function NewEntryScreen() {
	const router = useRouter();
	const [entry, setEntry] = useState("");
	const [showTagsModal, setShowTagsModal] = useState(false);
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState("");
	const [showDateModal, setShowDateModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showLocationModal, setShowLocationModal] = useState(false);
	const [location, setLocation] = useState("");
	const [showMoodModal, setShowMoodModal] = useState(false);
	const [mood, setMood] = useState("");
	const [title, setTitle] = useState("");
	const params = useLocalSearchParams();

	const formattedDate = selectedDate
		.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		})
		.toUpperCase();

	const handleSave = async () => {
		// TODO: Save the entry to the database
		const journalId = params?.journalId as string;
		if (!journalId) {
			console.error("Missing Journal Id");
			alert("An unexpected error occurred. Please try again.");
			return;
		}

		if (!entry.trim()) {
			alert("Please enter a journal entry.");
			return;
		}

		const success = await createJournalEntry(journalId, {
			// Title: `Entry on ${formattedDate}`,
			Title: title,
			Content: entry,
			Tags: tags,
			Mood: mood || null,
			Location: location || null,
		});

		if (success) {
			alert("Journal entry saved!");
			router.back();
		} else {
			alert("Failed to save journal entry.");
		}
	};

	useEffect(() => {
		if (params.location) {
			setLocation(params.location as string);
		}
	}, [params?.location]);

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

			<LocationModal
				visible={showLocationModal}
				onClose={() => setShowLocationModal(false)}
				onLocationSet={(loc) => setLocation(loc)}
				currentLocation={location}
			/>

			<MoodModal
				visible={showMoodModal}
				onClose={() => setShowMoodModal(false)}
				onSelectMood={setMood}
				currentMood={mood}
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
					{mood ? (
						<Text
							style={{ color: "#ccc", marginBottom: 5, paddingHorizontal: 20 }}
						>
							Mood: {mood}
						</Text>
					) : null}
					{location ? (
						<Text
							style={{ color: "#ccc", marginBottom: 5, paddingHorizontal: 20 }}
						>
							Location: {location}
						</Text>
					) : null}

					<TextInput
						// style={styles.titleInput}
						style={{ color: "#ccc", marginBottom: 5, paddingHorizontal: 20 }}
						value={title}
						onChangeText={setTitle}
						placeholder="Title..."
						placeholderTextColor={DarkColors.highlight}
					/>

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

				<Toolbar
					onTagPress={() => setShowTagsModal(true)}
					onLocationPress={() => setShowLocationModal(true)}
					onMoodPress={() => setShowMoodModal(true)}
				/>
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
