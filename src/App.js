import { photos } from "./data/photos";
import { Gallery } from "./components";
import "./styles.scss";

export default function App() {
  return <Gallery photos={photos} />;
}
