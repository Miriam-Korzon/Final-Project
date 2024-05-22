import { removeToken } from "../auth/authSlice"
import { useDispatch } from 'react-redux';
import { useEffect } from "react";
import { useNavigate } from "react-router-dom";
const DisConnection=()=>{
    const navigate=useNavigate()
    const dispatch = useDispatch()
    const remove=dispatch(removeToken())
    // console.log("remove  ",remove);
    useEffect(() => {
        if (remove.type) {
            window.location.reload(false);
            navigate('/')
        }
    }, [remove.type])
}
export default DisConnection