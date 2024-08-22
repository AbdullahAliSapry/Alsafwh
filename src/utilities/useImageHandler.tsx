import { useState, useEffect } from "react";

const useImageHandler = (initialSrc: string, fallbackSrc: string) => {
  const [src, setSrc] = useState(initialSrc);

  const handleError = () => {
    if (src !== fallbackSrc) {
      setSrc(fallbackSrc);
    }
  };

  useEffect(() => {
    setSrc(initialSrc);
  }, [initialSrc]);

  return [src, handleError] as const;
};

export default useImageHandler;
