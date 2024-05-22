import apiSlice from "../apiSlice"

const coursesApiSlice = apiSlice.injectEndpoints({

    endpoints: (build) => ({
        getRegisters: build.query({
            query: () => ({
                url: '/api/registerRoute'
            }),
            providesTags:["Registers"]
        }),

        addRegisters: build.mutation({
            query:(register)=>({
            url:"/api/registerRoute",
            method:"POST",
            body: register
            })
        }),

        deleteRegister: build.mutation({
            query:(_id)=>({
            url:"/api/registerRoute/".concat(_id),
            method:"DELETE",
            }),
            invalidatesTags:["Registers"]
        }),

        getRegisterById: build.query({
            query:()=>({
            url:"/api/registerRoute/myCourses"
            })
        }),

        updateRegister: build.mutation({
            query: (word) => ({
            url: "/api/registerRoute",
            method: "PUT",
            body: word
            })
        }),

    })
})
export const {useGetRegistersQuery,useAddRegistersMutation,useDeleteRegisterMutation,useGetRegisterByIdQuery,useUpdateRegisterMutation} = coursesApiSlice
