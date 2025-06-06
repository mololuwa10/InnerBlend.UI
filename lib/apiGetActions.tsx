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

const ip =
	Constants.expoConfig?.extra?.apiHost ||
	Constants.manifest2?.extra?.apiHost ||
	"localhost";

// JOURNAL =================================================================================================
// GET ALL JOURNALS
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

// GET ALL JOURNALS BY ID
export const getJournalById = async (
	journalId: string
): Promise<Journal | null> => {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) throw new Error("No token found");

		const response = await fetch(`http://${ip}:5183/api/journal/${journalId}`, {
			method: "GET",
			headers: {
				Authorization: `Bearer ${token}`,
				"Content-Type": "application/json",
			},
		});

		if (!response.ok) {
			const errorMsg = await response.text();
			console.error("Failed to fetch journal by id:", errorMsg);
			return null;
		}

		const raw = await response.json();
		const data: Journal | null = raw || null;
		return data;
	} catch (error: any) {
		console.error("There was an error getting journal by id: ", error);
		return null;
	}
};
// =============================================================================

// Journal Entries ==============================================================
// Get Journal Entry by Entry Id
export const getJournalEntryById = async (
	entryId: string
): Promise<JournalEntry | null> => {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) throw new Error("No token found");

		const response = await fetch(
			`http://${ip}:5183/api/journalentry/${entryId}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			const errorMsg = await response.text();
			console.error("Failed to fetch journal entry by id:", errorMsg);
			return null;
		}

		const data: JournalEntry = await response.json();
		return data;
	} catch (error: any) {
		console.error("There was an error getting journal entry by id: ", error);
		return null;
	}
};

// Get Journal Entries by Journal Id
export const getJournalEntriesByJournalId = async (
	journalId: string
): Promise<{ $id: string; $values: JournalEntry[] } | null> => {
	try {
		const token = await AsyncStorage.getItem("token");
		if (!token) throw new Error("No token found");

		const response = await fetch(
			`http://${ip}:5183/api/journalentry/journal/${journalId}`,
			{
				method: "GET",
				headers: {
					Authorization: `Bearer ${token}`,
					"Content-Type": "application/json",
				},
			}
		);

		if (!response.ok) {
			const errorMsg = await response.text();
			console.error("Failed to fetch journal entry by journal id:", errorMsg);
			return null;
		}

		const raw = await response.json();
		const data: { $id: string; $values: JournalEntry[] } | null =
			raw && raw.$id && raw.$values ? raw : null;
		return data;
	} catch (error: any) {
		console.error(
			"There was an error getting journal entry by journal id: ",
			error
		);
		return null;
	}
};
