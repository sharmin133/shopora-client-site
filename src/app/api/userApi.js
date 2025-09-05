import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

// User API slice
export const userApi = createApi({
  reducerPath: "userApi", // unique key
  baseQuery: fetchBaseQuery({ baseUrl: import.meta.env.VITE_API_BASE_URL }), // base URL
  tagTypes: ["Users"], // cache tag
  endpoints: (builder) => ({

    // Get all users
    getAllUsers: builder.query({
      query: (token) => ({
        url: "/users",
        headers: { Authorization: `Bearer ${token}` },
      }),
      providesTags: ["Users"],
    }),
  }),
});

// Export hook
export const { useGetAllUsersQuery } = userApi;
