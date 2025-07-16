import { Ionicons } from "@expo/vector-icons";
import * as ImagePicker from "expo-image-picker";
import { useLocalSearchParams, useRouter } from "expo-router";
import { Trash2 } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
	Image,
	KeyboardAvoidingView,
	Platform,
	ScrollView,
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
	const [pickedFiles, setPickedFiles] = useState<
		ImagePicker.ImagePickerAsset[]
	>([]);
	const [tagInput, setTagInput] = useState("");
	const [showDateModal, setShowDateModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());
	const [showLocationModal, setShowLocationModal] = useState(false);
	const [location, setLocation] = useState("");
	const [showMoodModal, setShowMoodModal] = useState(false);
	const [mood, setMood] = useState("");
	const [title, setTitle] = useState("");
	const [selectedPreview, setSelectedPreview] = useState<string | null>(null);
	const [isSubmitting, setIsSubmitting] = useState(false);
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
			setPickedFiles((prevFiles) => [...prevFiles, result.assets[0]]);
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
		if (isSubmitting) {
			return;
		}
		setIsSubmitting(true);

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
		const filesToUpload = pickedFiles.map((file) => ({
			uri: file.uri,
			fileName: file.fileName ?? `image-${Date.now()}.jpg`,
			type: file.type ?? "image/jpeg",
		}));

		const success = await createJournalEntry(
			journalId,
			{
				Title: title,
				Content: entry,
				Tags: tags,
				Mood: mood || null,
				Location: location || null,
			},
			filesToUpload
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
		setIsSubmitting(false);
	};

	const handleRemoveImage = (index: number) => {
		setPickedFiles((prev) => prev.filter((_, i) => i !== index));
	};

	useEffect(() => {
		if (params.location && typeof params.location === "string") {
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
					<TouchableOpacity
						onPress={handleSave}
						disabled={!entry.trim() || !title.trim()}
					>
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
					{mood ? <Text style={styles.metaText}>Mood: {mood}</Text> : null}
					{location ? (
						<Text style={styles.metaText}>Location: {location}</Text>
					) : null}

					<TextInput
						// style={styles.titleInput}
						style={styles.metaText}
						value={title}
						onChangeText={setTitle}
						placeholder="Title..."
						placeholderTextColor={DarkColors.highlight}
					/>

					<TextInput
						style={[
							styles.input,
							pickedFiles.length === 0 && styles.textInputExpanded,
						]}
						value={entry}
						onChangeText={setEntry}
						placeholder="Start journaling..."
						placeholderTextColor={DarkColors.highlight}
						multiline
						textAlignVertical="top"
					/>

					<View
						style={{
							borderBottomColor: "#444",
							borderBottomWidth: 1,
							marginBottom: 5,
						}}
					/>

					{pickedFiles.length > 0 && (
						<ScrollView
							horizontal
							showsHorizontalScrollIndicator={false}
							style={styles.imagePreviewContainer}
						>
							{pickedFiles.map((file, index) => (
								<View key={index} style={styles.imageWrapper}>
									<TouchableOpacity
										style={styles.deleteButton}
										onPress={() => handleRemoveImage(index)}
									>
										<Trash2 size={20} color={DarkColors.textPrimary} />
									</TouchableOpacity>

									<TouchableOpacity
										onPress={() => setSelectedPreview(file.uri)}
									>
										<Image
											source={{ uri: file.uri }}
											style={styles.imagePreview}
										/>
									</TouchableOpacity>
								</View>
							))}
						</ScrollView>
					)}
				</View>

				<Toolbar
					onTagPress={() => setShowTagsModal(true)}
					onLocationPress={() => setShowLocationModal(true)}
					onMoodPress={() => setShowMoodModal(true)}
					onImagePress={handlePickImage}
				/>
			</KeyboardAvoidingView>

			{selectedPreview && (
				<TouchableOpacity
					style={styles.fullscreenContainer}
					onPress={() => setSelectedPreview(null)}
					activeOpacity={1}
				>
					<Image
						source={{ uri: selectedPreview }}
						style={styles.fullscreenImage}
						resizeMode="contain"
					/>
				</TouchableOpacity>
			)}
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
	textInputExpanded: {
		flex: 1,
	},
	imagePreviewContainer: {
		paddingHorizontal: 10,
		paddingVertical: 10,
		maxHeight: 100,
	},

	imagePreview: {
		width: 80,
		height: 80,
		borderRadius: 10,
		marginRight: 10,
	},
	fullscreenContainer: {
		position: "absolute",
		top: 0,
		left: 0,
		right: 0,
		bottom: 0,
		backgroundColor: "rgba(0,0,0,0.9)",
		justifyContent: "center",
		alignItems: "center",
		zIndex: 99,
	},
	fullscreenImage: {
		width: "100%",
		height: "100%",
	},
	imageWrapper: {
		position: "relative",
		marginRight: 10,
	},

	deleteButton: {
		position: "absolute",
		top: -5,
		right: -5,
		zIndex: 1,
		backgroundColor: "#ff5555",
		borderRadius: 12,
		width: 30,
		height: 30,
		justifyContent: "center",
		alignItems: "center",
		elevation: 3,
	},

	deleteButtonText: {
		color: "#fff",
		fontSize: 14,
		fontWeight: "bold",
	},
	metaText: { color: "#ccc", marginBottom: 5, paddingHorizontal: 20 },
});
