/* eslint-disable @typescript-eslint/no-unused-vars */
"use client";

import { router } from "expo-router";
import React, { useRef, useState } from "react";
import {
	Alert,
	Animated,
	StyleSheet,
	Text,
	TouchableOpacity,
	View,
} from "react-native";
import { DarkColors } from "../../constants/Colors";
import { deleteJournal } from "../../lib/apiDeleteActions";

const getDateString = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};
	return date.toLocaleDateString("en-GB", options);
};

export default function JournalCard({
	journal,
	onDelete,
}: {
	journal: any;
	onDelete?: () => void;
}) {
	const entries = journal.journalEntries?.$values || [];

	const [showOptions, setShowOptions] = useState(false);
	const [refreshing, setRefreshing] = useState(false);

	const fadeAnim = useRef(new Animated.Value(1)).current;

	return (
		<>
			<Text style={styles.journalDate}>
				{getDateString(new Date(journal.dateCreated))} .{" "}
				{new Date(journal.dateCreated).toLocaleDateString("en-GB", {
					weekday: "short",
				})}
			</Text>

			<Animated.View style={{ opacity: fadeAnim }}>
				<TouchableOpacity
					style={styles.card}
					onPress={() =>
						router.push({
							pathname: "/Journal/JournalView",
							params: {
								journalId: journal.journalId,
								journalTitle: journal.journalTitle,
								entries: JSON.stringify(entries),
							},
						})
					}
					onLongPress={() => {
						Alert.alert(
							"Delete Journal",
							"Are you sure you want to delete this journal?",
							[
								{ text: "Cancel", style: "cancel" },
								{
									text: "Delete",
									style: "destructive",
									onPress: async () => {
										Animated.timing(fadeAnim, {
											toValue: 0,
											duration: 300,
											useNativeDriver: true,
										}).start(async () => {
											const result = await deleteJournal(journal.journalId);
											if (result) {
												onDelete?.();
											} else {
												Animated.timing(fadeAnim, {
													toValue: 1,
													duration: 300,
													useNativeDriver: true,
												}).start();
											}
										});
									},
								},
							]
						);
					}}
				>
					<View style={styles.headerRow}>
						<Text style={styles.title}>{journal.journalTitle}</Text>

						{/* <TouchableOpacity onPress={() => setShowOptions(true)}>
						<EllipsisVertical size={18} color="#fff" />
					</TouchableOpacity> */}
					</View>

					{entries.length === 0 ? (
						<Text style={[styles.subtitle, { marginTop: 10 }]}>
							No entries yet.
						</Text>
					) : (
						entries
							.sort(
								(a: any, b: any) =>
									new Date(b.dateCreated).getTime() -
									new Date(a.dateCreated).getTime()
							)
							.slice(0, 2)
							.map((entry: any) => (
								<View key={entry.journalEntryId} style={styles.entryRow}>
									<Text style={styles.entryDate}>
										{new Date(entry.dateCreated).toLocaleDateString("en-GB", {
											day: "2-digit",
											month: "short",
										})}
									</Text>
									<Text style={styles.entryTitle} numberOfLines={1}>
										{entry.title}
									</Text>
								</View>
							))
					)}
				</TouchableOpacity>
			</Animated.View>
		</>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#2A2A33",
		padding: 20,
		marginBottom: 20,
		borderRadius: 20,
	},
	headerRow: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 10,
	},
	modalBackground: {
		backgroundColor: "rgba(0,0,0,0.4)",
		flex: 1,
		justifyContent: "center",
		alignItems: "center",
	},
	optionsContainer: {
		backgroundColor: "#333",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		width: 200,
	},
	option: {
		paddingVertical: 10,
	},
	optionText: {
		color: "#fff",
		fontFamily: "ComicNeue-Regular",
		fontSize: 16,
	},
	journalDate: {
		textAlign: "center",
		color: DarkColors.textPrimary,
		paddingVertical: 15,
		fontFamily: "ComicNeue-Bold",
		fontSize: 16,
	},
	title: {
		color: DarkColors.textPrimary,
		fontSize: 18,
		fontFamily: "ComicNeue-Bold",
		marginBottom: 5,
	},
	subtitle: {
		color: DarkColors.accent,
		fontSize: 14,
		fontFamily: "ComicNeue-Regular",
	},
	entryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginTop: 10,
		gap: 12,
	},
	entryDate: {
		fontFamily: "ComicNeue-Regular",
		color: DarkColors.highlight,
		fontSize: 14,
		width: 80,
		// flex: 1,
	},
	entryTitle: {
		fontFamily: "ComicNeue-Bold",
		color: DarkColors.textPrimary,
		fontSize: 14,
		flex: 1,
		textAlign: "right",
	},
});
