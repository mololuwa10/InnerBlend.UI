/* eslint-disable import/no-unresolved */
import { DarkColors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import DateTimePicker from "@react-native-community/datetimepicker";
import { useRouter } from "expo-router";
import React, { useState } from "react";
import {
	KeyboardAvoidingView,
	Modal,
	Platform,
	Pressable,
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
	const [showTagsModal, setShowTagsModal] = useState(false);
	const [tags, setTags] = useState<string[]>([]);
	const [tagInput, setTagInput] = useState("");
	const [showDateModal, setShowDateModal] = useState(false);
	const [selectedDate, setSelectedDate] = useState(new Date());

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
			<Modal
				visible={showTagsModal}
				animationType="fade"
				transparent
				onRequestClose={() => setShowTagsModal(false)}
			>
				<Pressable
					style={modalStyles.modalOverlay}
					onPress={() => setShowTagsModal(false)}
				>
					<Pressable
						style={modalStyles.modalCard}
						onPress={(e) => e.stopPropagation()}
					>
						<Text style={modalStyles.modalTitle}>Tags</Text>

						<View style={modalStyles.modalInputRow}>
							<TextInput
								style={modalStyles.modalInput}
								placeholder="Enter a tag"
								placeholderTextColor={DarkColors.accent}
								value={tagInput}
								onChangeText={setTagInput}
							/>
							<TouchableOpacity
								onPress={() => {
									if (tagInput.trim()) {
										setTags([...tags, tagInput.trim()]);
										setTagInput("");
									}
								}}
							>
								<Ionicons name="add" size={22} color={DarkColors.highlight} />
							</TouchableOpacity>
						</View>

						<View style={modalStyles.tagList}>
							{tags.length === 0 ? (
								<Text style={modalStyles.noTagsText}>No Tags Found</Text>
							) : (
								tags.map((tag, idx) => (
									<Text key={idx} style={modalStyles.tagItem}>
										• {tag}
									</Text>
								))
							)}
						</View>

						<View style={modalStyles.modalFooter}>
							<TouchableOpacity onPress={() => setShowTagsModal(false)}>
								<Text style={modalStyles.cancel}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setShowTagsModal(false)}>
								<Text style={modalStyles.ok}>OK</Text>
							</TouchableOpacity>
						</View>
					</Pressable>
				</Pressable>
			</Modal>

			<Modal
				visible={showDateModal}
				animationType="fade"
				transparent
				onRequestClose={() => setShowDateModal(false)}
			>
				<Pressable
					style={modalStyles.modalOverlay}
					onPress={() => setShowDateModal(false)}
				>
					<Pressable
						style={modalStyles.modalCard}
						onPress={(e) => e.stopPropagation()}
					>
						<Text style={modalStyles.modalTitle}>Select Date</Text>

						<View style={{ alignItems: "center", marginVertical: 10 }}>
							<Text style={modalStyles.dateLabel}>
								{selectedDate.toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								})}
							</Text>
						</View>

						<View style={{ alignItems: "center" }}>
							<DateTimePicker
								value={selectedDate}
								mode="date"
								display="calendar"
								onChange={(event, date) => {
									if (event.type === "set" && date) {
										setSelectedDate(date);
										setShowDateModal(false);
									} else if (event.type === "dismissed") {
										setShowDateModal(false);
									}
								}}
							/>
						</View>

						<View style={modalStyles.modalFooter}>
							<TouchableOpacity onPress={() => setShowDateModal(false)}>
								<Text style={modalStyles.cancel}>Cancel</Text>
							</TouchableOpacity>
							<TouchableOpacity onPress={() => setShowDateModal(false)}>
								<Text style={modalStyles.ok}>OK</Text>
							</TouchableOpacity>
						</View>
					</Pressable>
				</Pressable>
			</Modal>

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
						onPress={() => setShowDateModal(true)}
					>
						{/* <Text style={styles.date}>{formattedDate}</Text> */}
						<Text style={styles.date}>
							{selectedDate
								.toLocaleDateString("en-GB", {
									day: "2-digit",
									month: "long",
									year: "numeric",
								})
								.toUpperCase()}
						</Text>
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
				{/* <View style={styles.toolbar}>
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
				</View> */}

				<View style={styles.toolbar}>
					{["image", "location", "happy", "person"].map((icon, idx) => (
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
					))}

					{/* Pricetag with modal trigger */}
					<TouchableOpacity onPress={() => setShowTagsModal(true)}>
						<Ionicons
							name="pricetag-outline"
							color={DarkColors.highlight}
							size={24}
							style={{
								marginHorizontal: 6,
								marginBottom: 6,
								fontWeight: "900",
							}}
						/>
					</TouchableOpacity>
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
		fontSize: 18,
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

const modalStyles = StyleSheet.create({
	modalOverlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.6)",
	},
	modalCard: {
		width: "85%",
		backgroundColor: "#2A2A33",
		padding: 20,
		borderRadius: 20,
	},
	modalTitle: {
		fontSize: 18,
		fontFamily: "ComicNeue-Bold",
		color: DarkColors.textPrimary,
		marginBottom: 10,
	},
	modalInputRow: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: DarkColors.accent,
		paddingBottom: 6,
		marginBottom: 12,
	},
	modalInput: {
		flex: 1,
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
	},
	tagList: {
		minHeight: 50,
		marginBottom: 15,
	},
	noTagsText: {
		color: DarkColors.accent,
		fontFamily: "ComicNeue-Regular",
	},
	tagItem: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		marginVertical: 2,
	},
	modalFooter: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	cancel: {
		color: DarkColors.highlight,
		fontFamily: "ComicNeue-Bold",
	},
	ok: {
		color: DarkColors.highlight,
		fontFamily: "ComicNeue-Bold",
	},
	dateLabel: {
		fontSize: 18,
		fontFamily: "ComicNeue-Bold",
		color: DarkColors.textPrimary,
		marginBottom: 10,
	},
});
