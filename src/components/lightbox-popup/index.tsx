import { createPortal } from "react-dom";
import { FC, MouseEvent } from "react";

interface PropsInterface {
  value: any;
  onClose: (event: MouseEvent) => void;
}

const LightboxPopup: FC<PropsInterface> = ({ value, onClose }) => {
  return createPortal(
    <div className="snappy-gallery-lightbox-popup">
      <button
        className="snappy-gallery-lightbox-popup__close"
        onClick={onClose}
      >
        X
      </button>
      <img src={value.urls["full"]} alt={`Taken by ${value.user.name}`} />
    </div>,
    document?.body
  );
};

export { LightboxPopup };
