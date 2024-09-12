import { useEffect, useState } from 'react';
import Modal from '../../utils/Modal';
import { Edit, Pencil } from 'lucide-react';
import InputField from '../../utils/InputFields';
import useGlobal from '../../../hooks/useGlobal';
import profile from '../cols-json/profileCols'
import timeZone from "../../../../public/json/timezone.json"
import apiHandler from '../../../functions/apiHandler';
import { uploadFile } from '../../../services/s3Bucket';

const EditData = ({ type, data }) => {
    const [inputItems, setInputItems] = useState(data);
    const [isCtaDisable, setIsCtaDisable] = useState(true);
    const { success, error, render, setRender } = useGlobal();
    const [columns, setColumns] = useState([]);

    
    function handleEditInput(event) {
        const { name, type, value, files, checked } = event.target;
        setInputItems((prevItems) => {
            let newValue;

            if (type === 'file') {
                newValue = files.length > 0 ? files[0] : null;
            } else if (type === 'checkbox') {
                newValue = checked;
            } else {
                newValue = value;
            }

            return {
                ...prevItems,
                [name]: newValue,
            };
        });

        setIsCtaDisable(false);
    }

    const handleSubmit = async () => {        // Changes are Required
        let url = "";
        let finalTemp = { ...inputItems };
        if (type === "blog") {
            url = `blogs/${inputItems?._id}`;
        } else {
            url = `user/${type}/${inputItems?._id}`;
        }

        try {
            if(finalTemp?.phone?.length !== 10) {
                throw new Error("Phone number must be 10 characters");
            }

            if (finalTemp?.image && typeof finalTemp.image !== "string") {
                finalTemp.image = await uploadFile(finalTemp.image, type);
            }
            // if (type === "clinician") {
            //     finalTemp["shiftStart"] = convertTimeSlot(finalTemp?.shiftStart);
            //     finalTemp["shiftEnd"] = convertTimeSlot(finalTemp?.shiftEnd);
            // }
          
            const { data } = await apiHandler.put(url, finalTemp);
            setRender(!render);
            success(data.message);
            setInputItems({});
        } catch (err) {
            error(err.message);
        }
    };

    const handleEditorChange = (event) => {
        setInputItems((prevItems) => ({
            ...prevItems,
            description: event,
        }));
        setIsCtaDisable(false);
    };


    useEffect(() => {
        fieldSetup()
    }, [type])


    const fieldSetup = () => {
       if (type === "admin") {
            setColumns(profile)
        } else if(type==="user") {
            setColumns(profile)   // add user json
        }
    }

    return (
        <>
            <Modal
                openCTA={<span title="Edit"><Pencil className='w-5 text-blue-500' /></span>}
                heading={"Edit Details"}
                firstCtaText={"Close"}
                secondCtaText={"Save"}
                handleSecondCta={handleSubmit}
                disableCTA={isCtaDisable ? "secondCta" : ""}
                className={`${type === "blog" && "md:max-w-[70%] "}`}
            >
                <div>
                    <div className={`grid gap-4  md:grid-cols-2 grow mt-4 overflow-auto max-h-[400px] ${type === "blog" && "!grid-cols-3"}`}>
                        {columns?.map((data, i) => {
                            const { key, key2, heading, hidden, disable, placeholder, options, value } = data
                            if (hidden) {
                                return null;
                            } else if (data?.type === "file") {
                                const id = Date.now()
                                return (
                                    <div className={`col-span-2 grid place-items-center`} key={i}>
                                        <span className='relative'>
                                            <input
                                                type='file'
                                                className='hidden'
                                                name='image'
                                                id={id}
                                                onChange={handleEditInput}
                                                accept="image/*"
                                            />
                                            <label htmlFor={id} className='bg-background w-32 block'>
                                               
                                                <img
                                                    className='w-32 h-32 object-cover'
                                                    src={inputItems?.image
                                                        ? (typeof inputItems.image === "string"
                                                            ? inputItems.image
                                                            : URL.createObjectURL(inputItems.image))
                                                        : type === "categories"
                                                            ? "/logos/TCFWC.png"
                                                            : "/Images/persona.avif"}

                                                    alt=''

                                                />
                                                <div className='absolute top-0 right-0 w-5 bg-white backdrop-blur-3xl  '>
                                                    <Edit className='w-5 text-black' />
                                                </div>
                                            </label>
                                        </span>
                                    </div>
                                );
                            } else {
                               
                                return (
                                    <InputField
                                        className={`${(data?.type === "textarea" || data?.type === "textEditor") && (type === "blog" ? "col-span-3" : "xl:!col-span-2")} ${i % 2 !== 0 && "last:col-span-2"}`}
                                        key={i}
                                        value={key2 ? inputItems?.[key]?.[key2] : inputItems?.[key]}
                                        label={heading}
                                        id={key}
                                        checked={inputItems?.[key] === value}
                                        handleInputChange={handleEditInput}
                                        handleEditorChange={handleEditorChange}
                                        isDisable={disable}
                                        type={data?.type}
                                        max={data?.max}
                                        prefix={data?.prefix}
                                        placeholder={placeholder}
                                        options={options}
                                    />
                                );
                            }
                        })}
                    </div>
                </div>
            </Modal>
        </>
    );
};

export default EditData;
