// Absolute imports
import React from "react";

// Types
import { IMenuProps, MENU } from "./Menu.types";

const Menu: React.FC<IMenuProps> = ({ children }) => <div className={MENU.WRAPPER}>{children}</div>;

export default Menu;
