import Persona from "../../utils/persona"
import DeleteData from "../actions/deleteData"
import EditData from "../actions/editData"
import ViewData from "../actions/viewData"

export const Admin = [
    {
        name: "actions" ,sticky:true, checked: true, cell: (properties) => {
            return <div className='flex gap-2 p-4 justify-center '>
                <ViewData data={properties} type="admin"  />
                <EditData type={"admin"} data={properties} />
                <DeleteData type={"admin"} properties={properties} />
            </div>

        }
    },
    {
        name: "Name", checked: true, accessor: "fullName", cell: (properties) => (
            <div className='flex gap-3 items-center p-2'>
                <Persona path={properties?.image} />
                <span className=""> {properties?.fullName}</span>
            </div>
        )
    },
    {
        name: "email", checked: true, accessor: "email", cell: (properties) => {
            return <span className='lowercase'>{properties?.email}</span>

        }
    },

    {
        name: "access", checked: true, accessor: "access",
    },
    {
        name: "phone number", checked: true, accessor: "phone",cell: (properties) => {
            return properties?.phone && "+1 " + properties?.phone;

        }
    },
    
    // { name: "Request Date", checked: true, cell:(properties) => (moment(properties?.createdAt).format("DD/MM/YYYY"))},
]