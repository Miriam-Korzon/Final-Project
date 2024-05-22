import { createApi, fetchBaseQuery } from "@reduxjs/toolkit/query/react";

const apiSlice = createApi({
    reducerPath: 'api',
    baseQuery: fetchBaseQuery({
        baseUrl:
             'http://localhost:1155/',
            
        credentials:'include',
        prepareHeaders:(headers,{getState})=>{
            console.log(getState().auth);
            const accessToken=getState().auth.token
            console.log(accessToken);
            if(accessToken){
                headers.set("authorization",`Bearer ${accessToken}`)
            }
            return headers
        }
    }),
    endpoints: () => ({}),
})
export default apiSlice