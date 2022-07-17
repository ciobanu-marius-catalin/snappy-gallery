import { FC } from "react";
import { Icon } from "../../../icon";

const ImageLoader: FC = () => {
  return (
    <div className="snappy-gallery-lightbox-popup__loader">
      <Icon name="spinner fa-pulse" />
    </div>
  );
};

export { ImageLoader };
