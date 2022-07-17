import { createPortal } from "react-dom";
import { FC, MouseEvent, useCallback, useEffect, useMemo, useRef } from "react";
import { Image } from "../image";
import { Icon } from "../../../icon";
import { useGetPhotosData } from "./use-get-photos-data";

interface PropsInterface {
  photos: any[];
  selectedIndex: number;
  onClose: (event: MouseEvent) => void;
}

const LightboxPopup: FC<PropsInterface> = ({
  photos,
  selectedIndex,
  onClose,
}) => {
  const { currentPhoto, previousPhoto, nextPhoto, onNext, onPrevious } =
    useGetPhotosData({ photos, selectedIndex });

  const onKeyUp = useCallback(
    (e) => {
      let leftKeyCode = 37;
      let rightKeyCode = 39;
      switch (e.keyCode) {
        case leftKeyCode:
          onPrevious();
          break;
        case rightKeyCode:
          onNext();
          break;
      }
    },
    [onNext, onPrevious]
  );

  useEffect(() => {
    window.addEventListener("keyup", onKeyUp);

    return () => {
      window.removeEventListener("keyup", onKeyUp);
    };
  }, [onKeyUp]);

  let sizes = useMemo(() => {
    return [
      "(min-width: 2000px) 2000px",
      "(min-width: 992px) 1080px",
      "(min-width: 300px) 400px",
      "80vw",
    ].join(",");
  }, []);

  return createPortal(
    <div className="snappy-gallery-lightbox-popup">
      <div className="snappy-gallery-lightbox-popup__preload-container snappy-gallery-lightbox-popup">
        {previousPhoto && (
          <Image
            photo={previousPhoto}
            sizes={sizes}
            className="snappy-gallery-lightbox-popup__previous-img"
          />
        )}
      </div>
      <div className="snappy-gallery-lightbox-popup__preload-container snappy-gallery-lightbox-popup">
        {nextPhoto && (
          <Image
            photo={nextPhoto}
            sizes={sizes}
            className="snappy-gallery-lightbox-popup__next-img"
          />
        )}
      </div>

      <Image photo={currentPhoto} sizes={sizes} />

      <button
        className="snappy-gallery-lightbox-popup__action-button snappy-gallery-lightbox-popup__close"
        onClick={onClose}
      >
        <Icon name="times" />
      </button>
      <button
        className="snappy-gallery-lightbox-popup__action-button
        snappy-gallery-lightbox-popup__arrow
        snappy-gallery-lightbox-popup__arrow--left"
        onClick={onPrevious}
      >
        <Icon name="arrow-left" />
      </button>
      <button
        className="snappy-gallery-lightbox-popup__action-button
        snappy-gallery-lightbox-popup__arrow
        snappy-gallery-lightbox-popup__arrow--right"
        onClick={onNext}
      >
        <Icon name="arrow-right" />
      </button>
    </div>,
    document?.body
  );
};

export { LightboxPopup };
