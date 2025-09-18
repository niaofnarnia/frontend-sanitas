import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Medication from "../pages/Medication";
import AddMedication from "../pages/AddMedication";
import EdditMedication from "../pages/EditMedication";
import Home from "../pages/Home";
import Alerts from "../pages/Alerts";

const routerMedications = createBrowserRouter([{
    path: "/",
    element: <Layout/>,
    children: [
        {
            index: true,
            element: <Home/>
        },
        {
            path: "/medication",
            element: <Medication/>
        },
        {
            path: "/alerts/",
            element: <Alerts/>
        },
        {
            path: "/add-medication/",
            element: <AddMedication/>
        },
        {
            path: "/edit-medication/",
            element: <EdditMedication/>
        },
    ]
}])

export default routerMedications;