import type { AdvisoryRecord } from '@/types';
import { generateId } from '@/utils/format';

const STORAGE_KEY = 'agrishield-advisory-history';

export function loadHistory(): AdvisoryRecord[] {
  try {
    const raw = localStorage.getItem(STORAGE_KEY);
    if (!raw) return [];
    const parsed = JSON.parse(raw);
    if (!Array.isArray(parsed)) return [];
    return parsed;
  } catch {
    return [];
  }
}

export function saveAdvisory(record: AdvisoryRecord): AdvisoryRecord[] {
  const history = loadHistory();
  const updated = [record, ...history].slice(0, 50);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // localStorage may be full or unavailable
  }
  return updated;
}

export function deleteAdvisory(id: string): AdvisoryRecord[] {
  const history = loadHistory();
  const updated = history.filter((r) => r.id !== id);
  try {
    localStorage.setItem(STORAGE_KEY, JSON.stringify(updated));
  } catch {
    // ignore
  }
  return updated;
}

export function createAdvisoryRecord(
  partial: Omit<AdvisoryRecord, 'id' | 'date'>
): AdvisoryRecord {
  return {
    ...partial,
    id: generateId(),
    date: new Date().toISOString(),
  };
}
