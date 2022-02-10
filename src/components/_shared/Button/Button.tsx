// Absolute imports
import Link from "next/link";
import React from "react";
import { Button } from "./Button.styled";

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
      <Button className={className} onClick={onClick}>
        {children}
      </Button>
    </Link>
  ) : (
    <Button className={className} onClick={onClick}>
      {children}
    </Button>
  );
};

export default ButtonComponent;
