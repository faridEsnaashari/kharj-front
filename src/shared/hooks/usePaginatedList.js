import { useCallback, useRef, useState } from 'react';

const getErrorMessage = (err, fallback) =>
  err.response?.data?.message || err.message || fallback;

export const usePaginatedList = (fetchPage, size = 10) => {
  const [rows, setRows] = useState([]);
  const [total, setTotal] = useState(0);
  const [page, setPage] = useState(0);
  const [loading, setLoading] = useState(true);
  const [loadingMore, setLoadingMore] = useState(false);
  const [error, setError] = useState(null);
  const requestId = useRef(0);

  const loadPage = useCallback(
    async (pageNumber, replace) => {
      const currentRequestId = requestId.current + 1;
      requestId.current = currentRequestId;

      if (replace) {
        setLoading(true);
      } else {
        setLoadingMore(true);
      }

      try {
        const data = await fetchPage({ page: pageNumber, size });

        if (currentRequestId !== requestId.current) {
          return;
        }

        setRows((current) =>
          replace ? data.rows || [] : [...current, ...(data.rows || [])],
        );
        setTotal(data.paginationData?.total ?? 0);
        setPage(pageNumber);
        setError(null);
      } catch (err) {
        if (currentRequestId === requestId.current) {
          setError(getErrorMessage(err, 'Failed to load the list'));
        }
      } finally {
        if (currentRequestId === requestId.current) {
          setLoading(false);
          setLoadingMore(false);
        }
      }
    },
    [fetchPage, size],
  );

  const reload = useCallback(() => {
    loadPage(1, true);
  }, [loadPage]);

  const loadMore = useCallback(() => {
    if (loading || loadingMore || rows.length >= total) {
      return;
    }

    loadPage(page + 1, false);
  }, [loading, loadingMore, rows.length, total, page, loadPage]);

  return {
    rows,
    total,
    loading,
    loadingMore,
    error,
    hasMore: rows.length < total,
    reload,
    loadMore,
  };
};
