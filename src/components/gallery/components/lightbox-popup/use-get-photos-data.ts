import { useCallback, useMemo, useState } from "react";

const useGetPhotosData = ({ photos, selectedIndex }) => {
  const [internalSelectedIndex, setInternalSelectedIndex] =
    useState(selectedIndex);
  const currentPhoto = photos[internalSelectedIndex];

  const onGetPreviousIndex = useCallback(() => {
    if (photos.length < 2) {
      return null;
    }
    if (internalSelectedIndex === 0) {
      return photos.length - 1;
    }
    return internalSelectedIndex - 1;
  }, [internalSelectedIndex, photos]);

  const onPrevious = useCallback(() => {
    let previousIndex = onGetPreviousIndex();

    if (previousIndex === null) {
      return;
    }

    setInternalSelectedIndex(previousIndex);
  }, [onGetPreviousIndex, setInternalSelectedIndex]);

  const onGetNextIndex = useCallback(() => {
    if (photos.length < 2) {
      return null;
    }
    if (internalSelectedIndex === photos.length - 1) {
      return 0;
    }
    return internalSelectedIndex + 1;
  }, [internalSelectedIndex, photos]);

  const onNext = useCallback(() => {
    let nextIndex = onGetNextIndex();

    if (nextIndex === null) {
      return;
    }

    setInternalSelectedIndex(nextIndex);
  }, [onGetNextIndex, setInternalSelectedIndex]);

  const previousPhoto = useMemo(() => {
    let previousIndex = onGetPreviousIndex();

    if (previousIndex === null) {
      return;
    }

    return photos[previousIndex];
  }, [onGetPreviousIndex, photos]);

  const nextPhoto = useMemo(() => {
    let nextIndex = onGetNextIndex();
    if (nextIndex === null) {
      return;
    }
    return photos[nextIndex];
  }, [onGetNextIndex, photos]);

  return {
    currentPhoto,
    previousPhoto,
    nextPhoto,
    onNext,
    onPrevious,
  };
};

export { useGetPhotosData };
