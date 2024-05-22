import { useGetRegisterByIdQuery } from './myCoursesApiSlice';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useDeleteRegisterMutation } from './myCoursesApiSlice';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup'
import { Toast } from 'primereact/toast';
const MyCourseList = () => {
    const toast = useRef(null);
    const [layout, setLayout] = useState('grid');
    const [visible, setVisible] = useState(false);
    const buttonEl = useRef(null);
    const ID = useRef(null);

    const {
        data: courses,
        isLoading,
        isError,
        error
    } = useGetRegisterByIdQuery()

    const [deleteFunc, {
        data,
        isLoading: il,
        isError: ie,
        error: e,
        isSuccess
    }] = useDeleteRegisterMutation()

    const sure = () => {
        deleteFunc(ID.current)
    }
    useEffect(() => {
        if (isSuccess) {
            window.location.reload(false)
        }
    }, [isSuccess])


    const accept = () => {
        sure()
        toast.current.show({ severity: 'info', summary: 'מחיקה', detail: 'נמחק בהצלחה', life: 3000 });
    }
    const reject = () => {
        toast.current.show({ severity: 'warn', summary: 'ביטול', detail: 'לא השתנו הנתונים', life: 3000 });
    }


    if (isLoading) return <div className="card">
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    </div>
    if (isError) return <h2>{JSON.stringify(error)}</h2>
    console.log(courses);
    if (!courses.length) return <h2>עדין לא הצטרפת לקורסים שלנו</h2>
    //name, code, describe, lecturer, day, startDate, endDate, hours, numOfMeeting, AudienceStatus, Kategory
    const gridItem = (course) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={course.course.code}>
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    </div>
                    {console.log(course)}
                    <div className="flex flex-column align-items-center gap-3 py-5">
                        {course.course.image ? <img className="w-9 shadow-2 border-round" src={`http://localhost:1155/uploads/${course.course.image?.split("\\")[2]}`} alt={course.course.name} /> : <></>}
                        <div className="text-2xl font-bold">{course.course.name}</div>
                        <span className="font-semibold">{course.course.describe}</span>
                        {course.course.lecturer ? <div className="text-2xl font-bold">מרצה: {course.course.lecturer}</div> : ''}
                        {course.course.day ? <div className="text-2xl font-bold">הקורס יתקיים בימי {course.course.day}</div> : ''}
                        {course.course.startDate ? <div className="text-2xl font-bold">בין התאריכים {course.course.startDate} ל {course.course.endDate}</div> : ''}
                        {course.course.hours ? <div className="text-2xl font-bold">בין השעות {course.course.hours}</div> : ''}
                        {course.course.numOfMeeting ? <div className="text-2xl font-bold">מספר מפגשים {course.course.numOfMeeting}</div> : ''}
                        {course.course.AudienceStatus ? <div className="text-2xl font-bold">קהל היעד {course.course.AudienceStatus}</div> : ''}
                        <div className="text-2xl font-bold">{course.course.Kategory}</div>
                    </div>
                    <Toast ref={toast} />
                    <ConfirmPopup  visible={visible} onHide={() => setVisible(false)}
                        message="Are you sure you want to proceed?" icon="pi pi-exclamation-triangle" accept={accept} reject={reject} />
                    <div className="flex align-items-center justify-content-between">
                        <Button icon="pi pi-trash" className="mr-2"  onClick={() => {setVisible(true); ID.current=course._id}}  ></Button>
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (course, layout, index) => {
        if (!course) {
            return;
        }
        return gridItem(course);
    };

    const listTemplate = (courses, layout) => {

        return <div className="grid grid-nogutter">{courses.map((course, index) => itemTemplate(course, layout, index))}</div>;
    };

    // const header = () => {
    //     return (
    //         <div className="flex justify-content-end">
    //             <DataViewIDOptions layout={layout} onChange={(e) => setLayout(e.value)} />
    //         </div>
    //     );
    // };

    return (
        <div className="card">
            <DataView value={courses} listTemplate={listTemplate} layout={layout} /*header={header()}*/ />
        </div>
    )

}

export default MyCourseList;