import { FC, memo } from "react";

interface PropsInterface {
  name: string;
  className?: string;
}

const Icon: FC<PropsInterface> = memo(({ name, className = "" }) => {
  return <i className={`fa fa-${name} ${className}`} />;
});

export { Icon };
