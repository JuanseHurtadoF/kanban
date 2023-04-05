import { subtask } from "./subtask";

export type CardProps = {
  title: string;
  description?: string;
  status?: string;
  subtasks: subtask[];
};
