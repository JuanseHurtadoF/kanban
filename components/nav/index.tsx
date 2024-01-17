import React, { FC } from "react";
import { Button, Icon, Text, EditableHeading } from "@components";
import styles from "./nav.module.scss";
import { NavProps } from "@types";
import { useSelector } from "react-redux";
import { useState } from "react";
import useEditBoardName from "hooks/useEditBoardName";


const Nav: FC<NavProps> = ({ toggleNewCard, toggleDeleteModal }) => {
  const [isMenuOpen, setIsMenuOpen] = useState<boolean>(false);
  const { activeBoard } = useSelector((state: any) => state.global);
  const { updateBoardName } = useEditBoardName();

  const toggleMenu = () => {
    setIsMenuOpen(!isMenuOpen);
  };

  const changeBoardName = ({ name, prevName }) => {
    updateBoardName({ name, prevName });
  };

  return (
    <div
      onMouseLeave={() => setTimeout(() => setIsMenuOpen(false), 500)}
      className={styles.container}
    >
      <div className={styles.nameContainer}>
        <EditableHeading
          onEdit={changeBoardName}
          variant={1}
          title={activeBoard.name}
        />
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
