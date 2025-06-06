import React from "react";
import { Modal, Pressable, StyleSheet, Text } from "react-native";
export default function CreateJournalModal({
	visible,
	onClose,
}: {
	visible: boolean;
	onClose: () => void;
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
					<Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
						<Text style={styles.title}>Create Journal</Text>
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
		fontSize: 24,
	},
});
