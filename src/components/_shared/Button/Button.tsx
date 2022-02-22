// absolute imports
import Link from "next/link";
import React from "react";

// types
import { BUTTON, IButtonProps, mapTypeToClass } from "./Button.types";

const ButtonComponent: React.FC<IButtonProps> = ({
  className,
  disabled,
  children,
  onClick,
  asHref,
  href,
  type,
}) => {
  const classNames = React.useMemo(
    () => className ?? (disabled ? BUTTON.DISABLED : type ? mapTypeToClass[type] : BUTTON.WRAPPER),
    [type, className]
  );

  return href && asHref ? (
    <Link href={href} as={asHref}>
      <button disabled={disabled} className={classNames} onClick={onClick}>
        {children}
      </button>
    </Link>
  ) : (
    <button disabled={disabled} className={classNames} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonComponent;
