import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
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
import Toast from "react-native-toast-message";
import DateModal from "../../components/Modals/DateModal";
import LocationModal from "../../components/Modals/LocationModal";
import MoodModal from "../../components/Modals/MoodModal";
import TagModal from "../../components/Modals/TagModal";
import Toolbar from "../../components/Modals/Toolbar";
import { DarkColors } from "../../constants/Colors";
import { createJournalEntry } from "../../lib/apiPostActions";

export default function NewEntryScreen() {
	const router = useRouter();
	const [entry, setEntry] = useState("");
	const [showTagsModal, setShowTagsModal] = useState(false);
	const [tags, setTags] = useState<string[]>([]);
	const [pickedFiles, setPickedFiles] = useState<any[]>([]);
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

	const handlePickImage = async () => {
		const { status } = await ImagePicker.requestMediaLibraryPermissionsAsync();

		if (status !== "granted") {
			Toast.show({
				type: "error",
				text1: "Permission Denied",
				text2: "We need access to your photos to add images.",
			});
			return;
		}

		const result = await ImagePicker.launchImageLibraryAsync({
			mediaTypes: ImagePicker.MediaTypeOptions.All,
			allowsEditing: true,
			// aspect: [4, 3],
			quality: 1,
		});

		if (!result.canceled && result.assets && result.assets.length > 0) {
			setPickedFiles((prevFiles) => [...prevFiles, result.assets[0].uri]);
		} else {
			Toast.show({
				type: "error",
				text1: "Error",
				text2: "Failed to pick image.",
			});
		}
	};

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

		// const files = pickedFiles;

		const success = await createJournalEntry(
			journalId,
			{
				Title: title,
				Content: entry,
				Tags: tags,
				Mood: mood || null,
				Location: location || null,
			},
			pickedFiles
		);

		if (success) {
			Toast.show({ type: "success", text1: "Journal entry saved!" });
			router.back();
		} else {
			Toast.show({
				type: "error",
				text1: "Error",
				text2:
					"Failed to save journal entry.\n\nEnsure Title and content are not empty.",
			});
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
					onImagePress={handlePickImage}
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
