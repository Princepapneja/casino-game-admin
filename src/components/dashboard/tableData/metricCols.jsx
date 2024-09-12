import moment from "moment"
import { dateFormat } from "../../../../constants";
import ViewData from "../actions/viewData";
import Persona from "../../utils/persona";

export const metric = [
    {
        name: "actions",
        checked: true,
        sticky: true,
    
        cell: (properties) => {
            return <div className="flex p-4 justify-center"><ViewData type="metric" data={properties} /></div>;
        }
    },
    {
        name: "Name",
        accessor: "patient.fullName",
        checked: true,
        cell: (properties) => (
            <div className='flex gap-3 items-center p-2'>
                <Persona path={properties?.patient?.image} />
                <span className="">{properties?.patient?.fullName} </span>
            </div>
        )
    },
    {
        name: "email",
        accessor: "patient.email",
        checked: true,
        cell: (properties) => {
            return <span className='lowercase'>{properties?.patient?.email}</span>
        }
    },
    {
        name: "Date & Time",
        accessor: "createdAt",
        checked: true,
        cell: (properties) => {
            return  moment(properties?.createdAt).format(`${dateFormat + " HH:mm:ss"}`)
        }
    },
    {
        name: "status",
        accessor: "status",
        checked: true,
    },
    {
        name: "Result", checked: true, accessor: "result", cell: (properties) => {
            return  properties?.result && <span>{properties?.result}%</span>
        }
    },
    {
        name: "mood",
        accessor: "mood",
        checked: false,
    },
    {
        name: "meditate",
        accessor: "meditate",
        checked: false,
    },
    {
        name: "stress Level",
        accessor: "stressLevel",
        checked: false, 
    },
    {
        name: "sleep Quality",
        accessor: "sleepQuality",
        checked: false
    },
    {
        name: "substances",
        accessor: "substances",
        checked: false,
     
    },
    {
        name: "medication",
        accessor: "medication",
        checked: false,
       
    },
    {
        name: "substance Time",
        accessor: "substanceTime",
        checked: false,
       
    },
    {
        name: "frequently",
        accessor: "frequently",
        checked: false,
       
    },
    {
        name: "history",
        accessor: "history",
        checked: false,
       
    },
    {
        name: "symptoms",
        accessor: "symptoms",
        checked: false,
       
    },
    {
        name: "happy Things",
        accessor: "happy",
        checked: false,
      
    },
    {
        name: "Gender",
        accessor: "patient.gender",
        checked: true,
        cell: (properties) => {
            return properties?.patient?.gender;
        }
    },
  
];
