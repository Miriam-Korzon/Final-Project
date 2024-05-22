import { Outlet } from "react-router-dom"
import TemplateDemo from "./navBar"

const Layout=()=>{
return(
<>
    <div className="page">
        <header ><TemplateDemo/></header>
        <main>
            <Outlet/>
        </main>
        <footer></footer>
    </div>
    </>
)
}
export default Layout