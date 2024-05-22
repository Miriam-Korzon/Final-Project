import {jwtDecode} from "jwt-decode"

const FromToken = () => {
   const token = localStorage.getItem('token')
   if (token) {
      const userDecode = jwtDecode(token)
      const{_id, username, name, ID, email, phone, address, secondPhone ,birthDate ,roles,active} = userDecode
      
      return {_id, username, name, ID, email, phone, address, secondPhone ,birthDate,roles,active }

   }
   return { roles: "user",name:"" }

}
export default FromToken