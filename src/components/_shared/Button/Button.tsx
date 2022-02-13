// Absolute imports
import Link from "next/link";
import React from "react";

import { BUTTON, IButtonProps, mapTypeToClass } from "./Button.types";

const ButtonComponent: React.FC<IButtonProps> = ({ type, className, onClick, children, href, asHref }) => {
  const classNames = React.useMemo(() => className ?? (type ? mapTypeToClass[type] : BUTTON.BUTTON), [type, className]);

  return href && asHref ? (
    <Link href={href} as={asHref}>
      <button className={classNames} onClick={onClick}>
        {children}
      </button>
    </Link>
  ) : (
    <button className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonComponent;
