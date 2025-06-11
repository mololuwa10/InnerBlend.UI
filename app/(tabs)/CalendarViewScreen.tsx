/* eslint-disable @typescript-eslint/no-unused-vars */
import { Ionicons } from "@expo/vector-icons";
import { Plus } from "lucide-react-native";
import React, { useState } from "react";
import {
	Dimensions,
	StyleSheet,
	Text,
	TextInput,
	TouchableOpacity,
	View,
} from "react-native";
import { CalendarList } from "react-native-calendars";
import { DarkColors } from "../../constants/Colors";

const { width } = Dimensions.get("window");

export default function CalendarViewScreen() {
	const [selectedDate, setSelectedDate] = useState(
		new Date().toISOString().split("T")[0]
	);
	const [showSearch, setShowSearch] = useState(true);
	const [scrollY, setScrollY] = useState(0);

	const renderEntry = ({ item }: { item: { id: number; text: string } }) => (
		<View style={styles.entryCard}>
			<Text style={styles.entryText}>{item.text}</Text>
		</View>
	);

	return (
		<>
			<View style={styles.container}>
				<View style={styles.header}>
					<Text style={styles.appName}>Calender</Text>

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

				<CalendarList
					current={new Date().toISOString().split("T")[0]}
					horizontal={false}
					scrollEnabled
					showScrollIndicator={true}
					onDayPress={(day) => setSelectedDate(day.dateString)}
					markedDates={{
						[selectedDate]: {
							selected: true,
							selectedColor: DarkColors.accent,
							marked: true,
							dotColor: DarkColors.highlight,
						},
					}}
					// onScroll={(e) => {
					// 	const currentOffset = e.nativeEvent.contentOffset.y;
					// 	const goingDown = currentOffset > scrollY;
					// 	setShowSearch(!goingDown);
					// 	setScrollY(currentOffset);
					// }}
					// scrollEventThrottle={16}
					theme={{
						backgroundColor: DarkColors.background,
						calendarBackground: DarkColors.background,
						textSectionTitleColor: DarkColors.accent,
						dayTextColor: DarkColors.textPrimary,
						monthTextColor: DarkColors.highlight,
						selectedDayTextColor: DarkColors.textPrimary,
						todayTextColor: DarkColors.highlight,
						textMonthFontFamily: "ComicNeue-Bold",
						textDayFontFamily: "ComicNeue-Regular",
						textDayHeaderFontFamily: "ComicNeue-Regular",
						arrowColor: DarkColors.highlight,
					}}
					renderHeader={(date) => {
						const header = new Date(date).toLocaleDateString("en-US", {
							month: "long",
							year: "numeric",
						});
						return <Text style={styles.monthHeader}>{header}</Text>;
					}}
					// style={styles.calendar}
				/>

				{/* Floating Buttons */}
				<View style={styles.fabContainer}>
					<TouchableOpacity style={styles.fabSecondary}>
						<Ionicons
							name="calendar-outline"
							size={20}
							color={DarkColors.textPrimary}
						/>
					</TouchableOpacity>

					<TouchableOpacity style={styles.fabPrimary}>
						<View style={styles.newEntryWrapper}>
							<Plus color={DarkColors.textPrimary} size={22} />
							<Text style={styles.newEntryText}>New Entry</Text>
						</View>
					</TouchableOpacity>
				</View>
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
	// calendar: {
	// 	// height: 370,
	// },
	monthHeader: {
		color: DarkColors.highlight,
		fontSize: 17,
		textAlign: "center",
		marginVertical: 10,
		fontFamily: "ComicNeue-Bold",
	},
	header: {
		flexDirection: "row",
		alignItems: "center",
		justifyContent: "space-between",
		marginBottom: 20,
		paddingHorizontal: 20,
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
	heading: {
		color: DarkColors.textPrimary,
		fontSize: 18,
		fontFamily: "ComicNeue-Bold",
		paddingHorizontal: 20,
		marginVertical: 10,
	},
	entryCard: {
		backgroundColor: "#2A2A33",
		marginHorizontal: 20,
		marginVertical: 8,
		borderRadius: 12,
		padding: 16,
	},
	entryText: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Regular",
	},
	emptyText: {
		color: DarkColors.accent,
		fontStyle: "italic",
		fontFamily: "ComicNeue-Regular",
		textAlign: "center",
		marginTop: 20,
	},
	fabContainer: {
		position: "absolute",
		bottom: 10,
		right: 20,
		alignItems: "center",
	},
	fabPrimary: {
		backgroundColor: DarkColors.buttonColor,
		borderRadius: 30,
		paddingVertical: 20,
		paddingHorizontal: 24,
		right: -10,
		alignItems: "center",
		justifyContent: "center",
	},
	fabSecondary: {
		backgroundColor: "#2A2A33",
		borderRadius: 20,
		width: 50,
		height: 50,
		left: 50,
		alignItems: "center",
		justifyContent: "center",
		marginBottom: 10,
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
