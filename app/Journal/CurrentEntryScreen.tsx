import { Ionicons } from "@expo/vector-icons";
import { useLocalSearchParams, useRouter } from "expo-router";
import React, { useEffect, useRef, useState } from "react";
import {
	ActivityIndicator,
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
import MoodModal from "../../components/Modals/MoodModal";
import TagModal from "../../components/Modals/TagModal";
import Toolbar from "../../components/Modals/Toolbar";
import { DarkColors } from "../../constants/Colors";
import {
	updateJournalEntry,
	UpdateJournalEntryInput,
} from "../../lib/apiPutActions";

export default function CurrentEntryScreen() {
	const router = useRouter();
	const [entry, setEntry] = useState<string>("");
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
	const [loading, setLoading] = useState(false);
	const [lastSaved, setLastSaved] = useState<Date | null>(null);
	const [entryId, setEntryId] = useState<string | number>();
	const params = useLocalSearchParams();

	const autoSaveTimeoutRef = useRef<NodeJS.Timeout | number | null>(null);

	const formattedDate = selectedDate
		.toLocaleDateString("en-GB", {
			day: "2-digit",
			month: "long",
			year: "numeric",
		})
		.toUpperCase();

	useEffect(() => {
		console.log("Received route params:", params);
	}, [params]);

	useEffect(() => {
		if (!params?.entries) return;

		try {
			const parsedEntry = JSON.parse(params.entries as string);

			setEntryId(parsedEntry.journalEntryId || "");
			setEntry(parsedEntry.content || "");
			setTitle(parsedEntry.title || "");
			setMood(parsedEntry.mood || "");
			setLocation(parsedEntry.location || "");
			setTags(parsedEntry.tags?.$values || []);
			setSelectedDate(new Date(parsedEntry.dateCreated));
		} catch (error) {
			console.error("Failed to parse journal entry:", error);
		}
	}, [params?.entries]);

	useEffect(() => {
		if (params.location) {
			setLocation(params.location as string);
		}
	}, [params?.location]);

	const handleUpdate = async () => {
		if (!entryId) {
			console.error("Missing Entry Id");
			alert("An unexpected error occurred. Please try again.");
			return;
		}

		if (!title.trim() || !entry.trim()) {
			alert("Please ensure both title and content are filled.");
			return;
		}

		// Validate or cast mood
		const validMoods = [
			"VerySad",
			"Sad",
			"Neutral",
			"Happy",
			"VeryHappy",
		] as const;
		const isValidMood = validMoods.includes(mood as any);

		setLoading(true);

		const updatePayload = {
			title,
			content: entry,
			mood: isValidMood ? (mood as UpdateJournalEntryInput["mood"]) : undefined,
			location: location || undefined,
			tags: tags.length > 0 ? tags : undefined,
		};

		try {
			const success = await updateJournalEntry(String(entryId), updatePayload);

			if (success) {
				alert("Journal entry updated successfully.");
				router.back();
			} else {
				alert("Failed to update journal entry. Try again.");
			}
		} catch (error) {
			console.error("Error updating entry:", error);
			alert("Something went wrong. Please try again.");
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (!entryId || !title || !entry) return;

		// Clear previous timeout if user is still typing
		if (autoSaveTimeoutRef.current) {
			clearTimeout(autoSaveTimeoutRef.current);
		}
		autoSaveTimeoutRef.current = setTimeout(async () => {
			try {
				const validMoods = [
					"VerySad",
					"Sad",
					"Neutral",
					"Happy",
					"VeryHappy",
				] as const;

				const isValidMood = validMoods.includes(mood as any);

				await updateJournalEntry(String(entryId), {
					title,
					content: entry,
					mood: isValidMood
						? (mood as UpdateJournalEntryInput["mood"])
						: undefined,
					location,
					tags,
				});

				console.log("Auto-saved at", new Date().toLocaleTimeString());
				setLastSaved(new Date());
			} catch (error) {
				console.error("Auto-save failed:", error);
			}
		}, 1000);

		// Clear timeout on unmount
		return () => {
			if (autoSaveTimeoutRef.current) {
				clearTimeout(autoSaveTimeoutRef.current);
			}
		};
	}, [title, entry, mood, location, tags, entryId]);

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
					<TouchableOpacity onPress={handleUpdate} disabled={loading}>
						{loading ? (
							<ActivityIndicator
								size={"large"}
								color={DarkColors.textPrimary}
							/>
						) : (
							<Ionicons
								name="checkmark"
								color={DarkColors.textPrimary}
								size={24}
							/>
						)}
					</TouchableOpacity>

					{lastSaved && (
						<Text
							style={{
								fontSize: 12,
								color: "#888",
								textAlign: "center",
								marginVertical: 8,
							}}
						>
							Last saved at {lastSaved.toLocaleTimeString()}
						</Text>
					)}

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
