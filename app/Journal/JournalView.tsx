import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect } from "@react-navigation/native";
import { router, useLocalSearchParams } from "expo-router";
import { EllipsisVertical, Plus } from "lucide-react-native";
import React, { useCallback, useRef, useState } from "react";
import {
	Alert,
	Animated,
	Platform,
	Pressable,
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
import { deleteJournalEntry } from "../../lib/apiDeleteActions";
import {
	getJournalEntriesByJournalId,
	JournalEntry,
} from "../../lib/apiGetActions";

export default function JournalView() {
	const { journalId, journalTitle } = useLocalSearchParams() as {
		journalId: string | number | undefined;
		journalTitle: string;
	};

	const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
	const [refreshing, setRefreshing] = useState(false);
	const [search, setSearch] = useState("");
	const [optionsPosition, setOptionsPosition] = useState<{
		x: number;
		y: number;
	} | null>(null);
	const [selectedEntryId, setSelectedEntryId] = useState<
		string | number | null
	>(null);
	const entryRefs = useRef<{ [key: string]: any }>({});
	const fadeAnim = useRef(new Animated.Value(1)).current;
	// const navigation = useNavigation<StackNavigationProp<any>>();

	const fetchEntries = useCallback(async () => {
		if (!journalId) return;

		const result = await getJournalEntriesByJournalId(journalId.toString());

		if (result?.$values?.length) {
			const sorted = result.$values.sort(
				(a, b) =>
					new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
			);
			setJournalEntries(sorted);
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
		setRefreshing(false);
	};

	const handleDeleteEntry = async (entryId: string | number) => {
		if (!entryId) return;

		Alert.alert("Delete Entry", "Are you sure you want to delete this entry?", [
			{ text: "Cancel", style: "cancel" },
			{
				text: "Delete",
				style: "destructive",
				onPress: async () => {
					try {
						Animated.timing(fadeAnim, {
							toValue: 0,
							duration: 300,
							useNativeDriver: true,
						}).start(async () => {
							const success = await deleteJournalEntry(entryId);
							if (success) {
								fetchEntries();
							} else {
								Animated.timing(fadeAnim, {
									toValue: 1,
									duration: 300,
									useNativeDriver: true,
								}).start();
							}

							//reset selected entry id
							setSelectedEntryId(null);
							setOptionsPosition(null);
						});
					} catch (error: any) {
						console.error(error);
					}
				},
			},
		]);
	};

	const handleOptionsPress = (option: string) => {
		if (!selectedEntryId) return;

		setOptionsPosition(null);

		if (option === "Move") {
			console.log("Move");
		} else if (option === "Delete") {
			handleDeleteEntry(selectedEntryId);
		} else {
			console.log(option);
		}
	};

	const handleOptionsToggle = (id: number | string) => {
		entryRefs.current[id]?.measure?.(
			(fx: any, fy: any, width: any, height: any, px: any, py: any) => {
				setOptionsPosition({ x: px, y: py + height });
				setSelectedEntryId(id);
			}
		);
	};

	const renderEntryCard = (entry: JournalEntry, index: number) => (
		<Animated.View key={entry.journalEntryId} style={{ opacity: fadeAnim }}>
			<TouchableOpacity
				style={styles.entryCard}
				onPress={() =>
					router.push({
						pathname: "/Journal/CurrentEntryScreen",
						params: {
							journalId: entry.journalEntryId,
							journalTitle: entry.title,
							entries: JSON.stringify(entry),
						},
					})
				}
				// onPress={() => navigation.navigate("Journal/CurrentEntryScreen")}
			>
				<View style={styles.entryRow}>
					<Text style={styles.entryDate}>
						{new Date(entry.dateCreated).toLocaleDateString("en-GB", {
							day: "2-digit",
							month: "long",
							year: "numeric",
						})}
					</Text>

					<TouchableOpacity
						ref={(ref) => {
							entryRefs.current[entry.journalEntryId] = ref;
						}}
						onPress={() => handleOptionsToggle(entry.journalEntryId)}
					>
						<EllipsisVertical size={24} color="#fff" />
					</TouchableOpacity>
				</View>

				<View style={styles.entryRow}>
					<View style={{ flex: 1 }}>
						<Text style={styles.entryText} numberOfLines={1}>
							{entry.title}
						</Text>

						{entry.mood && moodMap[entry.mood] && (
							<Text style={{ fontSize: 18, marginTop: 4 }}>
								{moodMap[entry.mood]}
							</Text>
						)}
					</View>

					<View
						style={[
							styles.dot,
							{ backgroundColor: index % 2 === 0 ? "#66c2a5" : "#6A9ED6" },
						]}
					/>
				</View>
			</TouchableOpacity>
		</Animated.View>
	);

	const renderOptionsMenu = () =>
		optionsPosition &&
		selectedEntryId && (
			<Pressable
				style={StyleSheet.absoluteFill}
				onPress={() => setOptionsPosition(null)}
			>
				<View
					style={[
						styles.optionsContainer,
						{ top: optionsPosition.y, left: optionsPosition.x - 160 },
					]}
				>
					{["Move", "Delete"].map((option) => (
						<TouchableOpacity
							key={option}
							style={styles.option}
							onPress={() => {
								handleOptionsPress(option);
								setOptionsPosition(null);
							}}
						>
							<Text style={styles.optionText}>{option}</Text>
						</TouchableOpacity>
					))}
				</View>
			</Pressable>
		);

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
						placeholder="Search"
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
					<RefreshControl refreshing={refreshing} onRefresh={onRefresh} />
				}
			>
				<View style={styles.journalCard}>
					<Text style={styles.journalTitle}>{journalTitle}</Text>
					<Text style={styles.entryCount}>{journalEntries.length} entries</Text>
				</View>

				<Text style={styles.sectionTitle}>Recent Entries</Text>

				{journalEntries.length === 0 ? (
					<Text style={styles.emptyText}>No entries found.</Text>
				) : (
					journalEntries.map(renderEntryCard)
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
					<Plus color={DarkColors.textPrimary} size={22} />
					<Text style={styles.newEntryText}>New Entry</Text>
				</View>
			</TouchableOpacity>

			{renderOptionsMenu()}
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: DarkColors.background,
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
	entryRow: {
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
		marginBottom: 10,
	},
	entryDate: {
		color: DarkColors.accent,
		fontFamily: "ComicNeue-Regular",
		marginBottom: 6,
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
	optionsContainer: {
		backgroundColor: "#333",
		borderRadius: 10,
		paddingVertical: 10,
		paddingHorizontal: 20,
		width: 200,
		position: "absolute",
	},
	option: {
		paddingVertical: 10,
	},
	optionText: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		fontSize: 16,
	},
});
