import Persona from "../../utils/persona"
import EditData from "../actions/editData"
import ViewData from "../actions/viewData"
import UserActions from "../patient/UserActions"

export const userCols = [
    {
        name: "actions",sticky:true, checked: true, cell: (properties) => {
            return <div className='flex gap-2 p-4 justify-center'><ViewData type="patient" data={properties}/><EditData type="patient" data={properties} />
             <UserActions  properties={properties}/>
            </div>
        }
    },
    {
        name: "Name", checked: true, accessor: "fullName", cell: (properties) => (
            <div className='flex gap-3 items-center p-2'>
                <Persona path={properties?.image} />
                <span className="flex items-center"> {properties?.fullName ||  `${properties?.firstName} ${properties?.lastName}`}</span>
            </div>
        )
    },
    {
        name: "email", checked: true, accessor: "email", cell: (properties) => {
            return <span className='lowercase'>{properties?.email}</span>
        }
    },
    {
        name: "Age", checked: true, accessor: "age",
    },
    {
        name: "Mass Health ID", checked: true, accessor: "healthID",
    },
    {
        name: "Gender", checked: true, accessor: "gender",
    },
    {
        name: "Phone", checked: true, accessor: "phone",cell: (properties) => {
            return properties?.phone && "+1 " + properties?.phone;
        }
    },
    {
        name: "Time zone", checked: true, accessor: "timezone",
    },
    {
        name: "Access", checked: true, accessor: "access",
    },
    {
        name: "Bio", checked: true, accessor: "bio",
    },
  
    // { name: "Request Date", checked: true, cell:(properties) => (moment(properties?.createdAt).format("DD/MM/YYYY"))},
]