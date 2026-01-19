/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useMemo, useRef, useState } from "react";
import {
	Alert,
	Animated,
	Platform,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

import OptionsMenu from "../../components/JournalViewComponents/OptionsMenu";
import SwipeableCard from "../../components/JournalViewComponents/SwipeableCard";
import { useJournalEntries } from "../../components/JournalViewComponents/useJournalEntries";
import { DarkColors } from "../../constants/Colors";
import { deleteJournalEntry } from "../../lib/apiDeleteActions";
import { JournalEntry, Position } from "../../lib/apiGetActions";

const JournalView: React.FC = () => {
	const { journalId, journalTitle } = useLocalSearchParams();
	const { journalEntries, isLoading, error, fetchEntries, setJournalEntries } =
		useJournalEntries(journalId);

	const [search, setSearch] = useState("");
	const [optionsPosition, setOptionsPosition] = useState<Position | null>(null);
	const [selectedEntryId, setSelectedEntryId] = useState<
		string | number | null
	>(null);
	const fadeAnim = useRef(new Animated.Value(1)).current;

	const filteredEntries = useMemo(() => {
		if (!search) {
			return journalEntries;
		}
		return journalEntries.filter((entry: { title: string }) =>
			entry.title.toLowerCase().includes(search.toLowerCase()),
		);
	}, [search, journalEntries]);

	useFocusEffect(
		React.useCallback(() => {
			fetchEntries();
		}, [fetchEntries]),
	);

	const handleDeleteEntry = async (entryId: string | number) => {
		if (!entryId) {
			return;
		}

		const original = [...journalEntries];

		Alert.alert("Delete Entry", "Are you sure you want to delete this entry?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: async () => {
					try {
						setJournalEntries((prev) =>
							prev.filter((entry) => entry.journalEntryId !== entryId),
						);

						// Proceed with deletion from backend
						const success = await deleteJournalEntry(entryId);
						if (!success) {
							// Rollback: put entry back if deletion failed
							fetchEntries(); // fallback
						}

						setSelectedEntryId(null);
						setOptionsPosition(null);
					} catch (error) {
						console.error("Error deleting entry:", error);
					}
				},
			},
		]);
	};

	const handleEntryPress = (entry: JournalEntry) => {
		router.push({
			pathname: "/Journal/CurrentEntryScreen",
			params: {
				journalId: entry.journalEntryId,
				journalTitle: entry.title,
				entries: JSON.stringify(entry),
			},
		});
	};

	const handleOptionsToggle = (id: string | number, position: Position) => {
		setOptionsPosition(position);
		setSelectedEntryId(id);
	};

	const handleMoveEntry = (entryId: string | number) => {
		// Implement your move logic here
		console.log("Move entry:", entryId);
	};

	return (
		<View style={styles.wrapper}>
			{/* Header */}
			<View style={styles.header}>
				<TouchableOpacity onPress={() => router.back()}>
					<Ionicons name="arrow-back" size={24} color={DarkColors.highlight} />
				</TouchableOpacity>

				<View style={styles.searchContainer}>
					<Ionicons name="search" color={DarkColors.textPrimary} size={18} />
					<TextInput
						placeholder="Search Entries"
						placeholderTextColor={DarkColors.accent}
						style={styles.searchInput}
						value={search}
						onChangeText={setSearch}
					/>
				</View>
			</View>

			{/* Scrollable Content */}
			<ScrollView
				style={styles.container}
				refreshControl={
					<RefreshControl refreshing={isLoading} onRefresh={fetchEntries} />
				}
			>
				<View style={styles.journalCard}>
					<Text style={styles.journalTitle}>{journalTitle}</Text>
					<Text style={styles.entryCount}>{journalEntries.length} entries</Text>
				</View>

				<Text style={styles.sectionTitle}>Recent Entries</Text>

				{error ? (
					<Text style={styles.errorText}>{error}</Text>
				) : filteredEntries.length === 0 ? (
					<Text style={styles.emptyText}>
						{search ? "No matching entries found" : "No entries yet"}
					</Text>
				) : (
					filteredEntries.map((entry: any, index: any) => (
						<Animated.View
							key={entry.journalEntryId}
							style={{ opacity: fadeAnim }}
						>
							<SwipeableCard
								entry={entry}
								index={index}
								onPress={() => handleEntryPress(entry)}
								onDelete={() => handleDeleteEntry(entry.journalEntryId)}
								onMove={() => handleMoveEntry(entry.journalEntryId)}
							/>
						</Animated.View>
					))
				)}
			</ScrollView>

			{/* New Entry Button */}
			<TouchableOpacity
				onPress={() =>
					router.push({
						pathname: "/Journal/NewEntryScreen",
						params: { journalId },
					})
				}
				style={styles.newEntryButton}
			>
				<View style={styles.newEntryWrapper}>
					{/* color={DarkColors.textPrimary} */}
					<Plus size={22} />
					<Text style={styles.newEntryText}>New Entry</Text>
				</View>
			</TouchableOpacity>

			{/* Options Menu */}
			{optionsPosition && selectedEntryId && (
				<OptionsMenu
					position={optionsPosition}
					onClose={() => setOptionsPosition(null)}
					onSelect={(option: string) => {
						if (option === "Delete" && selectedEntryId) {
							handleDeleteEntry(selectedEntryId);
						}
						setOptionsPosition(null);
					}}
				/>
			)}
		</View>
	);
};

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: DarkColors.background,
		paddingTop: Platform.OS === "ios" ? 50 : 45,
		paddingVertical: 35,
	},
	container: {
		paddingTop: 25,
		paddingHorizontal: 20,
		paddingBottom: 120,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		// marginBottom: 10,
		paddingHorizontal: 15,
		gap: 10,
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#2A2A33",
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 6,
		flex: 1,
	},
	searchInput: {
		marginLeft: 8,
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		flex: 1,
	},
	journalCard: {
		backgroundColor: "#2A2A33",
		borderRadius: 20,
		padding: 24,
		marginBottom: 20,
	},
	journalTitle: {
		fontFamily: "ComicNeue-Bold",
		color: DarkColors.highlight,
		fontSize: 22,
	},
	entryCount: {
		fontFamily: "ComicNeue-Regular",
		color: DarkColors.accent,
		marginTop: 5,
	},
	sectionTitle: {
		fontFamily: "ComicNeue-Bold",
		fontSize: 18,
		color: DarkColors.textPrimary,
		marginBottom: 12,
	},
	emptyText: {
		fontFamily: "ComicNeue-Regular",
		color: DarkColors.accent,
		textAlign: "center",
		marginTop: 30,
	},
	errorText: {
		fontFamily: "ComicNeue-Regular",
		color: "red",
		textAlign: "center",
		marginTop: 30,
	},
	newEntryButton: {
		backgroundColor: DarkColors.buttonColor,
		paddingVertical: 20,
		paddingHorizontal: 24,
		borderRadius: 30,
		alignSelf: "center",
		position: "absolute",
		bottom: 40,
		right: 15,
	},
	newEntryText: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Bold",
		fontSize: 16,
	},
	newEntryWrapper: {
		flexDirection: "row",
		alignItems: "center",
		gap: 6,
	},
});

export default JournalView;
