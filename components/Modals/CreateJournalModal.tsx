import React, { useState } from "react";
import {
	ActivityIndicator,
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
} from "react-native";
import { DarkColors } from "../../constants/Colors";
import { createJournal } from "../../lib/apiPostActions";
export default function CreateJournalModal({
	visible,
	onClose,
	onSuccess,
}: {
	visible: boolean;
	onClose: () => void;
	onSuccess: () => void;
}) {
	const [title, setTitle] = useState("");
	const [description, setDescription] = useState("");
	const [loading, setLoading] = useState(false);

	const handleSaveJournal = async () => {
		if (!title.trim() || !description.trim()) {
			alert("Please enter a title and description.");
			return;
		}

		setLoading(true);

		const success = await createJournal({
			journalTitle: title.trim(),
			journalDescription: description.trim(),
		});

		setLoading(false);
		if (success) {
			alert("Journal created!");
			setTitle("");
			setDescription("");
			onClose();
			onSuccess?.();
		}
	};
	return (
		<>
			<Modal
				visible={visible}
				animationType="fade"
				transparent
				onRequestClose={onClose}
			>
				<Pressable style={styles.overlay} onPress={onClose}>
					<Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
						<Text style={styles.title}>Create Journal</Text>

						{/* <View style={{ flex: 1 }}> */}
						<TextInput
							style={styles.input}
							placeholderTextColor={"#888"}
							value={title}
							onChangeText={setTitle}
							placeholder="Journal Title....."
						/>

						<TextInput
							style={[styles.input, { marginTop: 20 }]}
							placeholderTextColor={"#888"}
							value={description}
							onChangeText={setDescription}
							placeholder="Journal Description....."
						/>

						<TouchableOpacity
							onPress={handleSaveJournal}
							disabled={loading}
							style={styles.button}
						>
							{loading ? (
								<ActivityIndicator color={"#fff"} />
							) : (
								<Text style={styles.buttonText}>Save Journal</Text>
							)}
						</TouchableOpacity>

						{/* </View> */}
					</Pressable>
				</Pressable>
			</Modal>
		</>
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
		fontFamily: "ComicNeue-Bold",
		fontSize: 20,
		color: DarkColors.textPrimary,
		textAlign: "center",
		marginBottom: 15,
	},
	input: {
		// backgroundColor: "#000",
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		fontSize: 16,
		borderRadius: 10,
		padding: 16,
		borderColor: DarkColors.accent,
		borderWidth: 1,
	},
	button: {
		marginTop: 50,
		backgroundColor: DarkColors.buttonColor,
		borderRadius: 10,
		paddingVertical: 12,
		alignItems: "center",
	},
	buttonText: {
		color: "#fff",
		fontFamily: "ComicNeue-Bold",
		fontSize: 16,
	},
});
