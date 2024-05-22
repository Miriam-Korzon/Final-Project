import { Button } from "primereact/button";
import { useGetCourseByIdQuery } from "./coursesApiSlice"
import { useLocation } from 'react-router-dom';
import { useAddRegistersMutation } from "../MyCourses/myCoursesApiSlice";
import { useState, useRef, useEffect } from "react";
import { confirmPopup, ConfirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import FromToken from "../fromToken";
import { useNavigate } from "react-router-dom";
import { Message } from 'primereact/message';
const DetailCourse = () => {
    const user = FromToken()
    const navigate = useNavigate()
    const userId = user._id
    const [Register, setRegister] = useState({
        "user": "",
        "course": "",
        "paid": false
    })

    let location = useLocation();
    const {
        data: course = {},
        isLoading,
        isError,
        error
    } = useGetCourseByIdQuery(location.state.id)

    const [addRegisterFunc, { isError: ie, isSuccess: is, isLoading: il, data, error: e }] = useAddRegistersMutation()
    const register = async () => {
        await addRegisterFunc(Register)
    }
    useEffect(() => {
        if (course) {
            setRegister({
                "user": userId,
                "course": course._id,
                "paid": false
            })
        }
        if (is) {
            navigate("/myCourses")
        }
    }, [course, is])

    const toast = useRef(null);

    const accept = () => {
        register()
    };

    const reject = () => {
        // toast.current.show({ severity: 'warn', summary: 'Rejected', detail: 'You have rejected', life: 3000 });
    };

    const showTemplate = (event) => {
        confirmPopup({
            target: event.currentTarget,
            group: 'templating',
            header: 'Confirmation',
            message: (
                <div className="flex flex-column align-items-center w-full gap-3 border-bottom-1 surface-border">
                    <i className="pi pi-exclamation-circle text-6xl text-primary-500"></i>
                    <span>Please confirm to proceed moving forward.</span>
                </div>
            ),
            acceptIcon: 'pi pi-check',
            rejectIcon: 'pi pi-times',
            rejectClass: 'p-button-sm',
            acceptClass: 'p-button-outlined p-button-sm',
            accept,
            reject
        });

    };
    return (
        <div>
            <h1>{course.name}</h1>
            <img src={`http://localhost:1155/uploads/${course?.image?.split("\\")[2]}`}></img>
            <h1>{course.describe}</h1>
            <h1>{course.lecturer}</h1>
            <h1>{course.day}</h1>
            <h1>{course.startDate}</h1>
            <h1>{course.endDate}</h1>
            <h1>{course.hours}</h1>
            <h1>{course.numOfMeeting}</h1>
            <h1>{course.AudienceStatus}</h1>
            <h1>{course.Kategory}</h1>
            <h1>{course.price}</h1>
            {ie?  <div className="card flex flex-wrap align-items-center justify-content-center gap-3">
                <Message severity="error" text={e.data.message} /></div>:<></>}
            <Toast ref={toast} />
            <ConfirmPopup group="templating" />
            <div className="card flex justify-content-center">
                <Button onClick={showTemplate} icon="pi pi-check" label="הרשמה לקורס"></Button>
            </div>
        </div>

    )

}
export default DetailCourse