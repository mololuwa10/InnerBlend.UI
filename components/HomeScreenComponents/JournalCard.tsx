/* eslint-disable import/no-unresolved */
"use client";

import { DarkColors } from "@/constants/Colors";
import React from "react";
import { StyleSheet, Text, TouchableOpacity } from "react-native";

export default function JournalCard({ journal }: { journal: any }) {
	return (
		<>
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
