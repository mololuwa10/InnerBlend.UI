"use client";

import { router } from "expo-router";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";
import { DarkColors } from "../../constants/Colors";

const getDateString = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
	};
	return date.toLocaleDateString("en-GB", options);
};

export default function JournalPageCard({ journal }: { journal: any }) {
	const entries = journal.journalEntries?.$values || [];

	return (
		<>
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
			>
				<Text style={styles.title}>{journal.journalTitle}</Text>
				<Text style={styles.description}>{journal.journalDescription}</Text>

				<Text style={styles.journalDate}>
					{getDateString(new Date(journal.dateCreated))} .{" "}
					{new Date(journal.dateCreated).toLocaleDateString("en-GB", {
						weekday: "short",
					})}
				</Text>
			</TouchableOpacity>
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
	journalDate: {
		textAlign: "left",
		color: DarkColors.textPrimary,
		paddingVertical: 15,
		fontFamily: "ComicNeue-Regular",
		fontSize: 14,
	},
	title: {
		color: DarkColors.textPrimary,
		fontSize: 23,
		fontFamily: "ComicNeue-Bold",
		marginBottom: 5,
	},
	description: {
		color: DarkColors.textPrimary,
		fontSize: 16,
		fontFamily: "ComicNeue-Regular",
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
	},
	entryTitle: {
		fontFamily: "ComicNeue-Bold",
		color: DarkColors.textPrimary,
		fontSize: 14,
		flex: 1,
		textAlign: "right",
	},
});
