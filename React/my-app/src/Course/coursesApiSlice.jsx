import apiSlice from "../apiSlice"

const coursesApiSlice = apiSlice.injectEndpoints({

    endpoints: (build) => ({
        getCourses: build.query({
            query: () => ({
                url: 'api/courseRoute'
            }),
            providesTags:["Courses"]
        }),

        addCourses: build.mutation({
            query:(courses)=>({
            url:"api/courseRoute",
            method:"POST",
            body: courses
            })
        }),

        deleteCourse: build.mutation({
            query:(id)=>({
            url:"api/courseRoute/".concat(id),
            method:"DELETE",
            }),
            invalidatesTags:["Courses"]
        }),

        getCourseById: build.query({
            query:(_id)=>({
            url:"api/courseRoute/".concat(_id),
            method:"GET",
            })
        }),

        updateCourse: build.mutation({
            query: (word) => ({
            url: "api/courseRoute",
            method: "PUT",
            body: word
            }),
            invalidatesTags:["Courses"]
        }),

    })
})
export const {useGetCoursesQuery,useAddCoursesMutation,useDeleteCourseMutation,useGetCourseByIdQuery,useUpdateCourseMutation} = coursesApiSlice
