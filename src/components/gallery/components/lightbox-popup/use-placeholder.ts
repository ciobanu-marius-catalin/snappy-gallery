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
    //Use a timeout to give the browser a little time by moving the code at the end of the event loop to not show the placeholder
    //for a single frame
    // @ts-ignore
    checkTimeoutRef.current = setTimeout(() => {
      let image = imageRef.current;
      if (!image) {
        return;
      }
      if (!image.complete) {
        setShowLoader(true);
      }
    }, 20);

    return () => {
      clearTimeout(checkTimeoutRef.current);
    };
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
