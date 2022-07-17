import { useCallback, useLayoutEffect, useRef, useState } from "react";
import { Photo } from "../../../../data/photos/types";

interface UsePlaceholderInput {
  currentPhoto: Photo;
}

interface UsePlaceholderOutput {
  showLoader: boolean;
  imageRef: any;
  onImageLoad: () => void;
}

const usePlaceholder = ({
  currentPhoto,
}: UsePlaceholderInput): UsePlaceholderOutput => {
  const [showLoader, setShowLoader] = useState(false);

  const imageRef = useRef<HTMLImageElement>(null);

  const checkTimeoutRef = useRef();
  useLayoutEffect(() => {
    let image = imageRef.current;
    if (!image) {
      return;
    }
    if (!image.complete) {
      setShowLoader(true);
    }
  }, [currentPhoto]);

  const onImageLoad = useCallback(() => {
    if (showLoader) {
      setShowLoader(false);
    }
  }, [setShowLoader, showLoader]);

  return {
    showLoader,
    imageRef,
    onImageLoad,
  };
};

export { usePlaceholder };
