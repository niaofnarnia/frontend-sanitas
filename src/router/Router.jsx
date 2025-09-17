import { createBrowserRouter } from "react-router-dom";
import Layout from "../layout/Layout";
import Medication from "../pages/Medication";
import AddMedication from "../pages/AddMedication";

const routerMedications = createBrowserRouter([{
    path: "/",
    element: <Layout></Layout>,
    children: [
        // {
        //     index: true,
        //     element: <Home/>
        // },
        {
            path: "/medication",
            element: <Medication/>
        },
        {
            path: "/add-medication/",
            element: <AddMedication/>
        },
    ]
}])

export default routerMedications;