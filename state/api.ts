import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api: any = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["Board", "Task"],
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
  }),
});

export const {
  useGetBoardsQuery,
  useAddBoardMutation,
  useRemoveBoardMutation,
  useAddColumnMutation,
  useRemoveColumnMutation,
  useAddTaskMutation,
  useRemoveTaskMutation,
} = api;
