import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api: any = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({
    baseUrl: "/api",
  }),
  tagTypes: ["Board", "Task", "Subtask"],
  endpoints: (build) => ({
    getBoards: build.query({
      query: () => "boards/getBoards",
      providesTags: ["Board"],
    }),
    addBoard: build.mutation({
      query: ({ name, userId, columns }) => ({
        url: "boards/addBoard",
        method: "POST",
        body: { name, userId },
      }),
      invalidatesTags: ["Board"],
    }),
    removeBoard: build.mutation({
      query: ({ boardId }) => ({
        url: "boards/removeBoard",
        method: "POST",
        body: { boardId },
      }),
      invalidatesTags: ["Board"],
    }),
    changeBoardName: build.mutation({
      query: ({ name, boardId }) => ({
        url: "boards/changeBoardName",
        method: "POST",
        body: { name, boardId },
      }),
      invalidatesTags: ["Board"],
    }),
    addColumn: build.mutation({
      query: ({ name, boardId }) => ({
        url: "columns/addColumn",
        method: "POST",
        body: { name, boardId },
      }),
      invalidatesTags: ["Board"],
    }),
    removeColumn: build.mutation({
      query: ({ columnId, boardId }) => ({
        url: "columns/removeColumn",
        method: "POST",
        body: { columnId, boardId },
      }),
      invalidatesTags: ["Board"],
    }),
    addTask: build.mutation({
      query: ({ title, description, board, column, subtasks, user }) => ({
        url: "tasks/addTask",
        method: "POST",
        body: { title, description, board, column, subtasks, user },
      }),
      invalidatesTags: ["Board", "Task"],
    }),
    removeTask: build.mutation({
      query: ({ columnId, taskId }) => ({
        url: "tasks/removeTask",
        method: "POST",
        body: { columnId, taskId },
      }),
      invalidatesTags: ["Board", "Task"],
    }),

    // Subtasks
    toggleSubtask: build.mutation({
      query: ({ subtaskId }) => ({
        url: "subtasks/toggleSubtask",
        method: "POST",
        body: { subtaskId },
      }),
      invalidatesTags: ["Board", "Task", "Subtask"],
    }),

    // drag and drop
    reorderTask: build.mutation({
      query: ({ boardId, source, destination }) => ({
        url: "tasks/reorderTask",
        method: "POST",
        body: { boardId, source, destination },
      }),
    }),
  }),
});

export const {
  useGetBoardsQuery,
  useAddBoardMutation,
  useRemoveBoardMutation,
  useChangeBoardNameMutation,
  useAddColumnMutation,
  useRemoveColumnMutation,
  useAddTaskMutation,
  useToggleSubtaskMutation,
  useRemoveTaskMutation,
  useReorderTaskMutation,
} = api;
