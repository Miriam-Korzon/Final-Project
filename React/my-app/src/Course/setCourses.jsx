import { useGetCoursesQuery, useUpdateCourseMutation } from './coursesApiSlice';
import React, { useState, useEffect, useRef } from 'react';
import { Button } from 'primereact/button';
import { DataView, DataViewLayoutOptions } from 'primereact/dataview';
import { classNames } from 'primereact/utils';
import { ProgressSpinner } from 'primereact/progressspinner';
import { useNavigate } from 'react-router-dom';
import NewCourse from './newCourse';
import { ConfirmPopup, confirmPopup } from 'primereact/confirmpopup';
import { Toast } from 'primereact/toast';
import { useDeleteCourseMutation } from './coursesApiSlice';
import { InputText } from 'primereact/inputtext';
import { Controller, useForm } from 'react-hook-form';
import { Dialog } from 'primereact/dialog';
import { MultiSelect } from 'primereact/multiselect';
import { Dropdown } from 'primereact/dropdown';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Message } from 'primereact/message';




const SetCourse = () => {
    const [newC, setNewC] = useState(false);
    const [visible, setVisible] = useState(false);
    const [formData, setFormData] = useState(new FormData());
    const [visible11, setVisible11] = useState(true);


    const [layout, setLayout] = useState('grid');
    const toast = useRef(null);
    const courseId = useRef(null)
    const action = useRef(null)
    const ddata = useRef(null)
    const event_ = useRef(null)
    const [defaultValues, setDefaultValues] = useState({});
    const form = useForm({ values: defaultValues });
    const errors = form.formState.errors;

    const [selectedFile, setSelectedFile] = useState({});
    const [selectedKategory, setSelectedKategory] = useState({ name: 'קודש חינוך מודעות' });
    const kategory = [
        { name: "קודש חינוך מודעות" },
        { name: "ערבי עיון והעשרה" },
        { name: "קידום טיפול והתערבות" },
    ];
    const [selectedAudience, setSelectedAudience] = useState({ name: 'נשים נשואות' }); const audience = [
        { name: "בוגרות סמינר" },
        { name: "גמלאיות" },
        { name: "נשים נשואות" },
    ];

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const {
        data: courses = [],
        isLoading,
        isError,
        error,
        refetch
    } = useGetCoursesQuery()

    const handelClick = () => {
        setVisible11(true)
        setNewC(true)
    }

    const [deleteCourses, { isError: ie, isSuccess, isLoading: l, data, error: e }] = useDeleteCourseMutation()
    const [updateCourses, { isError: ie_u, isSuccess: is_u, isLoading: l_u, data: data_u, error: e_u }] = useUpdateCourseMutation()

    useEffect(() =>{
        if(is_u) 
        {
            setVisible(false)
        }
    },[is_u])


    const accept = () => {
        if (action.current === 'delete') {
            console.log("delete   :", action.current);
            deleteCourses(courseId.current)
        }
        if (action.current === 'update') {
            const formData1 = new FormData()
            formData1.append('_id', ddata.current._id)

            formData1.append('AudienceStatus', ddata.current.AudienceStatus)
            formData1.append('Kategory', ddata.current.Kategory)
            formData1.append('image', selectedFile)
            formData1.append('name', ddata.current.name ? ddata.current.name : '')
            formData1.append('code', ddata.current.code ? ddata.current.code : '')
            formData1.append('describe', ddata.current.describe ? ddata.current.describe : '')
            formData1.append('lecturer', ddata.current.lecturer ? ddata.current.lecturer : '')
            formData1.append('day', ddata.current.day ? ddata.current.day : '')
            formData1.append('startDate', ddata.current.startDate ? ddata.current.startDate : '')
            formData1.append('endDate', ddata.current.endDate ? ddata.current.endDate : '')
            formData1.append('hours', ddata.current.hours ? ddata.current.hours : '')
            formData1.append('numOfMeeting', ddata.current.numOfMeeting ? ddata.current.numOfMeeting : 0)
            formData1.append('price', ddata.current.price ? ddata.current.price : 0)

            updateCourses(formData1)

        }
    };

    const reject = () => {
        setVisible(false)
    };

    const confirm1 = () => {
        action.current = 'update'
        confirmDialog({
            message: 'Are you sure you want to proceed?',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

    const confirm2 = (id) => {
        courseId.current = id
        action.current = 'delete'
        confirmDialog({
            message: 'Do you want to delete this record?',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    const onSubmit = (data) => {
        ddata.current = data
        form.reset()
        confirm1()
    };
    const dialog = (course) => {
        setSelectedKategory(course.Kategory)
        setSelectedAudience(course.AudienceStatus)
        setDefaultValues(
            {
                "_id": course._id,
                "name": course.name,
                "code": course.code,
                "describe": course.describe,
                "lecturer": course.lecturer,
                "day": course.day,
                "startDate": course.startDate,
                "endDate": course.endDate,
                "hours": course.hours,
                "numOfMeeting": course.numOfMeeting,
                "AudienceStatus": course.AudienceStatus,
                "Kategory": course.Kategory,
                "price": course.price,
                "image": course.image

            })
        setVisible(true)
    };

    if (isLoading) return <div className="card">
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    </div>
    if (isError) return <h2>{JSON.stringify(error)}</h2>
    const listItem = (course, index) => {
        return (
            <>

                <div className="col-12" key={course.code}>
                    <div className={classNames('flex flex-column xl:flex-row xl:align-items-start p-4 gap-4', { 'border-top-1 surface-border': index !== 0 })}>
                        {course.image ? <img alt={course.name} className="w-9 sm:w-16rem xl:w-10rem shadow-2 block xl:block mx-auto border-round" src={`http://localhost:1155/uploads/${course.image.split("\\")[2]}`}></img> : <></>}
                        <div className="flex flex-column sm:flex-row justify-content-between align-items-center xl:align-items-start flex-1 gap-4">
                            <div className="flex flex-column align-items-center sm:align-items-start gap-3">
                                <div className="text-2xl font-bold text-900">{course.name}</div>
                                <span className="font-semibold">{course.describe}</span>
                            </div>
                            <div className="flex sm:flex-column align-items-center sm:align-items-end gap-3 sm:gap-2">
                                {course.lecturer ? <div className="text-2xl font-bold">מרצה: {course.lecturer}</div> : ''}
                                {course.day ? <div className="text-2xl font-bold">הקורס יתקיים בימי {course.day}</div> : ''}
                                {course.startDate ? <div className="text-2xl font-bold">בין התאריכים {course.startDate} ל {course.endDate}</div> : ''}
                                {course.hours ? <div className="text-2xl font-bold">בין השעות {course.hours}</div> : ''}
                                {course.numOfMeeting ? <div className="text-2xl font-bold">מספר מפגשים {course.numOfMeeting}</div> : ''}
                                {course.AudienceStatus ? <div className="text-2xl font-bold">קהל היעד {course.AudienceStatus}</div> : ''}
                                <div className="text-2xl font-bold">{course.Kategory}</div>
                            </div>
                        </div>
                    </div>
                </div>
                <Toast ref={toast} />
                <ConfirmPopup />
                <div className="card flex flex-wrap gap-2 justify-content-center">
                    <Button onClick={() => dialog(course)} icon="pi pi-check" label="Confirm"></Button>
                    <Button onClick={(event) => { confirm2(course._id, event) }} icon="pi pi-times" label="Delete" className="p-button-danger"></Button>
                </div>
            </>
        );
    };

    const gridItem = (course) => {
        return (
            <>
                <div className="col-12 sm:col-6 lg:col-12 xl:col-4 p-2" key={course.code}>
                    <div className="p-4 border-1 surface-border surface-card border-round">
                        <div className="flex flex-wrap align-items-center justify-content-between gap-2">
                        </div>
                        <div className="flex flex-column align-items-center gap-3 py-5">
                            {course.image ? <img className="w-9 shadow-2 border-round" src={`http://localhost:1155/uploads/${course.image.split("\\")[2]}`} alt={course.name} /> : <></>}
                            <div className="text-2xl font-bold">{course.name}</div>
                            <span className="font-semibold">{course.describe}</span>
                            {course.lecturer ? <div className="text-2xl font-bold">מרצה: {course.lecturer}</div> : ''}
                            {course.day ? <div className="text-2xl font-bold">הקורס יתקיים בימי {course.day}</div> : ''}
                            {course.startDate ? <div className="text-2xl font-bold">בין התאריכים {course.startDate} ל {course.endDate}</div> : ''}
                            {course.hours ? <div className="text-2xl font-bold">בין השעות {course.hours}</div> : ''}
                            {course.numOfMeeting ? <div className="text-2xl font-bold">מספר מפגשים {course.numOfMeeting}</div> : ''}
                            {course.AudienceStatus ? <div className="text-2xl font-bold">קהל היעד {course.AudienceStatus}</div> : ''}
                            <div className="text-2xl font-bold">{course.Kategory}</div>
                            <Toast ref={toast} />
                            <ConfirmPopup />
                            <div className="card flex flex-wrap gap-2 justify-content-center">
                                <Button onClick={() => dialog(course)} icon="pi pi-check" label="Confirm"></Button>
                                <Button onClick={(event) => { confirm2(course._id, event) }} icon="pi pi-times" label="Delete" className="p-button-danger"></Button>
                            </div>
                            {/* // icon="pi pi-trash" */}
                        </div>
                    </div>
                </div>

            </>
        );
    };

    const itemTemplate = (course, layout, index) => {
        if (!course) {
            return;
        }
        if (layout === 'list') return listItem(course, index);

        else if (layout === 'grid') return gridItem(course);

    };
    const listTemplate = (courses, layout) => {
        if (courses)
            return <div className="grid grid-nogutter">{courses.map((course, index) => itemTemplate(course, layout, index))}</div>;
        else return <></>
    };
    const header = () => {
        return (
            <>
                <div className="card flex justify-content-center">
                    <Button onClick={handelClick} label='הוספת קורס' rounded aria-label="Filter" />
                    {newC ? <NewCourse refetch={refetch} visible11={visible11} setVisible11={setVisible11} /> : ""}
                </div>
                <div className="flex justify-content-end">
                    <DataViewLayoutOptions layout={layout} onChange={(e) => setLayout(e.value)} />
                </div>
            </>
        );
    };

    return (<>
        <div className="card">
            <DataView value={courses} listTemplate={listTemplate} layout={layout} header={header()} />
        </div>
        <ConfirmDialog />
        <Dialog header="עידכון קורס" visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
            <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                <Controller
                    name="name"
                    control={form.control}
                    rules={{ required: 'Value is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>
                                שם הקורס
                            </label>
                            <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="code"
                    control={form.control}
                    rules={{ required: 'Value is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>
                                קוד
                            </label>
                            <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                {ie_u ? <div className="flex flex-wrap align-items-center mb-3 gap-2">
                    <Message severity="error" text={e_u.data.message} /></div> : <></>}
                <Controller
                    name="describe"
                    control={form.control}
                    render={({ field }) => (
                        <>
                            <label htmlFor={field.name}>
                                תאור
                            </label>
                            <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} />
                        </>
                    )}
                />
                <Controller
                    name="lecturer"
                    control={form.control}
                    rules={{ required: 'Value is required.' }}
                    render={({ field, fieldState }) => (
                        <>
                            <label htmlFor={field.name}>
                                מרצה
                            </label>
                            <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} />
                            {getFormErrorMessage(field.name)}
                        </>
                    )}
                />
                <Controller
                    name="day"
                    control={form.control}
                    render={({ field }) => (
                        <>
                            <label htmlFor="ab">
                                יום בשבוע
                            </label>
                            <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} />
                        </>
                    )}
                />
                <Controller
                    name="startDate"
                    control={form.control}
                    render={({ field }) => (
                        <>
                            <label htmlFor={field.name}>
                                תאריך התחלה
                            </label>
                            <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} />


                        </>
                    )}
                />
                <Controller
                    name="endDate"
                    control={form.control}
                    render={({ field }) => (
                        <>
                            <label htmlFor={field.name}>
                                תאריך סיום
                            </label>
                            <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} />
                        </>
                    )}
                />
                <Controller
                    name="hours"
                    control={form.control}
                    render={({ field }) => (
                        <>

                            <label htmlFor="ad">
                                בשעות
                            </label>
                            <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} />
                        </>
                    )}
                />
                <Controller
                    name="numOfMeeting"
                    control={form.control}
                    render={({ field }) => (
                        <>
                            <label htmlFor="ae">
                                מספר מפגשים
                            </label>
                            <InputText type="number" min={0} inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} />
                        </>
                    )}
                />

                <Controller
                    name="AudienceStatus"
                    control={form.control}
                    render={({ field }) => (
                        <>
                            <label htmlFor={field.name}>
                                קהל יעד
                            </label>
                            <Dropdown inputId={field.name} placeholder={selectedAudience} value={selectedAudience} inputRef={field.ref} onChange={(e) => { setSelectedAudience(e.value) }} options={audience} optionLabel="name" display="chip" />
                        </>
                    )}
                />
                <Controller
                    name="Kategory"
                    control={form.control}
                    render={({ field }) => (
                        <>
                            <label htmlFor={field.name}>
                                קטגוריה
                            </label>
                            <Dropdown inputId={field.name} placeholder={selectedKategory} value={selectedKategory} inputRef={field.ref} onChange={(e) => { setSelectedKategory(e.value) }} options={kategory} optionLabel="name" />
                        </>
                    )}
                />
                <Controller
                    name="price"
                    control={form.control}
                    render={({ field }) => (
                        <>
                            <label htmlFor="af">
                                מחיר
                            </label>
                            <InputText type="number" min={0} inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} />
                        </>
                    )}
                />
                <Controller
                    name="image"
                    type='file'
                    control={form.control}
                    render={({ field, fieldState }) => (
                        <>
                            <input type="file" name="image" onChange={handleFileChange} />
                        </>
                    )}
                />
                <Button label="Submit" type="submit" icon="pi pi-check"></Button>
            </form>
        </Dialog >
        {/* </div> */}
    </>
    )
}

export default SetCourse;