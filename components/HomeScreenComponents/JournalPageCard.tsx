"use client";

import { router } from "expo-router";
import React from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
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
				<View style={styles.titleContainer}>
					<View style={{ flex: 1 }}>
						<Text style={styles.title}>{journal.journalTitle}</Text>
						<Text style={styles.journalDate}>
							{getDateString(new Date(journal.dateCreated))}
						</Text>
					</View>

					<Image
						source={{
							uri: "https://plus.unsplash.com/premium_photo-1675813860520-5460c6209088?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
						}}
						style={styles.image}
					/>
				</View>
			</TouchableOpacity>
		</>
	);
}

const styles = StyleSheet.create({
	card: {
		backgroundColor: "#2A2A33",
		padding: 20,
		marginBottom: 20,
		borderRadius: 13,
	},
	journalDate: {
		textAlign: "left",
		color: DarkColors.textPrimary,
		paddingVertical: 8,
		fontFamily: "ComicNeue-Regular",
		fontSize: 14,
	},
	titleContainer: {
		flex: 1,
		flexDirection: "row",
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
	image: {
		resizeMode: "center",
		width: 120,
		height: 80,
		borderRadius: 20,
	},
});
