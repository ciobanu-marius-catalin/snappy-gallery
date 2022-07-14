import { FC, useCallback, useState } from "react";
import { LightboxPopup } from "../lightbox-popup";

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

  return (
    <div className="App">
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
                <img src={p.urls[size]} alt={`Taken by ${p.user.name}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
      {selected && <LightboxPopup value={selected} onClose={closeLightbox} />}
    </div>
  );
};

export { Gallery };
