import { createSlice, current } from "@reduxjs/toolkit";
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

      console.log(newColumn);
      console.log(prevColumnId);

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
    addTaskLocal: (state, action) => {
      const task = action.payload;
      const { board, column } = task;

      const activeBoard = (state.activeBoard = state.allBoards.find(
        (item: any) => item._id === board
      ));
      const activeColumn = activeBoard.columns.find(
        (item: any) => item._id === column
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
    setHighlightedCard: (state, action) => {
      const card = action.payload;
      state.highlightedCard = card;
    },

    // Subtasks
    toggleSubtaskLocal: (state, action) => {
      const { subtaskId, cardId } = action.payload;

      console.log(cardId);

      const subtasks = current(state.highlightedCard.subtasks);
      const updatedSubtasks = subtasks.map((st: subtask) => {
        if (subtaskId === st._id)
          return { ...st, isCompleted: !st.isCompleted };
        else return st;
      });

      // Update subtasks of highlighted card
      state.highlightedCard.subtasks = updatedSubtasks;

      // Get active board
      const board = state.activeBoard;

      // Find the column that matches with columnId of the highlighted card
      const column = board.columns.find(
        (column: any) => column._id === state.highlightedCard.columnId
      );

      // Find the task that matches the id of the highlighted card
      const task = column.tasks.find(
        (task: any) => task._id === state.highlightedCard._id
      );

      // Update the subtasks of the task
      task.subtasks = updatedSubtasks;

      console.log(current(state.activeBoard));
    },

    // Drag and Drop
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
  moveTaskLocal,
  toggleSubtaskLocal,
} = globalSlice.actions;
export default globalSlice.reducer;
