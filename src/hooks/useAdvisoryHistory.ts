import { useState, useCallback, useEffect } from 'react';
import type { AdvisoryRecord } from '@/types';
import {
  loadHistory,
  saveAdvisory,
  deleteAdvisory,
} from '@/services/historyService';

export function useAdvisoryHistory() {
  const [history, setHistory] = useState<AdvisoryRecord[]>([]);

  useEffect(() => {
    setHistory(loadHistory());
  }, []);

  const addRecord = useCallback((record: AdvisoryRecord) => {
    setHistory(saveAdvisory(record));
  }, []);

  const removeRecord = useCallback((id: string) => {
    setHistory(deleteAdvisory(id));
  }, []);

  return { history, addRecord, removeRecord };
}
