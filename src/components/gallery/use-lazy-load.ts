import { useEffect, useLayoutEffect, useRef } from "react";

const useLazyLoad = ({ photos }) => {
  const containerRef = useRef<HTMLDivElement>(null);

  useLayoutEffect(() => {
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
    let images = containerRef.current?.querySelectorAll("img");
    if (images) {
      images.forEach((img) => observer.observe(img));
    }

    return () => {
      observer.disconnect();
    };
  }, [photos]);

  return { containerRef };
};

export { useLazyLoad };
