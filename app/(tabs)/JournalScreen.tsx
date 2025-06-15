import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import React, { useCallback, useState } from "react";
import {
	ActivityIndicator,
	ScrollView,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import JournalPageCard from "../../components/HomeScreenComponents/JournalPageCard";
import { DarkColors } from "../../constants/Colors";
import { getJournals, Journal } from "../../lib/apiGetActions";

export default function JournalScreen() {
	const [journals, setJournals] = useState<Journal[]>([]);
	const [loading, setLoading] = useState(true);
	const navigation = useNavigation<StackNavigationProp<any>>();

	const fetchJournals = useCallback(async () => {
		setLoading(true);
		try {
			const data = await getJournals();
			if (data && Array.isArray(data)) {
				// Sort by dateCreated (most recent first)
				const sortedData = [...data].sort(
					(a, b) =>
						new Date(b.dateCreated).getTime() -
						new Date(a.dateCreated).getTime()
				);
				setJournals(sortedData);
			}
		} catch (err) {
			console.error("Failed to load journals:", err);
		} finally {
			setLoading(false);
		}
	}, []);

	useFocusEffect(
		useCallback(() => {
			fetchJournals();
		}, [fetchJournals])
	);

	return (
		<>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.appName}>Journals</Text>

					<View style={styles.searchContainer}>
						<Ionicons name="search" color={DarkColors.textPrimary} size={18} />
						<TextInput
							placeholder="Search"
							placeholderTextColor={DarkColors.accent}
							style={styles.searchInput}
						/>
					</View>

					<TouchableOpacity onPress={() => navigation.navigate("PersonalInfo")}>
						<Ionicons
							name="person-circle"
							size={28}
							color={DarkColors.highlight}
						/>
					</TouchableOpacity>
				</View>

				<ScrollView contentContainerStyle={styles.scrollViewContainer}>
					{loading ? (
						<ActivityIndicator size="large" color={DarkColors.accent} />
					) : journals.length === 0 ? (
						<View style={styles.emptyState}>
							<Ionicons
								name="book-outline"
								size={40}
								color={DarkColors.accent}
							/>
							<Text style={styles.emptyTitle}>No journal entries.</Text>
							<Text style={styles.emptySubtitle}>
								Begin your journey by adding a new entry.
							</Text>
						</View>
					) : (
						journals.map((journal) => (
							<JournalPageCard key={journal.journalId} journal={journal} />
						))
					)}
				</ScrollView>
			</View>
		</>
	);
}

const styles = StyleSheet.create({
	container: {
		flex: 1,
		backgroundColor: DarkColors.background,
		paddingTop: 45,
	},
	scrollViewContainer: {
		paddingTop: 10,
		paddingHorizontal: 20,
		paddingBottom: 10,
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
		paddingHorizontal: 20,
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
	appName: {
		fontSize: 20,
		color: DarkColors.highlight,
		fontFamily: "ComicNeue-Bold",
	},
	searchInput: {
		marginLeft: 8,
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
		flex: 1,
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
});
