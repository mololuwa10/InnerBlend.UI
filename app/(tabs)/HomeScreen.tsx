/* eslint-disable import/no-unresolved */

import JournalCard from "@/components/HomeScreenComponents/JournalCard";
import { DarkColors } from "@/constants/Colors";
import { getJournals, Journal } from "@/lib/apiGetActions";
import { Ionicons } from "@expo/vector-icons";
import { ListFilter, Plus } from "lucide-react-native";
import React, { useEffect, useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";

const getDateString = (date: Date) => {
	const options: Intl.DateTimeFormatOptions = {
		day: "numeric",
		month: "long",
		year: "numeric",
		// hour: "2-digit",
		// minute: "2-digit",
	};
	return date.toLocaleDateString("en-GB", options);
};

export default function HomeScreen() {
	const [journals, setJournals] = useState<Journal[]>([]);
	const [loading, setLoading] = useState(true);

	useEffect(() => {
		const fetchJournals = async () => {
			try {
				const data = await getJournals();
				if (data) {
					setJournals(data);
				}
			} catch (err) {
				console.error("Failed to load journals:", err);
			} finally {
				setLoading(false);
			}
		};

		fetchJournals();
	}, []);
	return (
		<View style={styles.wrapper}>
			<ScrollView contentContainerStyle={styles.container}>
				{/* Top Navigation Bar */}
				<View style={styles.header}>
					<Text style={styles.appName}>InnerBlend</Text>

					<View style={styles.searchContainer}>
						<Ionicons name="search" color={DarkColors.textPrimary} size={18} />
						<TextInput
							placeholder="Search"
							placeholderTextColor={DarkColors.accent}
							style={styles.searchInput}
						/>
					</View>

					<TouchableOpacity>
						<Ionicons
							name="person-circle"
							size={28}
							color={DarkColors.highlight}
						/>
					</TouchableOpacity>
				</View>

				{/* Stories */}
				<ScrollView
					horizontal
					showsHorizontalScrollIndicator={false}
					style={styles.storyScroll}
				>
					<View style={styles.cardToday}>
						<Text style={styles.cardTitle}>Today</Text>
						<Text style={styles.cardSubtitle}>{getDateString(new Date())}</Text>
					</View>

					{/* <View style={styles.cardMuted}>
						<Text style={styles.cardTitle}>Throwback</Text>
						<Text style={styles.cardSubtitle}>No throwback</Text>
					</View> */}
				</ScrollView>
				<View style={styles.journalFilterContainer}>
					<Text style={styles.journalFilter}>Journals</Text>
					<TouchableOpacity>
						<ListFilter size={28} color={DarkColors.textPrimary} />
					</TouchableOpacity>
				</View>

				{/* Empty State */}
				{/* Cards or Empty */}
				{loading ? (
					<ActivityIndicator size="large" color={DarkColors.accent} />
				) : journals.length === 0 ? (
					<View style={styles.emptyState}>
						<Ionicons name="book-outline" size={40} color={DarkColors.accent} />
						<Text style={styles.emptyTitle}>No journal entries.</Text>
						<Text style={styles.emptySubtitle}>
							Begin your journey by adding a new entry.
						</Text>
					</View>
				) : (
					journals.map((journal) => (
						<JournalCard key={journal.journalId} journal={journal} />
					))
				)}
				{/* <View style={styles.emptyState}>
					<Ionicons name="book-outline" size={40} color={DarkColors.accent} />
					<Text style={styles.emptyTitle}>No journal entries.</Text>
					<Text style={styles.emptySubtitle}>
						Begin your journey by adding a new entry.
					</Text>
				</View> */}
			</ScrollView>

			{/* New Entry Button */}
			<TouchableOpacity style={styles.newEntryButton}>
				<View style={styles.newEntryWrapper}>
					<Plus color={DarkColors.textPrimary} size={22} />
					<Text style={styles.newEntryText}>New Journal</Text>
				</View>
			</TouchableOpacity>
		</View>
	);
}

const styles = StyleSheet.create({
	wrapper: {
		flex: 1,
		backgroundColor: DarkColors.background,
	},
	container: {
		paddingTop: 45,
		paddingHorizontal: 20,
		paddingBottom: 100,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
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
		marginHorizontal: 10,
	},
	searchInput: {
		marginLeft: 8,
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		flex: 1,
	},
	storyScroll: {
		flexGrow: 0,
		marginBottom: 30,
	},
	cardToday: {
		backgroundColor: DarkColors.primary,
		borderRadius: 12,
		marginTop: 10,
		padding: 30,
		marginRight: 15,
		width: 240,
	},
	cardMuted: {
		backgroundColor: "#444",
		borderRadius: 12,
		padding: 16,
		width: 140,
	},
	cardTitle: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Bold",
		fontSize: 18,
		marginBottom: 6,
	},
	cardSubtitle: {
		color: DarkColors.accent,
		fontFamily: "ComicNeue-Regular",
		fontSize: 15,
	},
	journalFilterContainer: {
		flex: 1,
		flexDirection: "row",
		justifyContent: "space-between",
		alignItems: "center",
	},
	journalFilter: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		fontSize: 18,
	},
	emptyState: {
		alignItems: "center",
		justifyContent: "center",
		marginTop: 80,
	},
	emptyTitle: {
		marginTop: 10,
		color: DarkColors.accent,
		fontSize: 16,
		fontFamily: "ComicNeue-Bold",
	},
	emptySubtitle: {
		color: DarkColors.accent,
		fontSize: 14,
		fontFamily: "ComicNeue-Regular",
		marginTop: 4,
		textAlign: "center",
		paddingHorizontal: 40,
	},
	newEntryButton: {
		backgroundColor: DarkColors.buttonColor,
		paddingVertical: 20,
		paddingHorizontal: 24,
		borderRadius: 30,
		alignSelf: "center",
		position: "absolute",
		bottom: 30,
		// left: 100,
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
