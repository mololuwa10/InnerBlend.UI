/* eslint-disable import/no-unresolved */
"use client";

import { DarkColors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

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
	return (
		<>
			{/* <Text style={styles.journalDate}> */}
			<Text style={styles.journalDate}>
				{getDateString(new Date(journal.dateCreated))} .{" "}
				{new Date(journal.dateCreated).toLocaleDateString("en-GB", {
					weekday: "short",
				})}
			</Text>
			{/* </Text> */}
			<TouchableOpacity style={styles.card}>
				<Text style={styles.title}>{journal.journalTitle}</Text>
				<Text style={styles.subtitle}>{journal.journalDescription}</Text>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#2A2A33",
		padding: 20,
		marginBottom: 15,
		borderRadius: 12,
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
});
