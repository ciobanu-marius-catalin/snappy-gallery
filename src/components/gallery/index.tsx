import { FC, useState } from "react";

interface PropsInterface {
  photos: any[];
}

const Gallery: FC<PropsInterface> = ({ photos }) => {
  const [size, setSize] = useState("thumb");
  const [selected, setSelected] = useState(null);

  return (
    <div className="App">
      <h3>Photos courtesy of Unsplash and it's users</h3>
      <div className="container">
        <div className="">
          {photos.map((p) => (
            <div className="display-flex" key={p.id}>
              <button className="btn">
                <img src={p.urls[size]} alt={`Taken by ${p.user.name}`} />
              </button>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export { Gallery };
