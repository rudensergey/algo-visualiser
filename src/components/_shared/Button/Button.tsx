// Absolute imports
import Link from "next/link";
import React from "react";

interface IButtonProps {
  className?: string;
  children: React.ReactNode | string;
  href?: string;
  asHref?: string;
  onClick?: () => void;
}

const ButtonComponent: React.FC<IButtonProps> = ({ className, onClick, children, href, asHref }) => {
  return href && asHref ? (
    <Link href={href} as={asHref}>
      <button className={className} onClick={onClick}>
        {children}
      </button>
    </Link>
  ) : (
    <button className={className} onClick={onClick}>
      {children}
    </button>
  );
};

export default ButtonComponent;
