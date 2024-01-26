import { createSlice } from "@reduxjs/toolkit";
import { CardProps, subtask } from "@types";

const initialState: any = {
  allBoards: [],
  user: "64494cb5850f3117d277a749",
  activeBoard: {},
  highlightedCard: {} as CardProps,
};

export const globalSlice = createSlice({
  name: "global",
  initialState,
  reducers: {
    // ******** BOARDS ******** //
    setBoards: (state, action) => {
      const boards = action.payload;
      state.allBoards = boards;
      if (!state.activeBoard || Object.keys(state.activeBoard).length <= 0) {
        state.activeBoard = boards[0];
      }
    },
    setActiveBoard: (state, action) => {
      const boardId = action.payload;
      state.activeBoard = state.allBoards.find(
        (board: any) => board._id === boardId
      );
    },
    addBoardLocal: (state, action) => {
      const newBoard = action.payload;
      state.allBoards.push(newBoard);
    },
    removeBoardLocal: (state, action) => {
      const boardId = action.payload;
      state.allBoards = state.allBoards.filter(
        (board: any) => board._id !== boardId
      );
      state.activeBoard = state.allBoards[0];
    },
    changeBoardNameLocal: (state, action) => {
      const { boardId, name } = action.payload;
      const board = state.allBoards.find((board: any) => board._id === boardId);
      board.name = name;
      state.activeBoard = board;
    },

    // ******** COLUMNS ******** //
    addColumnLocal: (state, action) => {
      const { boardId, column } = action.payload;
      const board = state.allBoards.find((board: any) => board._id === boardId);
      board.columns.push(column);
      state.activeBoard = board;
    },
    removeColumnLocal: (state, action) => {
      const { boardId, columnId } = action.payload;
      const board = state.allBoards.find((board: any) => board._id === boardId);
      board.columns = board.columns.filter(
        (column: any) => column._id !== columnId
      );
      state.allBoards = state.allBoards.map((currentBoard: any) => {
        if (currentBoard._id === boardId) {
          return board;
        } else {
          return currentBoard;
        }
      });
      state.activeBoard = board;
    },
    replaceColumnLocal: (state, action) => {
      const { boardId, column, prevColumn } = action.payload;
      const newColumn = column;
      const prevColumnId = prevColumn._id;

      // Get active board
      const board = state.activeBoard;
      // find column with prevColumnId
      const columnToReplace = board.columns.find(
        (column: any) => column._id === prevColumnId
      )._id;

      const newColumns = state.activeBoard.columns.map((col: any) => {
        if (col._id === columnToReplace) {
          const columnWithNewId = { ...col, _id: newColumn._id };
          return columnWithNewId;
        } else {
          return col;
        }
      });

      state.activeBoard.columns = newColumns;
    },

    // ******** TASKS ******** //
    addTaskLocal: (state, action) => {
      const { task, columnId } = action.payload;
      const activeBoard = state.activeBoard;
      const activeColumn = activeBoard.columns.find(
        (col) => col._id === columnId
      );
      activeColumn.tasks.push(task);
    },
    removeTaskLocal: (state, action) => {
      const { boardId, columnId, taskId } = action.payload;
      const board = state.allBoards.find((board: any) => board._id === boardId);
      const column = board.columns.find(
        (column: any) => column._id === columnId
      );
      column.tasks = column.tasks.filter((task: any) => task._id !== taskId);
      state.activeBoard = board;

      state.allBoards = state.allBoards.map((currentBoard: any) => {
        if (currentBoard._id === boardId) {
          return board;
        } else {
          return currentBoard;
        }
      });
    },
    replaceTaskLocal: (state, action) => {
      const { task, prevTask, columnId } = action.payload;
      const newTask = task;
      const prevTaskId = prevTask._id;

      // Get active board
      const board = state.activeBoard;

      // Find column with prevTaskId
      const column = board.columns.find(
        (column: any) => column._id === columnId
      );
      const taskToReplace = column.tasks.find(
        (task: any) => task._id === prevTaskId
      )._id;
      const newTasks = column.tasks.map((task: any) => {
        if (task._id === taskToReplace) {
          const taskWithNewId = { ...task, _id: newTask._id };
          return taskWithNewId;
        } else {
          return task;
        }
      });
      column.tasks = newTasks;
    },
    setHighlightedCard: (state, action) => {
      const card = action.payload;
      state.highlightedCard = card;
    },
    editTaskLocal: (state, action) => {
      const { newName, newDescription } = action.payload;
      const boardId = state.activeBoard._id;
      const columnId = state.highlightedCard.columnId;

      if (newName) state.highlightedCard.title = newName;
      if (newDescription) state.highlightedCard.description = newDescription;

      const column = state.activeBoard.columns.find(
        (column: any) => column._id === columnId
      );

      if (column && newName) {
        column.tasks = column.tasks.map((task: any) => {
          if (task._id === state.highlightedCard._id) {
            task.title = newName;
          }
          return task;
        });
      }

      if (column && newDescription) {
        column.tasks = column.tasks.map((task: any) => {
          if (task._id === state.highlightedCard._id) {
            task.description = newDescription;
          }
          return task;
        });
      }

      state.allBoards = state.allBoards.map((currentBoard: any) => {
        if (currentBoard._id === boardId) {
          return state.activeBoard;
        } else {
          return currentBoard;
        }
      });
    },

    // ******** SUBTASKS ******** //
    toggleSubtaskLocal: (state, action) => {
      const { subtaskId } = action.payload;

      const subtasks = state.highlightedCard.subtasks;
      const updatedSubtasks = subtasks.map((subtask: subtask) => {
        if (subtaskId === subtask._id)
          return { ...subtask, isCompleted: !subtask.isCompleted };
        else return subtask;
      });
      // Update subtasks of highlighted card
      state.highlightedCard.subtasks = updatedSubtasks;

      // Find the column and task in the active board
      const column = state.activeBoard.columns.find(
        (column) => column._id === state.highlightedCard.columnId
      );

      if (column) {
        const taskIndex = column.tasks.findIndex(
          (task) => task._id === state.highlightedCard._id
        );
        if (taskIndex !== -1) {
          // Update the subtasks in the found task
          column.tasks[taskIndex] = {
            ...column.tasks[taskIndex],
            subtasks: updatedSubtasks,
          };

          // Create new copies of columns and activeBoard for immutable update
          const updatedColumns = state.activeBoard.columns.map((c, index) =>
            index === column._id ? { ...column, tasks: [...column.tasks] } : c
          );
          state.activeBoard = { ...state.activeBoard, columns: updatedColumns };
        }
      }
    },
    addSubtaskLocal: (state, action) => {
      const { subtaskId, title } = action.payload;
      state.highlightedCard.subtasks.push({
        _id: subtaskId,
        title,
        isCompleted: false,
      });

      const column = state.activeBoard.columns.find(
        (column) => column._id === state.highlightedCard.columnId
      );

      // find task to update
      const taskIndex = column.tasks.findIndex(
        (task) => task._id === state.highlightedCard._id
      );
      if (taskIndex !== -1) {
        // Update the subtasks in the found task
        column.tasks[taskIndex] = {
          ...column.tasks[taskIndex],
          subtasks: state.highlightedCard.subtasks,
        };

        // Create new copies of columns and activeBoard for immutable update
        const updatedColumns = state.activeBoard.columns.map((c, index) =>
          index === column._id ? { ...column, tasks: [...column.tasks] } : c
        );
        state.activeBoard = { ...state.activeBoard, columns: updatedColumns };
      }
    },
    removeSubtaskLocal: (state, action) => {
      const { subtaskId } = action.payload;

      const subtasks = state.highlightedCard.subtasks;
      const updatedSubtasks = subtasks.filter(
        (subtask: subtask) => subtaskId !== subtask._id
      );
      state.highlightedCard.subtasks = updatedSubtasks;

      const column = state.activeBoard.columns.find(
        (column) => column._id === state.highlightedCard.columnId
      );

      // find task to update
      const taskIndex = column.tasks.findIndex(
        (task) => task._id === state.highlightedCard._id
      );
      if (taskIndex !== -1) {
        // Update the subtasks in the found task
        column.tasks[taskIndex] = {
          ...column.tasks[taskIndex],
          subtasks: updatedSubtasks,
        };

        // Create new copies of columns and activeBoard for immutable update
        const updatedColumns = state.activeBoard.columns.map((c, index) =>
          index === column._id ? { ...column, tasks: [...column.tasks] } : c
        );
        state.activeBoard = { ...state.activeBoard, columns: updatedColumns };
      }
    },
    editSubtaskLocal: (state, action) => {
      const { subtaskId, newTitle } = action.payload;
      console.log("hey");

      // Update subtask in highlighted card
      const updatedSubtasks = state.highlightedCard.subtasks.map((subtask) =>
        subtask._id === subtaskId ? { ...subtask, title: newTitle } : subtask
      );
      state.highlightedCard.subtasks = updatedSubtasks;

      // Update subtask in task
      const column = state.activeBoard.columns.find(
        (column) => column._id === state.highlightedCard.columnId
      );
      const taskIndex = column.tasks.findIndex(
        (task) => task._id === state.highlightedCard._id
      );
      if (taskIndex !== -1) {
        // Update the subtasks in the found task
        column.tasks[taskIndex] = {
          ...column.tasks[taskIndex],
          subtasks: updatedSubtasks,
        };

        // Create new copies of columns and activeBoard for immutable update
        const updatedColumns = state.activeBoard.columns.map((c, index) =>
          index === column._id ? { ...column, tasks: [...column.tasks] } : c
        );
        state.activeBoard = { ...state.activeBoard, columns: updatedColumns };
      }
    },

    // ******** DRAG & DROP ******** //
    moveTaskLocal: (state, action) => {
      const { boardId, columnId, taskId, source, destination } = action.payload;
      const board = state.allBoards.find((board: any) => board._id === boardId);
      const column = board.columns.find(
        (column: any) => column._id === columnId
      );
      const task = column.tasks.find((task: any) => task._id === taskId);

      column.tasks = column.tasks.filter((task: any) => task._id !== taskId);

      const newColumn = board.columns.find(
        (column: any) => column._id === destination.droppableId
      );

      newColumn.tasks.splice(destination.index, 0, task);
      state.activeBoard = board;

      state.allBoards = state.allBoards.map((currentBoard: any) => {
        if (currentBoard._id === boardId) {
          return board;
        } else {
          return currentBoard;
        }
      });
    },
    moveColumnLocal: (state, action) => {
      const boardId = state.activeBoard._id;
      const { source, destination, columnId } = action.payload;
      let board = state.activeBoard;

      const columnToMove = board.columns.find(
        (column: any) => column._id === columnId
      );
      board.columns = board.columns.filter((col) => col._id !== columnId);
      board.columns.splice(destination.index, 0, columnToMove);
      state.activeBoard = board;

      state.allBoards = state.allBoards.map((currentBoard: any) => {
        if (currentBoard._id === boardId) {
          return board;
        } else {
          return currentBoard;
        }
      });
    },
  },
});

export const {
  setBoards,
  setActiveBoard,
  addBoardLocal,
  removeColumnLocal,
  removeBoardLocal,
  replaceColumnLocal,
  changeBoardNameLocal,
  addColumnLocal,
  setHighlightedCard,
  addTaskLocal,
  removeTaskLocal,
  editTaskLocal,
  replaceTaskLocal,
  moveTaskLocal,
  moveColumnLocal,
  toggleSubtaskLocal,
  addSubtaskLocal,
  removeSubtaskLocal,
  editSubtaskLocal,
} = globalSlice.actions;
export default globalSlice.reducer;
