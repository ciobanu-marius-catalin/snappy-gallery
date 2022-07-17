import { FC, useCallback, useMemo, useState } from "react";
import { LightboxPopup, Image } from "./components";

interface PropsInterface {
  photos: any[];
}

const Gallery: FC<PropsInterface> = ({ photos }) => {
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
      "(min-width: 992px) 170px",
      "(min-width: 768px) 110px",
      "(min-width: 576px) 220px",
      "200px",
    ].join(",");
  }, []);

  return (
    <div className="snappy-gallery">
      <div className="container">
        <div className="row">
          {photos.map((p, index) => (
            <div
              data-gallery-photo-id={p.id}
              className="display-flex col-lg-2 col-md-3 col-sm-6 col-12"
              key={p.id}
            >
              <button
                className="btn"
                onClick={() => {
                  selectPhoto(index);
                }}
              >
                <Image photo={p} sizes={sizes} />
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
};

export { Gallery };
