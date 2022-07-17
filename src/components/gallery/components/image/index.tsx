import { FC, memo, useMemo, useState } from "react";
import { Photo } from "../../../../data/photos/types";

interface ImageProps {
  photo: Photo;
  sizes?: string;
  lazyLoad?: boolean;
  [key: string]: any;
}

const Image: FC<ImageProps> = memo(
  ({ photo, sizes = "100vw", lazyLoad = false, ...props }) => {
    const [imageLoaded, setImageLoad] = useState(false);

    let srcSetValue = useMemo(() => {
      return photo?.srcSet
        ?.map(({ url, size }) => {
          return `${url} ${size}w`;
        })
        .join(",");
    }, [photo]);

    let commonProps = {
      src: photo.urls["regular"],
      srcSet: srcSetValue,
    };
    if (imageLoaded) {
      commonProps["data-loaded"] = true;
    }
    if (lazyLoad) {
      try {
        commonProps["data-src"] = commonProps.src;
        // @ts-ignore
        delete commonProps.src;

        commonProps["data-srcset"] = commonProps.srcSet;
        // @ts-ignore
        delete commonProps.srcSet;
      } catch (e) {
        console.error(e);
      }
    }
    // @ts-ignore
    return (
      <img
        alt={`Taken by ${photo.user.name}`}
        sizes={sizes}
        onLoad={() => setImageLoad(true)}
        {...commonProps}
        {...props}
      />
    );
  }
);

export { Image };
