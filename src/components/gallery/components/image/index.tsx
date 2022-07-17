import { forwardRef, useMemo } from "react";

// @ts-ignore
const _Image = ({ photo, sizes = "100vw", className = "" }, ref) => {
  let srcSetValue = useMemo(() => {
    return photo?.srcSet
      ?.map(({ url, size }) => {
        return `${url} ${size}w`;
      })
      .join(",");
  }, [photo]);

  let commonProps = {};
  if (className) {
    // @ts-ignore
    commonProps.className = className;
  }
  // @ts-ignore
  return (
    <img
      ref={ref}
      src={photo.urls["regular"]}
      alt={`Taken by ${photo.user.name}`}
      srcSet={srcSetValue}
      sizes={sizes}
      {...commonProps}
    />
  );
};

const Image = forwardRef(_Image);

export { Image };