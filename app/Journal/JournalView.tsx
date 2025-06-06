/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { Plus } from "lucide-react-native";
import React, { useCallback, useState } from "react";
import {
	Platform,
	RefreshControl,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { DarkColors } from "../../constants/Colors";
import { moodMap } from "../../constants/moodUtils";
import {
	getJournalEntriesByJournalId,
	JournalEntry,
} from "../../lib/apiGetActions";

export default function JournalView() {
	const { journalId, journalTitle, entries } = useLocalSearchParams() as {
		journalId: string | number | undefined;
		journalTitle: string;
		entries: string;
	};

	// const parsedEntries = JSON.parse(entries);
	const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [search, setSearch] = useState("");

	const fetchEntries = useCallback(async () => {
		if (!journalId) return;
		const result = await getJournalEntriesByJournalId(journalId.toString());

		if (result && Array.isArray(result.$values)) {
			const sortedResultByDateCreated = result.$values.sort((a, b) => {
				return (
					new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
				);
			});
			setJournalEntries(sortedResultByDateCreated);
		} else {
			console.warn("Unexpected journal entry response:", result);
			setJournalEntries([]);
		}
	}, [journalId]);

	useFocusEffect(
		useCallback(() => {
			fetchEntries();
		}, [fetchEntries])
	);

	const onRefresh = async () => {
		setRefreshing(true);
		await fetchEntries();
		setTimeout(() => {
			setRefreshing(false);
		}, 1000);
	};

	return (
		<>
			<View style={styles.wrapper}>
				<View style={styles.header}>
					<TouchableOpacity onPress={() => router.back()}>
						<Ionicons
							name="arrow-back"
							size={24}
							color={DarkColors.highlight}
						/>
					</TouchableOpacity>

					<View style={styles.searchContainer}>
						<Ionicons name="search" color={DarkColors.textPrimary} size={18} />
						<TextInput
							placeholder="Search"
							placeholderTextColor={DarkColors.accent}
							style={styles.searchInput}
							value={search}
							onChangeText={setSearch}
						/>
					</View>
				</View>
				<ScrollView
					style={styles.container}
					refreshControl={
						<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
					}
				>
					{/* Header */}
					<View style={styles.journalCard}>
						<Text style={styles.journalTitle}>{journalTitle}</Text>
						<Text style={styles.entryCount}>
							{journalEntries.length} entries
						</Text>
					</View>

					{/* Section Title */}
					<Text style={styles.sectionTitle}>Recent Entries</Text>

					{/* Empty State */}
					{journalEntries.length === 0 ? (
						<Text style={styles.emptyText}>No entries found.</Text>
					) : (
						journalEntries.map((item: any, index: number) => (
							<TouchableOpacity
								key={item.journalEntryId}
								style={styles.entryCard}
								onPress={() => {
									console.log("Tapped entry:", item.title);
								}}
							>
								<Text style={styles.entryDate}>
									{new Date(item.dateCreated).toLocaleDateString("en-GB", {
										day: "2-digit",
										month: "long",
										year: "numeric",
									})}
								</Text>
								<View style={styles.entryRow}>
									<View style={{ flex: 1 }}>
										<Text style={styles.entryText} numberOfLines={1}>
											{item.title}
										</Text>
										{item.mood && moodMap[item.mood] && (
											<Text style={{ fontSize: 18, marginTop: 4 }}>
												{moodMap[item.mood]}
											</Text>
										)}
									</View>
									<View
										style={[
											styles.dot,
											{
												backgroundColor:
													index % 2 === 0 ? "#66c2a5" : "#6A9ED6",
											},
										]}
									/>
								</View>
							</TouchableOpacity>
						))
					)}
				</ScrollView>
				{/* New Entry Button */}
				<TouchableOpacity
					onPress={() =>
						router.push({
							pathname: "/Journal/NewEntryScreen",
							params: { journalId: journalId },
						})
					}
					style={styles.newEntryButton}
				>
					<View style={styles.newEntryWrapper}>
						<Plus color={DarkColors.textPrimary} size={22} />
						<Text style={styles.newEntryText}>New Entry</Text>
					</View>
				</TouchableOpacity>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: DarkColors.background,
		// paddingVertical: 20,
		paddingTop: Platform.OS === "ios" ? 50 : 45,
		paddingVertical: 35,
	},
	container: {
		paddingTop: 25,
		paddingHorizontal: 15,
		paddingBottom: 120,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
		paddingHorizontal: 20,
		gap: 10,
	},
	appName: {
		fontSize: 20,
		color: DarkColors.highlight,
		fontFamily: "ComicNeue-Bold",
	},
	searchContainer: {
		flexDirection: "row",
		alignItems: "center",
		backgroundColor: "#2A2A33",
		borderRadius: 10,
		paddingHorizontal: 10,
		paddingVertical: 6,
		flex: 1,
		// marginHorizontal: 10,
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
		marginBottom: 30,
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
	entryCard: {
		backgroundColor: "#2A2A33",
		borderRadius: 16,
		padding: 16,
		marginBottom: 16,
	},
	entryDate: {
		color: DarkColors.accent,
		fontFamily: "ComicNeue-Regular",
		marginBottom: 6,
	},
	entryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	entryText: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		fontSize: 15,
		flex: 1,
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginLeft: 10,
	},
	emptyText: {
		fontFamily: "ComicNeue-Regular",
		color: DarkColors.accent,
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
		bottom: 30,
		right: 10,
		marginHorizontal: "auto",
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
