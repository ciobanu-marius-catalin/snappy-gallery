import { forwardRef, useMemo, useState } from "react";

// @ts-ignore
const _Image = (
  { photo, sizes = "100vw", lazyLoad = false, ...props },
  ref
) => {
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
    commonProps["data-src"] = commonProps.src;
    // @ts-ignore
    delete commonProps.src;

    commonProps["data-srcset"] = commonProps.srcSet;
    delete commonProps.srcSet;
  }
  // @ts-ignore
  return (
    <img
      ref={ref}
      alt={`Taken by ${photo.user.name}`}
      sizes={sizes}
      onLoad={() => setImageLoad(true)}
      {...commonProps}
      {...props}
    />
  );
};

const Image = forwardRef(_Image);

export { Image };
