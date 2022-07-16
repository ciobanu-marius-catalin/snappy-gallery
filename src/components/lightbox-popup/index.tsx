import { createPortal } from "react-dom";
import { FC, MouseEvent, useEffect, useMemo, useRef } from "react";
import { Image } from "../image";

interface PropsInterface {
  photo: any;
  onClose: (event: MouseEvent) => void;
}

const LightboxPopup: FC<PropsInterface> = ({ photo, onClose }) => {
  let ref = useRef();
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
      <button
        className="snappy-gallery-lightbox-popup__close"
        onClick={onClose}
      >
        X
      </button>
      <Image ref={ref} photo={photo} sizes={sizes} />
    </div>,
    document?.body
  );
};

export { LightboxPopup };
