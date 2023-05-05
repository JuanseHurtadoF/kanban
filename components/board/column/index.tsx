import React, { FC, useState } from "react";
import { CardProps, ColumnProps } from "@types";
import styles from "./column.module.scss";
import { Heading } from "@components";
import Card from "../card";
import { Draggable, Droppable } from "react-beautiful-dnd";

const Column: FC<ColumnProps> = ({ name, tasks, _id }) => {
  return (
    <div className={styles.container}>
      <div className={styles.titleContainer}>
        <div className={styles.label}></div>
        <Heading title={`${name} (${tasks?.length})`} variant={4} />
      </div>
      <Droppable droppableId={_id} type="cards">
        {(provided) => {
          return (
            <div
              {...provided.droppableProps}
              ref={provided.innerRef}
              className={styles.cardsContainer}
            >
              {tasks?.map((card: any, index) => {
                return (
                  <Draggable
                    index={index}
                    draggableId={card._id}
                    key={card._id}
                  >
                    {(provided) => {
                      return (
                        <div
                          {...provided.dragHandleProps}
                          {...provided.draggableProps}
                          ref={provided.innerRef}
                        >
                          <Card
                            title={card.title}
                            subtasks={card.subtasks}
                            description={card.description}
                            status={card.status}
                          />
                        </div>
                      );
                    }}
                  </Draggable>
                );
              })}
              {provided.placeholder}
            </div>
          );
        }}
      </Droppable>
    </div>
  );
};

export default Column;
