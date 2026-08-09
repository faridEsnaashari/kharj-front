import { useEffect, useRef } from 'react';

export const useIntersectionLoadMore = ({ onLoadMore, hasMore, loading }) => {
  const sentinelRef = useRef(null);

  useEffect(() => {
    if (!hasMore || loading) {
      return undefined;
    }

    const node = sentinelRef.current;

    if (!node) {
      return undefined;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting) {
          onLoadMore();
        }
      },
      { rootMargin: '200px' },
    );

    observer.observe(node);

    return () => {
      observer.disconnect();
    };
  }, [onLoadMore, hasMore, loading]);

  return sentinelRef;
};
