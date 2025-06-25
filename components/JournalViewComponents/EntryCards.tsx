import React, { useRef } from "react";
import { Image, StyleSheet, Text, TouchableOpacity, View } from "react-native";
import { DarkColors } from "../../constants/Colors";
import { moodMap } from "../../constants/moodUtils";
import { JournalEntry } from "../../lib/apiGetActions";

interface EntryCardProps {
	entry: JournalEntry;
	index: number;
	onPress: () => void;
	// onOptionsPress: (id: string | number) => void;
}

const EntryCard: React.FC<EntryCardProps> = ({
	entry,
	index,
	onPress,
	// onOptionsPress,
}) => {
	const entryRef = useRef(null);

	return (
		<TouchableOpacity style={styles.entryCard} onPress={onPress} ref={entryRef}>
			<View style={styles.entryRow}>
				<Text style={styles.entryDate}>
					{new Date(entry.dateCreated).toLocaleDateString("en-GB", {
						day: "2-digit",
						month: "long",
						year: "numeric",
					})}
				</Text>

				{/* <TouchableOpacity onPress={() => onOptionsPress(entry.journalEntryId)}>
					<EllipsisVertical size={24} color="#fff" />
				</TouchableOpacity> */}
			</View>

			<View style={styles.entryRow}>
				<View style={{ flex: 1 }}>
					<Text style={styles.entryText} numberOfLines={1}>
						{entry.title}
					</Text>

					{entry.mood && moodMap[entry.mood] && (
						<Text style={styles.moodText}>Mood: {moodMap[entry.mood]}</Text>
					)}
				</View>

				<Image
					source={{
						uri: "https://plus.unsplash.com/premium_photo-1675813860520-5460c6209088?q=80&w=1740&auto=format&fit=crop&ixlib=rb-4.1.0&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D",
					}}
					style={styles.image}
				/>

				{/* <View
					style={[
						styles.dot,
						{ backgroundColor: index % 2 === 0 ? "#66c2a5" : "#6A9ED6" },
					]}
				/> */}
			</View>
		</TouchableOpacity>
	);
};

const styles = StyleSheet.create({
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
	moodText: {
		fontSize: 16,
		marginTop: 4,
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Light",
	},
	entryText: {
		color: DarkColors.textPrimary,
		fontFamily: "ComicNeue-Bold",
		fontSize: 18,
		flex: 1,
		marginTop: 6,
	},
	dot: {
		width: 10,
		height: 10,
		borderRadius: 5,
		marginLeft: 10,
	},
	image: { resizeMode: "center", width: 120, height: 80, borderRadius: 20 },
});

export default EntryCard;
