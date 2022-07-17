import { useCallback, useMemo, useState } from "react";
import _ from "lodash";
import { Photo } from "../../../../data/photos/types";

interface UseGetPhotosDataInterface {
  photos: Photo[];
  selectedIndex: number;
}

interface PhotosData {
  currentPhoto: Photo;
  previousPhoto: Photo | null;
  nextPhoto: Photo | null;
  onNext: () => void;
  onPrevious: () => void;
}

const useGetPhotosData = ({
  photos,
  selectedIndex,
}: UseGetPhotosDataInterface): PhotosData => {
  const [internalSelectedIndex, setInternalSelectedIndex] =
    useState(selectedIndex);
  const currentPhoto: Photo = photos[internalSelectedIndex];

  const updateScrollPosition = useCallback(
    (newIndex) => {
      let photo = _.get(photos, [newIndex]);
      if (!photo) {
        return;
      }
      let photoId = photo?.id;
      let node = document.querySelector(`[data-gallery-photo-id="${photoId}"]`);
      if (!node) {
        return;
      }
      //only scroll if element is not in viewport
      if (!isElementInViewport(node)) {
        node.scrollIntoView({
          block: "end",
        });
      }
    },
    [photos]
  );

  const setNewSelectedIndex = useCallback(
    (newIndex) => {
      setInternalSelectedIndex(newIndex);
      updateScrollPosition(newIndex);
    },
    [setInternalSelectedIndex, updateScrollPosition]
  );

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

    setNewSelectedIndex(previousIndex);
  }, [onGetPreviousIndex, setNewSelectedIndex]);

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
      return null;
    }

    setNewSelectedIndex(nextIndex);
  }, [onGetNextIndex, setNewSelectedIndex]);

  const previousPhoto = useMemo(() => {
    let previousIndex = onGetPreviousIndex();

    if (previousIndex === null) {
      return null;
    }

    return photos[previousIndex];
  }, [onGetPreviousIndex, photos]);

  const nextPhoto = useMemo(() => {
    let nextIndex = onGetNextIndex();
    if (nextIndex === null) {
      return null;
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

function isElementInViewport(el) {
  let rect = el.getBoundingClientRect();

  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <=
      (window.innerHeight ||
        document.documentElement.clientHeight) /* or $(window).height() */ &&
    rect.right <=
      (window.innerWidth ||
        document.documentElement.clientWidth) /* or $(window).width() */
  );
}

export { useGetPhotosData };
