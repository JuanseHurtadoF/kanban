import React, { FC } from "react";
import { HeadingProps } from "@types";
import styles from "./heading.module.scss";

const Heading: FC<HeadingProps> = ({ variant, title }) => {
  const TagName = `h${variant}`;

  return React.createElement(
    TagName,
    { className: styles[`h${variant}`] },
    title
  );
};

export default Heading;
