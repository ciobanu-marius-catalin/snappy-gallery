enum ImageSize {
  RAW = "raw",
  FULL = "full",
  REGULAR = "regular",
  SMALL = "small",
  THUMB = "thumb",
}

export type URLType = {
  [key in ImageSize]: string;
};

export interface SrcSetType {
  size: ImageSize;
  url: string;
}

export interface Photo {
  urls: URLType;
  aspectRatio: number;
  width: number;
  height: number;
  srcSet: SrcSetType[];
  [key: string]: any;
}
