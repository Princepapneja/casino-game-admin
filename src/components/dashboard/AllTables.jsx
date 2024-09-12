import { useEffect, useMemo, useState } from 'react'
import { Check, Plus, SquareX } from 'lucide-react'
import useGlobal from '../../hooks/useGlobal'
import { userCols } from './tableData/userCols'
import { Admin } from './tableData/adminCols'
import Card from '../utils/card'
import ReUseAbleTable from '../utils/reUseAbleTable'
import apiHandler from '../../functions/apiHandler'

const AllTables = ({ type }) => {
    const { patients, render, setRender } = useGlobal()
    const [columns, setColumns] = useState()

    useEffect(() => {
        const newColumns =
            type === "profile" ? Admin : userCols
        setColumns(newColumns);
    }, [type, patients, render]);

    const fetchData = async (skip, count, order, orderBy, search, active) => {
        try {
            let url;
            switch (type) {
                case "admins":
                    url = `admin?skip=${skip}&count=${count}`
                    if (active === 1) url += '&access=full';
                    else if (active === 2) url += '&access=blocked';
                    break;
                case "users":
                    url = `users?skip=${skip}&count=${count}`;
                    switch (active) {
                        case 1:
                            url += '&access=restricted';
                            break;
                        case 2:
                            url += '&access=full';
                            break;
                        case 3:
                            url += '&access=blocked';
                            break;
                    }
                    break;
                case "profile":
                    url = `admin?skip=${skip}&count=${count}`;
                    break;
                default:
                    throw new Error("Invalid type provided");
            }

            if (search) {
                url += url.includes('?') ? `&search=${search}` : `?search=${search}`;
            }
            if (order && orderBy) {
                url += `&order=${order}&orderBy=${orderBy}`;
            }

            const response = await apiHandler.get(url);
            const { data } = response;
            const responseData = data?.data?.resp || [];
            const totalCount = data?.data?.totalCount || 0;
            return { data: responseData, totalCount: totalCount };
        } catch (error) {
            console.error("Error fetching data:", error);
            throw error; // Re-throw the error to propagate it up the call stack
        }
    };

    const handleFileData = async (data) => {
        const obj = data?.map((e) => {
            if (type === "users") {
                return {
                    Name: e?.fullName,
                    Email: e?.email,
                    Age: e?.age,
                    Access: e?.access,
                    Gender: e?.gender,
                }
            } else if (type === "admins") {
                return {
                    Name: e?.fullName,
                    Email: e?.email,
                    "Phone Number": e?.phone,
                    Access: e?.access
                }
            }
        })
        return obj
    }

    const buttons = useMemo(() => {
        const commonFunc = () => setRender(!render);

        const buttonConfigs = {
            "users": [
                { name: "All", icon: <Plus />, func: commonFunc },
                { name: "Unverified", icon: <Check />, func: commonFunc },
                { name: "Verified", icon: <Check />, func: commonFunc },
                { name: "Blocked", icon: <SquareX />, func: commonFunc }
            ],
            "admins": [
                { name: "All", icon: <Plus />, func: commonFunc },
                { name: "Full", icon: <Check />, func: commonFunc },
                { name: "Blocked", icon: <SquareX />, func: commonFunc }
            ],
        };

        return buttonConfigs[type] || [];
    }, [type]);

    return (
        <>
            <Card title={
                <h4 className='capitalize font-bold '>{type}</h4>
            } >
                <ReUseAbleTable buttons={buttons} cols={columns} handleFileData={handleFileData} data={render} fetchData={fetchData} files={type !== "blogs" && type !== "categories"} />
            </Card>

        </>
    )
}

export default AllTables