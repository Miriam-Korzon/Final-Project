import React, { useEffect } from 'react';
import { Menubar } from 'primereact/menubar';
import { InputText } from 'primereact/inputtext';
import { Badge } from 'primereact/badge';
import { Chip } from 'primereact/chip';
import FromToken from '../fromToken';


const TemplateDemo = () => {

    const user = FromToken()
    const itemRenderer = (item) => (
        <a className="flex align-items-center p-menuitem-link">
            <span className={item.icon} />
            <span className="mx-2">{item.label}</span>
            {item.badge && <Badge className="ml-auto" value={item.badge} />}
            {item.shortcut && <span className="ml-auto border-1 surface-border border-round surface-100 text-xs p-1">{item.shortcut}</span>}
        </a>
    );
    const items = [
        {
            label: 'דף הבית',
            icon: 'pi pi-home',
            url: "/home"
        },
        {
            label: 'קורסים',
            icon: 'pi pi-star',
            url: "/courses"
        },
        {
            label: 'הקורסים שלי',
            icon: 'pi pi-star',
            url: "/MyCourses"
        },
        {
            label: 'ניתוק',
            icon: 'pi-directions',
            url: "/DisConnection"
        }
    ];

    const items2 = [
        {
            label: 'דף הבית',
            icon: 'pi pi-home',
            url: "/home"
        },
        {
            label: 'קורסים',
            icon: 'pi pi-star',
            url: "/setCourses"
        },
        {
            label: 'משתמשים',
            icon: 'pi pi-star',
            url: "/users"
        },

        {
            label: 'ניתוק',
            icon: 'pi-directions',
            url: "/DisConnection"
        },
    ];

    const items3 = [
        {
            label: 'דף הבית',
            icon: 'pi pi-home',
            url: "/home"
        },
        {
            label: 'כניסת משתמש',
            icon: 'pi pi-star',
            url: "/login"
        },
    ];

    const start = <img alt="logo" src="http://localhost:1155/logo.gif" height="40" className="mr-2"></img>;
    const end = (
        <div className="flex align-items-center gap-2">
            {/* <InputText placeholder="Search" type="text" className="w-8rem sm:w-auto" /> */}
            {user._id ? <Chip label={user.name} /> : <></>}
        </div>
    );
    return (
        <div className="card">
            <Menubar model={user._id ? (user.roles === "Admin" ? items2 : items) : items3} start={start} end={end} />
        </div>
    )
}
export default TemplateDemo
