import { FC, useCallback, useMemo, useState } from "react";
import { LightboxPopup } from "../lightbox-popup";
import { Image } from "../image";

interface PropsInterface {
  photos: any[];
}

const Gallery: FC<PropsInterface> = ({ photos }) => {
  const [size, setSize] = useState("thumb");
  const [selected, setSelected] = useState(null);

  const selectPhoto = useCallback(
    (photo) => {
      setSelected(photo);
    },
    [setSelected]
  );

  const closeLightbox = useCallback(() => {
    setSelected(null);
  }, [setSelected]);

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
      <h3>Photos courtesy of Unsplash and it's users</h3>
      <div className="container">
        <div className="row">
          {photos.map((p) => (
            <div
              className="display-flex col-lg-2 col-md-3 col-sm-6 col-12"
              key={p.id}
            >
              <button
                className="btn"
                onClick={() => {
                  selectPhoto(p);
                }}
              >
                <Image photo={p} sizes={sizes} />
              </button>
            </div>
          ))}
        </div>
      </div>
      {selected && <LightboxPopup photo={selected} onClose={closeLightbox} />}
    </div>
  );
};

export { Gallery };
