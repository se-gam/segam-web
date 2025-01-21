import { useEffect, useRef } from 'react';

interface UseInfiniteScrollProps {
  onIntersect: () => void;
  threshold?: number;
  enabled?: boolean;
}

const useInfiniteScroll = ({
  onIntersect,
  threshold = 1.0,
  enabled = true,
}: UseInfiniteScrollProps) => {
  const observerRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const observer = new IntersectionObserver(
      (entries) => {
        if (entries[0].isIntersecting && enabled) {
          onIntersect();
        }
      },
      { threshold }
    );

    const currentRef = observerRef.current;
    if (currentRef) {
      observer.observe(currentRef);
    }

    return () => {
      if (currentRef) {
        observer.unobserve(currentRef);
      }
    };
  }, [onIntersect, threshold, enabled]);

  return observerRef;
};

export default useInfiniteScroll;
