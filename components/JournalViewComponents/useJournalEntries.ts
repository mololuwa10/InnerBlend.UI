import { useCallback, useState } from 'react';
import { getJournalEntriesByJournalId, JournalEntry } from '../../lib/apiGetActions';

export const useJournalEntries = (journalId: string |string[] | number | undefined) => {
  const [journalEntries, setJournalEntries] = useState<JournalEntry[]>([]);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  const fetchEntries = useCallback(async () => {
    if (!journalId) return;

    setIsLoading(true);
    setError(null);

    try {
      const result = await getJournalEntriesByJournalId(journalId.toString());

      if (result?.$values?.length) {
        const sorted = result.$values.sort(
          (a, b) => new Date(b.dateCreated).getTime() - new Date(a.dateCreated).getTime()
        );
        setJournalEntries(sorted);
      } else {
        setJournalEntries([]);
      }
    } catch (err) {
      setError('Failed to fetch journal entries');
      console.error('Error fetching journal entries:', err);
    } finally {
      setIsLoading(false);
    }
  }, [journalId]);

  return { journalEntries, isLoading, error, fetchEntries };
};