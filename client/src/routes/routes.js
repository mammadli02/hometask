import AddPeoples from "../pages/AddPeoples";
import DetailPeople from "../pages/Detailpeople";
import EditPages from "../pages/EditPages";
import Home from "../pages/Home";
import MainRoot from "../pages/MainRoot";
import NotFound from "../pages/NotFound";
import Peoples from "../pages/Peoples";


export const ROUTES = [
    {
        path:'/',
        element: <MainRoot/>,
        children:[
            {
            path:'/',
            element: <Home/>
        },
            {
                path:'/peoples',
                element: <Peoples/>
            },
            
            {
                path:'/add-people',
                element: <AddPeoples/>
            },
            {
                path:'/peoples/:id',
                element: <DetailPeople/>
            },
            {
                path:'/peoples/edit/:id',
                element: <EditPages/>
            },
            {
                path:'*',
                element: <NotFound/>
            }
        ]
    }
]