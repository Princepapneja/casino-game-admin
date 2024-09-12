import moment from "moment"
import { dateFormat } from "../../../../constants"
import Persona from "../../utils/persona"
import ViewData from "../actions/viewData"

export const mood = [
    {
        name: "actions",
        sticky:true,
        checked: true, cell: (properties) => {
            return <div className="flex justify-center p-4">
                <ViewData type="mood" data={properties} />
            </div>



        }
    },
    {
        name: "Name", checked: true, accessor: "patient.fullName", cell: (properties) => (
            <div className='flex gap-3 items-center p-2'>
                <Persona path={properties?.patient?.image} />
                <span className="">{properties?.patient?.fullName} </span>
            </div>
        )
    },
    {
        name: "email", accessor: "patient.email", checked: true, cell: (properties) => {
            return <span className='lowercase'>{properties?.patient?.email}</span>

        }
    },
    {
        name: "Date & Time", checked: true, accessor: "createdAt", cell: (properties) => {
            return moment(properties?.createdAt).format(`${dateFormat + " HH:mm:ss"}`)

        }
    },

    {
        name: "mood", checked: false, accessor: "mood",
    },
    {
        name: "active", checked: false, accessor: "active",
    },
    {
        name: "eat", checked: false, accessor: "eat",
    },
    {
        name: "sleep", checked: false, accessor: "sleep",
    },
    {
        name: "Status", checked: true, accessor: "status",
    },
 
    {
        name: "Age", checked: true, accessor: "patient.age", cell: (properties) => {
            return properties?.patient?.age;
        }
    },
    {
        name: "Gender", checked: true, accessor: "patient.gender", cell: (properties) => {
            return properties?.patient?.gender;
        }
    },
   
    // { name: "Request Date", checked: true, cell:(properties) => (moment(properties?.createdAt).format("DD/MM/YYYY"))},
]