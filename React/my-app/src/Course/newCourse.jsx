import React, { useRef, useState, useEffect } from 'react';
import { Controller, useForm } from 'react-hook-form';
import { Button } from 'primereact/button';
import { classNames } from 'primereact/utils';
import { InputText } from 'primereact/inputtext';
import { useAddCoursesMutation } from './coursesApiSlice';
import { Dialog } from 'primereact/dialog';
import { useNavigate } from 'react-router-dom';
import { Dropdown } from 'primereact/dropdown';
import { Message } from 'primereact/message';

const NewCourse = (props) => {
    const navigate = useNavigate()
    const defaultValues = {
        "Kategory": "קודש חינוך מודעות",
        "AudienceStatus": "נשים נשואות"
    };
    const form = useForm({ values: defaultValues });
    const errors = form.formState.errors;
    const [selectedFile, setSelectedFile] = useState({});
    const [selectedKategory, setSelectedKategory] = useState({ name: 'קודש חינוך מודעות' });
    const kategory = [
        { name: "קודש חינוך מודעות" },
        { name: "ערבי עיון והעשרה" },
        { name: "קידום טיפול והתערבות" },
    ];
    const [selectedAudience, setSelectedAudience] = useState({ name: 'נשים נשואות' });
    const audience = [
        { name: "בוגרות סמינר" },
        { name: "גמלאיות" },
        { name: "נשים נשואות" },
    ];


    const [AddCoursesFunc, { isError, isSuccess, isLoading, data, error }] = useAddCoursesMutation()
    // const [visible, setVisible] = useState(props.visible);


    useEffect(() => {
        if (isSuccess) {
            props.setVisible11(false)
            navigate('/setCourses')
            props.refetch()
        }
    }, [isSuccess])

    const onSubmit = (data) => {
        console.log(selectedAudience.name);
        console.log(selectedKategory.name);
        const formData = new FormData()
        formData.append('AudienceStatus', selectedAudience.name)
        formData.append('Kategory', selectedKategory.name)
        formData.append('image', selectedFile)
        formData.append('name', data.name ? data.name : '')
        formData.append('code', data.code ? data.code : '')
        formData.append('describe', data.describe ? data.describe : '')
        formData.append('lecturer', data.lecturer ? data.lecturer : '')
        formData.append('day', data.day ? data.day : '')
        formData.append('startDate', data.startDate ? data.startDate : '')
        formData.append('endDate', data.endDate ? data.endDate : '')
        formData.append('hours', data.hours ? data.hours : '')
        formData.append('numOfMeeting', data.numOfMeeting ? data.numOfMeeting : 0)
        formData.append('price', data.price ? data.price : 0)

        AddCoursesFunc(formData)
        form.reset()
        data.level && show();
    };

    const show = () => {
        // toast.current.show({ severity: 'success', summary: 'Form Submitted', detail: "gggg" });
    };

    const handleFileChange = (event) => {
        setSelectedFile(event.target.files[0]);
    };

    const toast = useRef(null);

    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };

    return (
        <div className="card flex justify-content-center">
            <Dialog header="הוספת קורס" visible={props.visible11} style={{ width: '50vw' }} onHide={() => props.setVisible11(false)}>
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
                    {isError ? <div className="flex flex-wrap align-items-center mb-3 gap-2">
                        <Message severity="error" text={error.data.message} /></div> : <></>}
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
                                <Dropdown inputId={field.name} value={selectedAudience ? selectedAudience : field.value} inputRef={field.ref} onChange={(e) => { setSelectedAudience(e.value) }} options={audience} optionLabel="name" />
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
                                <Dropdown inputId={field.name} value={selectedKategory ? selectedKategory : field.value} inputRef={field.ref} onChange={(e) => { setSelectedKategory(e.value) }} options={kategory} optionLabel="name" />
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
                                <div></div><div></div>
                                <input type="file" name="image" onChange={handleFileChange} />
                            </>
                        )}
                    />
                    <Button label="Submit" type="submit" icon="pi pi-check"></Button>

                </form>

            </Dialog >
        </div>
    )

}
export default NewCourse