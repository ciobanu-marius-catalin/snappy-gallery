import {
  FC,
  memo,
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
} from "react";
import { LightboxPopup, Image } from "./components";
import { Photo } from "../../data/photos/types";
import { useLazyLoad } from "./use-lazy-load";

interface PropsInterface {
  photos: Photo[];
}

const Gallery: FC<PropsInterface> = memo(({ photos }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const selectPhoto = useCallback(
    (photoIndex) => {
      setSelectedIndex(photoIndex);
    },
    [setSelectedIndex]
  );

  const closeLightbox = useCallback(() => {
    setSelectedIndex(null);
  }, [setSelectedIndex]);

  let sizes = useMemo(() => {
    return [
      "(min-width: 992px) 200px",
      "(min-width: 768px) 170px",
      "(min-width: 576px) 250px",
      "400px",
    ].join(",");
  }, []);

  const { containerRef } = useLazyLoad({ photos });

  if (photos.length === 0) {
    return null;
  }

  // @ts-ignore
  return (
    <div ref={containerRef} className="snappy-gallery">
      <div className="container">
        <div className="snappy-gallery__row">
          {photos.map((p, index) => (
            <div
              data-gallery-photo-id={p.id}
              className="display-flex snappy-gallery__item"
              key={p.id}
            >
              <button
                className="btn"
                onClick={() => {
                  selectPhoto(index);
                }}
                {...getImageHeightStyle(p)}
              >
                <Image photo={p} sizes={sizes} lazyLoad={true} />
              </button>
            </div>
          ))}
        </div>
      </div>
      {selectedIndex !== null && (
        <LightboxPopup
          photos={photos}
          selectedIndex={selectedIndex}
          onClose={closeLightbox}
        />
      )}
    </div>
  );
});

const getImageHeightStyle = (photo) => {
  let aspectRatio = photo?.aspectRatio;
  if (!aspectRatio) {
    return;
  }
  let paddingTop = 100 * aspectRatio;
  let style = {
    paddingTop: `${paddingTop}%`,
  };
  return {
    style,
  };
};

export { Gallery };
