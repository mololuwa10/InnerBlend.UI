import React from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { DarkColors } from "../../constants/Colors";

const moodOptions = [
	{ mood: "Very Happy", emoji: "😁" },
	{ mood: "Happy", emoji: "🙂" },
	{ mood: "Neutral", emoji: "😐" },
	{ mood: "Sad", emoji: "😞" },
	{ mood: "Very Sad", emoji: "😭" },
];

export default function MoodModal({
	visible,
	onClose,
	onSelectMood,
	currentMood,
}: {
	visible: boolean;
	onClose: () => void;
	onSelectMood: (mood: string) => void;
	currentMood: string;
}) {
	return (
		<>
			<Modal
				visible={visible}
				animationType="fade"
				transparent
				onRequestClose={onClose}
			>
				<Pressable style={styles.overlay} onPress={onClose}>
					<Pressable style={styles.card} onPress={(e) => e.stopPropagation()}>
						<Text style={styles.title}>Select Mood</Text>

						<View style={styles.moodGrid}>
							{moodOptions.map((moodOption) => (
								<TouchableOpacity
									key={moodOption.mood}
									style={[
										styles.moodButton,
										currentMood === moodOption.mood && styles.active,
									]}
									onPress={() => {
										onSelectMood(moodOption.mood);
										onClose();
									}}
								>
									<Text style={styles.emoji}>{moodOption.emoji}</Text>
									<Text style={styles.moodText}>{moodOption.mood}</Text>
								</TouchableOpacity>
							))}
						</View>
					</Pressable>
				</Pressable>
			</Modal>
		</>
	);
}

const styles = StyleSheet.create({
	overlay: {
		flex: 1,
		justifyContent: "flex-end",
		backgroundColor: "rgba(0,0,0,0.5)",
	},
	card: {
		backgroundColor: "#1b1b1f",
		padding: 20,
		borderTopLeftRadius: 15,
		borderTopRightRadius: 15,
	},
	title: {
		color: DarkColors.textPrimary,
		fontSize: 20,
		fontFamily: "ComicNeue-Bold",
		marginBottom: 16,
	},
	moodGrid: {
		flexDirection: "row",
		justifyContent: "space-between",
		flexWrap: "wrap",
	},
	moodButton: {
		width: "35%",
		backgroundColor: "#2A2A33",
		borderRadius: 10,
		padding: 10,
		marginBottom: 12,
		alignItems: "center",
	},
	active: {
		borderColor: DarkColors.highlight,
		borderWidth: 2,
	},
	emoji: {
		fontSize: 28,
		marginBottom: 6,
	},
	moodText: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
	},
});
