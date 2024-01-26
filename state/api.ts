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
      query: ({ name, userId, columns, _id }) => ({
        url: "boards/addBoard",
        method: "POST",
        body: { name, userId, _id },
      }),
      invalidatesTags: ["Board"],
    }),
    removeBoard: build.mutation({
      query: ({ boardId }) => ({
        url: "boards/removeBoard",
        method: "DELETE",
        body: { boardId },
      }),
      invalidatesTags: ["Board"],
    }),
    changeBoardName: build.mutation({
      query: ({ name, boardId }) => ({
        url: "boards/changeBoardName",
        method: "PUT",
        body: { name, boardId },
      }),
      invalidatesTags: ["Board"],
    }),
    addColumn: build.mutation({
      query: ({ column, boardId }) => ({
        url: "columns/addColumn",
        method: "POST",
        body: { column, boardId },
      }),
      invalidatesTags: ["Board"],
    }),
    removeColumn: build.mutation({
      query: ({ columnId, boardId }) => ({
        url: "columns/removeColumn",
        method: "DELETE",
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
        method: "DELETE",
        body: { columnId, taskId },
      }),
      invalidatesTags: ["Board", "Task"],
    }),
    editTask: build.mutation({
      query: ({ taskId, title, description, subtasks }) => ({
        url: "tasks/editTask",
        method: "PUT",
        body: { taskId, title, description, subtasks },
      }),
      invalidatesTags: ["Board", "Task"],
    }),

    // Subtasks
    toggleSubtask: build.mutation({
      query: ({ subtaskId }) => ({
        url: "subtasks/toggleSubtask",
        method: "PUT",
        body: { subtaskId },
      }),
      invalidatesTags: ["Board", "Task", "Subtask"],
    }),
    addSubtask: build.mutation({
      query: ({ taskId, subtaskId, subtaskTitle }) => ({
        url: "subtasks/addSubtask",
        method: "POST",
        body: { taskId, subtaskId, subtaskTitle },
      }),
      invalidatesTags: ["Board", "Task", "Subtask"],
    }),
    removeSubtasks: build.mutation({
      query: ({ subtaskId, taskId }) => ({
        url: "subtasks/removeSubtask",
        method: "DELETE",
        body: { subtaskId, taskId },
      }),
      invalidatesTags: ["Board", "Task", "Subtask"],
    }),
    editSubtask: build.mutation({
      query: ({ subtaskId, newTitle }) => ({
        url: "subtasks/editSubtask",
        method: "PUT",
        body: { subtaskId, newTitle },
      }),
      invalidatesTags: ["Board", "Task", "Subtask"],
    }),

    // drag and drop
    reorderTask: build.mutation({
      query: ({ boardId, source, destination }) => ({
        url: "tasks/reorderTask",
        method: "PUT",
        body: { boardId, source, destination },
      }),
    }),
    reorderColumn: build.mutation({
      query: ({ columnId, source, destination }) => ({
        url: "columns/reorderColumn",
        method: "PUT",
        body: { columnId, source, destination },
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
  useRemoveTaskMutation,
  useEditTaskMutation,
  useToggleSubtaskMutation,
  useAddSubtaskMutation,
  useRemoveSubtasksMutation,
  useEditSubtaskMutation,
  useReorderTaskMutation,
  useReorderColumnMutation,
} = api;
