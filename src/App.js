import { photosWithSrcSet } from "./data/photos";
import { Gallery } from "./components";
import "./styles.scss";

/*
   There can be made extra improvements to the applications.
   - We can use a virtual list to only display a set number of elements that are in the viewport.
   - We can add better transition for enter/exit lightbox. To work like the gallery application from android for example
   - In the lightbox we can add a preview list at the bottom that can be scrollable to select images from there
 */
export default function App() {
  return <Gallery photos={photosWithSrcSet} />;
}
