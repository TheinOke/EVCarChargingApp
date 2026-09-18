import { useCallback, useEffect, useState } from 'react';
import * as historyApi from '../api/historyApi.js';

const LIMIT = 10;

export function useChargingHistory() {
  const [page, setPage] = useState(1);
  const [records, setRecords] = useState([]);
  const [total, setTotal] = useState(0);
  const [totalPages, setTotalPages] = useState(1);
  const [status, setStatus] = useState('loading');
  const [error, setError] = useState(null);

  const load = useCallback(async (targetPage) => {
    setStatus('loading');
    setError(null);
    try {
      const result = await historyApi.getHistory({ page: targetPage, limit: LIMIT });
      setRecords(result.records);
      setTotal(result.total);
      setTotalPages(result.totalPages);
      setPage(result.page);
      setStatus('success');
    } catch (err) {
      setError(err.message);
      setStatus('error');
    }
  }, []);

  useEffect(() => {
    load(1);
  }, [load]);

  function goToPage(targetPage) {
    if (targetPage < 1 || targetPage > totalPages) return;
    load(targetPage);
  }

  return {
    records,
    total,
    page,
    totalPages,
    status,
    error,
    goToPage,
    retry: () => load(page),
  };
}
