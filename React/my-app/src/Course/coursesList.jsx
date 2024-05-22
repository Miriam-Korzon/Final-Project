import { useGetCoursesQuery } from './coursesApiSlice';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';

const CourseList = () => {

    const [layout, setLayout] = useState('grid');
    const navigate = useNavigate()
    const {
        data: courses = [],
        isLoading,
        isError,
        error
    } = useGetCoursesQuery()


    const detailCourse = (_id) => {
        navigate("/DetailCourse", { state: { id: _id } });
    }


    if (isLoading) return <div className="card">
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    </div>
    if (isError) return <h2>{JSON.stringify(error)}</h2>


    //name, code, describe, lecturer, day, startDate, endDate, hours, numOfMeeting, AudienceStatus, Kategory
    const listItem = (courses, index) => {
        return (
            <div className="col-12" key={courses.code}>
                <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                {console.log(`http://localhost:1155/uploads/${courses?.image?.split("\\")[2]}`)}
                <h1>{courses.image.split("\\")[2]}</h1>

                    {courses.image ? <img alt={courses.name} className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1155/uploads/${courses.image.split("\\")[2]}`}></img> : ''}
                    <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                        <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                            <div className="text-2xl font-bold text-900">{courses.name}</div>
                            <span className="font-semibold">{courses.describe}</span>
                        </div>
                        <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                            {/* <span className="text-2xl font-semibold">{courses.price}</span> */}
                            <Button label='פרטים נוספים' className="mr-2" onClick={() => { detailCourse(courses._id) }}></Button>
                        </div>
                    </div>
                </div>
            </div>
        );
    };

    const gridItem = (courses) => {
        return (
            <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={courses.code}>
                
                <div className="p-4 border-1 surface-border surface-card border-round">
                    <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                    </div>
                    <div className="flex flex-column align-items-center gap-3 py-5">
                    

                        
                        {courses.image ? <img className="w-9 shadow-2 border-round" src={`http://localhost:1155/uploads/${courses?.image?.split("\\")[2]}`} alt={courses.name} /> : ''}
                        <div className="text-2xl font-bold">{courses.name}</div>
                        <span className="font-semibold">{courses.describe}</span>
                    </div>
                    <div className="flex align-items-center justify-content-between">
                        {console.log(courses._id)}
                        <Button label='פרטים נוספים' className="mr-2" onClick={() => { detailCourse(courses._id) }} ></Button>
                        {/* // icon="pi pi-trash" */}
                    </div>
                </div>
            </div>
        );
    };

    const itemTemplate = (product, layout, index) => {
        if (!product) {
            return;
        }

        if (layout === 'list') return listItem(product, index);
        else if (layout === 'grid') return gridItem(product);
    };

    const listTemplate = (courses, layout) => {
        return <div className="grid grid-nogutter">{courses.map((product, index) => itemTemplate(product, layout, index))}</div>;
    };

    const header = () => {
        return (
            <div className="flex justify-content-end">
                <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
            </div>
        );
    };

    return (
        <div className="card">
            <DataView value={courses} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
    )
}

export default CourseList;