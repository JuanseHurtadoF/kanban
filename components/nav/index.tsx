import React, { FC } from "react";
import { Heading, Button, Icon, Text, EditableBoardName } from "@components";
import styles from "./nav.module.scss";
import { NavProps } from "@types";
import { useSelector } from "react-redux";
import { useState } from "react";

const Nav: FC<NavProps> = ({ toggleNewCard, toggleDeleteModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { activeBoard } = useSelector((state: any) => state.global);

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  return (
    <div
      onMouseLeave={() => setTimeout(() => setIsMenuOpen(false), 500)}
      className={styles.container}
    >
      <div className={styles.nameContainer}>
        <EditableBoardName />
      </div>
      <div className={styles.actionsContainer}>
        <Button
          label="+ Add New Task"
          variant="primarySm"
          onClick={toggleNewCard}
        />
        <div onClick={toggleMenu} className={styles.options}>
          <Icon variant="options" />
          {isMenuOpen && (
            <div className={styles.menu}>
              <div onClick={toggleDeleteModal} className={styles.delete}>
                <Text variant="destructive" text="Delete Board" />
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default Nav;
