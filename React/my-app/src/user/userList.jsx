import React, { useState, useEffect, useRef } from 'react';
import { DataTable } from 'primereact/datatable';
import { Column } from 'primereact/column';
import { useGetUsersQuery } from './usersApiSlice';
import { ProgressSpinner } from 'primereact/progressspinner';
import { Dialog } from 'primereact/dialog';
import { ConfirmDialog, confirmDialog } from 'primereact/confirmdialog';
import { Button } from 'primereact/button';
import { useDeleteUsersMutation } from './usersApiSlice';
import { Calendar } from 'primereact/calendar';
import { Controller, useForm } from 'react-hook-form';
import { InputText } from 'primereact/inputtext';
import { classNames } from 'primereact/utils';
import { useUpdateUsersMutation } from './usersApiSlice';
import { Message } from 'primereact/message';
import NewUser from './newUser';

const UserList = () => {
    const [selectedUser, setSelectedUser] = useState({});
    const [visible, setVisible] = useState(false);
    const [visible11, setVisible11] = useState(false);
    const [newU, setNewU] = useState(false);
    const [defaultValues, setDefaultValues] = useState({});
    const from = useRef(null);
    const d = useRef(null);


    useEffect(() => {
        setDefaultValues(
            {
                "ID": selectedUser.ID,
                "active": selectedUser.active,
                "address": selectedUser.address,
                "birthDate": selectedUser.birthDate,
                "email": selectedUser.email,
                "name": selectedUser.name,
                "phone": selectedUser.phone,
                "roles": selectedUser.roles,
                "username": selectedUser.username,
                "_id": selectedUser._id
            })
    }, [selectedUser])



    const form = useForm({ values: defaultValues });
    const errors = form.formState.errors;


    const getFormErrorMessage = (name) => {
        return errors[name] ? <small className="p-error">{errors[name].message}</small> : <small className="p-error">&nbsp;</small>;
    };
    const {
        data: users,
        isLoading,
        isError,
        error,
        refetch
    } = useGetUsersQuery()

    const [deleteUsers, { isError: ie, isSuccess, isLoading: l, data, error: e }] = useDeleteUsersMutation()

    const [updateUsers, { isError: ie_u, isSuccess: is_u, isLoading: l_u, data: d_u, error: e_u }] = useUpdateUsersMutation()
    useEffect(() => {
        if (isSuccess) {
            setVisible(false)
        }
    }, [isSuccess])
    useEffect(() => {
        if (is_u) {
            setVisible(false)
        }
    }, [is_u])

    const handleSetSelectedUser = (e) => {
        setSelectedUser(e.value[0])
        setVisible(true)
    }

    const Del = () => {
        deleteUsers(selectedUser._id)
    }

    const accept = (data) => {
        if (from.current === "d") {
            Del()
        }
        if (from.current === "u") {
            updateUsers(d.current)
            // setVisible(false)
        }
    }

    const reject = () => {
        setVisible(false)
    }

    const confirm1 = () => {
        from.current = "u"
        confirmDialog({
            message: 'Are you sure you want to update?',
            header: 'Confirmation',
            icon: 'pi pi-exclamation-triangle',
            defaultFocus: 'accept',
            accept,
            reject
        });
    };

    const confirm2 = () => {
        from.current = "d"
        confirmDialog({
            message: 'Do you want to delete this record?',
            header: 'Delete Confirmation',
            icon: 'pi pi-info-circle',
            defaultFocus: 'reject',
            acceptClassName: 'p-button-danger',
            accept,
            reject
        });
    };

    const onSubmit = (data) => {
        confirm1()
        d.current = data
        form.reset()
    };
    const handelClick = () => {
        setVisible11(true)
        setNewU(true)
    }

    if (isLoading) return <div className="card">
        <ProgressSpinner style={{ width: '50px', height: '50px' }} strokeWidth="8" fill="var(--surface-ground)" animationDuration=".5s" />
    </div>
    if (isError) return <h2>אין משתמשים רשומים במערכת</h2>

    return (
        <>
            <Button onClick={handelClick} label='הוספת משתמש' rounded aria-label="Filter" />
            {newU ? <NewUser refetch={refetch} visible={visible11} setVisible={setVisible11} /> : ""}

            <Dialog header="ניהול משתמשים " visible={visible} style={{ width: '50vw' }} onHide={() => setVisible(false)}>
                <form onSubmit={form.handleSubmit(onSubmit)} className="flex flex-column gap-2">
                    <ConfirmDialog />
                    <Controller
                        name="name"
                        control={form.control}
                        rules={{ required: 'Value is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>
                                    שם מלא
                                </label>
                                <InputText id={field.name} value={field.value} onChange={field.onChange} autoFocus className={classNames({ 'p-invalid': fieldState.invalid })} />
                            </>
                        )}
                    />
                    <Controller
                        name="username"
                        control={form.control}
                        rules={{ required: 'Value is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>
                                    שם משתמש
                                </label>
                                <InputText inputId={field.name} value={field.value} onChange={field.onChange} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                     {ie_u ?   <div className="flex flex-wrap align-items-center mb-3 gap-2">
                        <Message severity="error" text={e_u.data.message}/></div> : <></>}
                    <Controller
                        name="ID"
                        control={form.control}
                        rules={{ required: 'Value is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>
                                    תעודת זהות
                                </label>
                                <InputText inputId={field.name} {...field} onChange={field.onChange} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="email"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <label htmlFor="ab">
                                    כתובת מייל
                                </label>
                                <InputText inputId={field.name} defaultValue={selectedUser.email} onChange={field.onChange} inputRef={field.ref} />
                            </>
                        )}
                    />
                    <Controller
                        name="phone"
                        control={form.control}
                        rules={{ required: 'Value is required.' }}
                        render={({ field, fieldState }) => (
                            <>
                                <label htmlFor={field.name}>
                                    פלאפון
                                </label>
                                <InputText inputId={field.name} defaultValue={selectedUser.phone} onChange={field.onChange} inputRef={field.ref} className={classNames({ 'p-invalid': fieldState.error })} />
                                {getFormErrorMessage(field.name)}
                            </>
                        )}
                    />
                    <Controller
                        name="address"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <label htmlFor="ad">
                                    כתובת
                                </label>
                                <InputText inputId={field.name} defaultValue={selectedUser.address} onChange={field.onChange} inputRef={field.ref} />
                            </>
                        )}
                    />
                    <Controller
                        name="secondPhone"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <label htmlFor="ae">
                                    פלאפון נוסף
                                </label>
                                <InputText inputId={field.name} defaultValue={selectedUser.secondPhone} onChange={field.onChange} inputRef={field.ref} />
                            </>
                        )}
                    />
                    <Controller
                        name="birthDate"
                        control={form.control}
                        render={({ field }) => (
                            <>
                                <label htmlFor="af">
                                    תאריך לידה
                                </label>
                                <Calendar inputId={field.name} defaultValue={selectedUser.birthDate} onChange={field.onChange} inputRef={field.ref} />
                            </>
                        )}
                    />

                    <Button type="submit" icon="pi pi-check" label="עדכון" className="mr-2"></Button>


                </form>
                {ie ? <div className="card flex flex-wrap align-items-center justify-content-center gap-3">
                    <Message severity="error" text={e.data.message} /></div> : <></>}
                <br />
                <p className="flex flex-column gap-2">
                    <Button onClick={confirm2} icon="pi pi-times" label="מחיקה" className=" mr-2"></Button></p>
            </Dialog>

            <div className="card">
                {users?.length && <DataTable value={users}
                    selectionMode="uu"
                    selection={selectedUser} onSelectionChange={(e) => { handleSetSelectedUser(e) }}
                    tableStyle={{ minWidth: '50rem' }}>
                    <Column field="active" header="פעיל/לא פעיל"></Column>
                    <Column field="roles" header="תפקיד"></Column>
                    <Column field="birthDate" header="תאריך לידה"></Column>
                    <Column field="ID" header="תעודת זהות"></Column>
                    <Column field="address" header="כתובת"></Column>
                    <Column field="email" header="כתובת מייל"></Column>
                    <Column field="secondPhone" header="פלאפון נוסף"></Column>
                    <Column field="phone" header="פלאפון"></Column>
                    <Column field="username" header="שם משתמש"></Column>
                    <Column field="name" header="שם מלא"></Column>
                </DataTable>}
            </div>
        </>
    );
};
export default UserList;