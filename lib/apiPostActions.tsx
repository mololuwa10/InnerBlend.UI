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
	mood: "VerySad" | "Sad" | "Neutral" | "Happy" | "VeryHappy";
	location: string;
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

export interface JournalEntryInput {
	title: string;
	content: string;
	tags?: string[];
	mood?: "VerySad" | "Sad" | "Neutral" | "Happy" | "VeryHappy";
	location?: string;
}

export interface JournalInput {
	journalTitle: string;
	journalDescription: string;
}

const ip =
	Constants.expoConfig?.extra?.apiHost ||
	Constants.manifest2?.extra?.apiHost ||
	"localhost";
// JOURNAL ======================================================================
// Create Journal // POST: api/journal
export const createJournal = async (
	journalData: JournalInput
): Promise<boolean | null> => {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) throw new Error("No token found");

		const response = await fetch(`http://${ip}:5183/api/journal`, {
			method: "POST",
			headers: {
				"Content-Type": "application/json",
				Authorization: `Bearer ${token}`,
			},
			body: JSON.stringify(journalData),
		});

		if (!response.ok) {
			const errorMsg = await response.text();
			console.error("Failed to create journal:", errorMsg);
			return false;
		}

		const data = await response.json();
		return data;
	} catch (error: any) {
		console.error("There was an error creating journal: ", error);
		return false;
	}
};
// ==============================================================================

// JOURNAL ENTRIES ==============================================================
// Create Journal Entry // POST: api/journalentry/journalId
export const createJournalEntry = async (
	journalId: string,
	entryData: JournalEntryInput
): Promise<boolean | null> => {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) throw new Error("No token found");

		const response = await fetch(
			`http://${ip}:5183/api/journalentry/journal/${journalId}`,
			{
				method: "POST",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
				body: JSON.stringify(entryData),
			}
		);

		if (!response.ok) {
			const errorMsg = await response.text();
			console.error("Failed to create journal entry:", errorMsg);
			return false;
		}
		return true;
	} catch (error: any) {
		console.error("Error creating journal entry:", error.message);
		return false;
	}
};
