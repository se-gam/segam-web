import { useEffect, useRef } from 'react';

export default function useViewportResize() {
  const divRef = useRef<HTMLDivElement>(null);
  const focusRef = useRef<HTMLDivElement>(null);
  useEffect(() => {
    const handleVisualViewPortResize = () => {
      const currentVisualViewport = Number(window.visualViewport?.height);
      if (divRef.current) {
        if (divRef.current.style.height <= `${currentVisualViewport}px`) {
          divRef.current.style.height = `${currentVisualViewport}px`;
          return;
        }
        divRef.current.style.height = `${currentVisualViewport}px`;
        if (focusRef.current) {
          focusRef.current?.scrollIntoView({ behavior: 'smooth' });
        }
      }
    };
    handleVisualViewPortResize();
    if (window.visualViewport) {
      window.visualViewport.onresize = handleVisualViewPortResize;
    }

    return () => {
      if (window.visualViewport) {
        window.visualViewport.onresize = null;
      }
    };
  }, [divRef, focusRef]);
  return { divRef, focusRef };
}
