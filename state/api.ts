import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

export const api = createApi({
  reducerPath: "api",
  baseQuery: fetchBaseQuery({ baseUrl: "http://localhost:3000/api" }),
  tagTypes: ["Board"],
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
  }),
});

export const { useGetBoardsQuery, useAddBoardMutation, useRemoveBoardMutation } = api;
