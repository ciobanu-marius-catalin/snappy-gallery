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

interface PropsInterface {
  photos: Photo[];
}

const Gallery: FC<PropsInterface> = memo(({ photos }) => {
  const [selectedIndex, setSelectedIndex] = useState(null);

  const ref = useRef<HTMLDivElement>(null);

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

  useEffect(() => {
    let observer = new IntersectionObserver(function (entries) {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          const image = entry.target;

          // @ts-ignore
          image.src = image.dataset.src;
          // @ts-ignore
          image.srcset = image.dataset.srcset;

          observer.unobserve(image);
        }
      });
    });
    // @ts-ignore
    let images = ref.current?.querySelectorAll("img");
    if (images) {
      images.forEach((img) => observer.observe(img));
    }

    return () => {
      observer.disconnect();
    };
  }, [photos]);

  if (photos.length === 0) {
    return null;
  }

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

  // @ts-ignore
  return (
    <div ref={ref} className="snappy-gallery">
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

export { Gallery };
