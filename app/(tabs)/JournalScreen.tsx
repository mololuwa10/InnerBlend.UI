import { Ionicons } from "@expo/vector-icons";
import { useFocusEffect, useNavigation } from "@react-navigation/native";
import { StackNavigationProp } from "@react-navigation/stack";
import { Plus } from "lucide-react-native";
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
				{/* New Entry Button */}

				<TouchableOpacity
					style={styles.newEntryButton}
					// onPress={() => setShowCreateJournalModal(true)}
				>
					                 
					<View style={styles.newEntryWrapper}>
						                     
						<Plus color={DarkColors.textPrimary} size={22} />                   
					</View>{" "}
					           
				</TouchableOpacity>
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
	newEntryButton: {
		position: "absolute",
		bottom: 20,
		right: 20,
		backgroundColor: DarkColors.buttonColor,
		borderRadius: 40,
		paddingVertical: 20,
		paddingHorizontal: 20,
	},
	newEntryWrapper: {
		flexDirection: "row",
		alignItems: "center",
	},
	newEntryText: {
		color: DarkColors.textPrimary,
		fontSize: 16,
		fontFamily: "ComicNeue-Bold",
	},
});

// <div class="flex items-center gap-4 bg-slate-50 px-4 min-h-[72px] py-2">
// 	         {" "}
// 	<div
// 		class="text-[#0d141c] flex items-center justify-center rounded-lg bg-[#e7edf4] shrink-0 size-12"
// 		data-icon="File"
// 		data-size="24px"
// 		data-weight="regular"
// 	>
// 		           {" "}
// 		<svg
// 			xmlns="http://www.w3.org/2000/svg"
// 			width="24px"
// 			height="24px"
// 			fill="currentColor"
// 			viewBox="0 0 256 256"
// 		>
// 			             {" "}
// 			<path d="M213.66,82.34l-56-56A8,8,0,0,0,152,24H56A16,16,0,0,0,40,40V216a16,16,0,0,0,16,16H200a16,16,0,0,0,16-16V88A8,8,0,0,0,213.66,82.34ZM160,51.31,188.69,80H160ZM200,216H56V40h88V88a8,8,0,0,0,8,8h48V216Z"></path>
// 			           {" "}
// 		</svg>
// 		         {" "}
// 	</div>
// 	         {" "}
// 	<div class="flex flex-col justify-center">
// 		           {" "}
// 		<p class="text-[#0d141c] text-base font-medium leading-normal line-clamp-1">
// 			My Trip to the Mountains
// 		</p>
// 		           {" "}
// 		<p class="text-[#49739c] text-sm font-normal leading-normal line-clamp-2">
// 			July 20, 2024
// 		</p>
// 		         {" "}
// 	</div>
// 	       {" "}
// </div>;
