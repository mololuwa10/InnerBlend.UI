/* eslint-disable import/no-unresolved */
// components/TagModal.tsx
import { DarkColors } from "@/constants/Colors";
import { Ionicons } from "@expo/vector-icons";
import React from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

interface TagModalProps {
	visible: boolean;
	onClose: () => void;
	tags: string[];
	setTags: React.Dispatch<React.SetStateAction<string[]>>;
	tagInput: string;
	setTagInput: React.Dispatch<React.SetStateAction<string>>;
}

export default function TagModal({
	visible,
	onClose,
	tags,
	setTags,
	tagInput,
	setTagInput,
}: TagModalProps) {
	const handleAddTag = () => {
		if (tagInput.trim()) {
			setTags([...tags, tagInput.trim()]);
			setTagInput("");
		}
	};

	return (
		<Modal
			visible={visible}
			animationType="fade"
			transparent
			onRequestClose={onClose}
		>
			<Pressable style={styles.overlay} onPress={onClose}>
				<Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
					<Text style={styles.title}>Tags</Text>

					<View style={styles.inputRow}>
						<TextInput
							style={styles.input}
							placeholder="Enter a tag"
							placeholderTextColor={DarkColors.accent}
							value={tagInput}
							onChangeText={setTagInput}
						/>
						<TouchableOpacity onPress={handleAddTag}>
							<Ionicons name="add" size={22} color={DarkColors.highlight} />
						</TouchableOpacity>
					</View>

					<View style={styles.tagList}>
						{tags.length === 0 ? (
							<Text style={styles.noTags}>No Tags Found</Text>
						) : (
							tags.map((tag, idx) => (
								<Text key={idx} style={styles.tagItem}>
									• {tag}
								</Text>
							))
						)}
					</View>

					<View style={styles.footer}>
						<TouchableOpacity onPress={onClose}>
							<Text style={styles.button}>Cancel</Text>
						</TouchableOpacity>
						<TouchableOpacity onPress={onClose}>
							<Text style={styles.button}>OK</Text>
						</TouchableOpacity>
					</View>
				</Pressable>
			</Pressable>
		</Modal>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
		backgroundColor: "rgba(0, 0, 0, 0.6)",
	},
	modal: {
		width: "85%",
		backgroundColor: "#2A2A33",
		padding: 20,
		borderRadius: 20,
	},
	title: {
		fontSize: 18,
		fontFamily: "ComicNeue-Bold",
		color: DarkColors.textPrimary,
		marginBottom: 10,
	},
	inputRow: {
		flexDirection: "row",
		alignItems: "center",
		borderBottomWidth: 1,
		borderBottomColor: DarkColors.accent,
		paddingBottom: 6,
		marginBottom: 12,
	},
	input: {
		flex: 1,
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
	},
	tagList: {
		minHeight: 50,
		marginBottom: 15,
	},
	noTags: {
		color: DarkColors.accent,
		fontFamily: "ComicNeue-Regular",
	},
	tagItem: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		marginVertical: 2,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
	},
	button: {
		color: DarkColors.highlight,
		fontFamily: "ComicNeue-Bold",
	},
});
