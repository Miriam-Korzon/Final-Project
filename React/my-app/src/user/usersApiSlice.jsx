import apiSlice from "../apiSlice"

const usersApiSlice = apiSlice.injectEndpoints({

    endpoints: (build) => ({
        getUsers: build.query({
            query: () => ({
                url: 'api/userRoute'
            }),
            providesTags:["Users"]

        }),
        addUsers: build.mutation({
            query:(users)=>({
            url:"api/userRoute",
            method:"POST",
            body: users
            })
        }),
        deleteUsers: build.mutation({
            query:(_id)=>({
            url:"api/userRoute/".concat(_id),
            method:"DELETE",
            }),
            invalidatesTags:["Users"]
        }),

        updateUsers: build.mutation({
            query: (word) => ({
            url: "api/userRoute",
            method: "PUT",
            body: word
            }),
            invalidatesTags:["Users"]
        })

})
})

export const {useGetUsersQuery,useAddUsersMutation,useDeleteUsersMutation,useUpdateUsersMutation} = usersApiSlice
