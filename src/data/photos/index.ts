import dogPhotos from "./dog-photos";
import catPhotos from "./cat-photos";
import mountainPhotos from "./mountain-photos";
import billboardPhotos from "./billboard-photos";
import boatPhotos from "./boat-photos";
import otherPhotos from "./other-photos";
import { sizes } from "./sizes";
import differentAspectRatio from "./different-aspect-ratio";
import _ from "lodash";
import { Photo, SrcSetType } from "./types";

const photos = [
  ...differentAspectRatio,
  ...dogPhotos,
  ...catPhotos,
  ...mountainPhotos,
  ...billboardPhotos,
  ...boatPhotos,
  ...otherPhotos,
];

let photosWithSrcSet: Photo[] = photos.map((photo) => {
  let srcSet: SrcSetType[] = [];
  _.each(sizes, (imageSize, sizeName) => {
    let srcSetSize = imageSize === "full" ? photo?.width : imageSize;

    let srcSetObj: SrcSetType = {
      size: srcSetSize,
      url: _.get(photo, ["urls", sizeName]),
    };
    srcSet.push(srcSetObj);
  });
  return {
    ...photo,
    aspectRatio: photo?.height / photo?.width,
    srcSet,
  };
});

//photosWithSrcSet = photosWithSrcSet.filter((image, index) => index < 5);

export { photos, photosWithSrcSet };
