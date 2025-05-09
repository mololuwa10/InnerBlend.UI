import AsyncStorage from "@react-native-async-storage/async-storage";
import Constants from "expo-constants";

export interface Tag {
	tagId: string;
	name: string;
	userId: string;
}

export interface JournalEntryTag {
	journalEntryId: string;
	tagId: string;
	tag: Tag;
}

export interface JournalEntry {
	journalEntryId: string;
	journalId: string;
	title: string;
	content: string;
	dateCreated: string;
	dateModified: string;
	journalEntryTags: JournalEntryTag[];
}

export interface Journal {
	journalId: string;
	journalTitle: string;
	journalDescription: string;
	dateCreated: string;
	dateModified: string;
	userId: string;
	journalEntries: JournalEntry[];
}

const ip =
	Constants.expoConfig?.extra?.apiHost ||
	Constants.manifest2?.extra?.apiHost ||
	"localhost";

export const getJournals = async (): Promise<Journal[]> => {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) throw new Error("No token found");

		const response = await fetch(`http://${ip}:5183/api/journal`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const errorMsg = await response.text();
			console.error("Failed to fetch journals:", errorMsg);
			return [];
		}

		const raw = await response.json();

		// Extract actual journals from $values array
		const data: Journal[] = raw?.$values || [];
		return data;
	} catch (error: any) {
		console.error("There was an error getting journals: ", error);
		return [];
	}
};
