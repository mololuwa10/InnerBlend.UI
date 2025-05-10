/* eslint-disable import/no-unresolved */
"use client";

import { DarkColors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity, View } from "react-native";

const getDateString = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
		// weekday: "short",
		// hour: "2-digit",
		// minute: "2-digit",
	};
	return date.toLocaleDateString("en-GB", options);
};

export default function JournalCard({ journal }: { journal: any }) {
	const entries = journal.journalEntries?.$values || [];

	return (
		<>
			<Text style={styles.journalDate}>
				{getDateString(new Date(journal.dateCreated))} .{" "}
				{new Date(journal.dateCreated).toLocaleDateString("en-GB", {
					weekday: "short",
				})}
			</Text>
			<TouchableOpacity style={styles.card}>
				<Text style={styles.title}>{journal.journalTitle}</Text>

				{entries.length === 0 ? (
					<Text style={[styles.subtitle, { marginTop: 10 }]}>
						No entries yet.
					</Text>
				) : (
					entries.map((entry: any) => (
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
