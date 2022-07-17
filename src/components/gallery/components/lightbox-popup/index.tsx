import { createPortal } from "react-dom";
import {
  FC,
  memo,
  MouseEvent,
  useCallback,
  useEffect,
  useLayoutEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { Image } from "../image";
import { Icon } from "../../../icon";
import { useGetPhotosData } from "./use-get-photos-data";
import { Photo } from "../../../../data/photos/types";
import { ImageLoader } from "./image-loader";
import { useKeyboardNavigation } from "./use-keyboard-navigation";
import { usePlaceholder } from "./use-placeholder";

interface PropsInterface {
  photos: Photo[];
  selectedIndex: number;
  onClose: (event?: MouseEvent) => void;
}

const LightboxPopup: FC<PropsInterface> = memo(
  ({ photos, selectedIndex, onClose }) => {
    const [startExitAnimation, setStartExitAnimation] = useState(false);

    const { currentPhoto, previousPhoto, nextPhoto, onNext, onPrevious } =
      useGetPhotosData({ photos, selectedIndex });

    useKeyboardNavigation({
      onPrevious,
      onNext,
    });

    const { imageRef, onImageLoad, showLoader } = usePlaceholder({
      currentPhoto,
    });

    let sizes = useMemo(() => {
      return [
        "(min-width: 2000px) 2000px",
        "(min-width: 768px) 1080px",
        "(min-width: 300px) 400px",
        "200px",
      ].join(",");
    }, []);

    let rootClassName = useMemo(() => {
      let rootClassNameArray = ["snappy-gallery-lightbox-popup"];
      if (showLoader) {
        rootClassNameArray.push("snappy-gallery-lightbox-popup--show-loader");
      }

      if (startExitAnimation) {
        rootClassNameArray.push(
          "snappy-gallery-lightbox-popup--exit-animation"
        );
      }

      return rootClassNameArray.join(" ");
    }, [showLoader, startExitAnimation]);

    const onStartExitAnimation = () => {
      setStartExitAnimation(true);
    };

    const onAnimationEnd = (e) => {
      console.log(e);
      onClose();
    };

    let rootAttributes = {};
    if (startExitAnimation) {
      // @ts-ignore
      rootAttributes.onAnimationEnd = onAnimationEnd;
    }

    return createPortal(
      <div className={rootClassName} {...rootAttributes}>
        {showLoader && <ImageLoader />}
        <Image ref={imageRef} photo={currentPhoto} sizes={sizes} />

        <div className="snappy-gallery-lightbox-popup__preload-container snappy-gallery-lightbox-popup">
          {previousPhoto !== null && (
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
              onLoad={onImageLoad}
              photo={nextPhoto}
              sizes={sizes}
              className="snappy-gallery-lightbox-popup__next-img"
            />
          )}
        </div>

        <button
          className="snappy-gallery-lightbox-popup__action-button snappy-gallery-lightbox-popup__close"
          onClick={onStartExitAnimation}
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
  }
);

export { LightboxPopup };
