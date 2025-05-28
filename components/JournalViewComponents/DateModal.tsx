/* eslint-disable import/no-unresolved */
import { DarkColors } from "@/constants/Colors";
import DateTimePicker from "@react-native-community/datetimepicker";
import React from "react";
import {
	Modal,
	Pressable,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";

export default function DateModal({
	visible,
	date,
	onClose,
	onConfirm,
}: {
	visible: boolean;
	date: Date;
	onClose: () => void;
	onConfirm: (date: Date) => void;
}) {
	return (
		<Modal
			visible={visible}
			animationType="fade"
			transparent
			onRequestClose={onClose}
		>
			<Pressable style={styles.overlay} onPress={onClose}>
				<Pressable style={styles.modal} onPress={(e) => e.stopPropagation()}>
					<Text style={styles.title}>Select Date</Text>

					<Text style={styles.label}>
						{date.toLocaleDateString("en-GB", {
							day: "2-digit",
							month: "long",
							year: "numeric",
						})}
					</Text>

					<DateTimePicker
						value={date}
						mode="date"
						display="calendar"
						onChange={(event, selectedDate) => {
							if (event.type === "set" && selectedDate) {
								onConfirm(selectedDate);
							}
							if (event.type === "dismissed") {
								onClose();
							}
						}}
					/>

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
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Bold",
		fontSize: 18,
		marginBottom: 10,
	},
	label: {
		textAlign: "center",
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		marginBottom: 10,
	},
	footer: {
		flexDirection: "row",
		justifyContent: "space-between",
		marginTop: 20,
	},
	button: {
		color: DarkColors.highlight,
		fontFamily: "ComicNeue-Bold",
	},
});
