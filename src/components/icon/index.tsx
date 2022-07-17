import { FC } from "react";

interface PropsInterface {
  name: string;
  className?: string;
}

const Icon: FC<PropsInterface> = ({ name, className = "" }) => {
  return <i className={`fa fa-${name} ${className}`} />;
};

export { Icon };
