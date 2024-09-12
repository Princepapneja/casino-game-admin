import React from 'react'
import Modal from '../../utils/Modal'
import { BadgeCheck, Ban, ShieldAlert } from 'lucide-react'
import useGlobal from '../../../hooks/useGlobal'
import apiHandler from '../../../functions/apiHandler'

const UserActions = ({ properties }) => {
    const { success, render, setRender, error } = useGlobal()
    const { access } = properties
    const handleMentalVerify = async (properties, access) => {
        const { healthID } = properties
        try {
            const { data } = await apiHandler.put("verify-health-id", { healthID, access })
            setRender(!render)
            success(data.message);
        } catch (err) {
            error(err.message);
        }
    }
    return (
        <>
            <div className='flex gap-2'>

                {
                    access !== "full" &&
                    <Modal openCTA={<span title="Verify"> <BadgeCheck className='w-5 text-green-500' /> </span>} secondCtaText={"Verify"} firstCtaText={"Cancel"} handleSecondCta={() => { handleMentalVerify(properties, "full") }} className={`grid place-items-center !md:max-w-[unset] !w-[unset]`}>
                        <p className='max-w-80 whitespace-normal text-center normal-case'>Do you want to verify the Health ID of <span className="text-text font-bold">{properties?.firstName} {properties?.lastName}</span>? </p>
                        <span className='block text-yellow-500 text-xs max-w-80 text-center mt-2 normal-case'> This will grant full access to the app.</span>
                    </Modal>
                }

                {
                    access !== "restricted" &&
                    <Modal openCTA={<span title="Limited access"> <ShieldAlert className='w-5 text-yellow-500' /> </span>} secondCtaText={"Confirm"} firstCtaText={"Cancel"} handleSecondCta={() => { handleMentalVerify(properties, "restricted") }} className={`grid place-items-center !md:max-w-[unset] !w-[unset]`}>
                        <p className='max-w-80 text-center whitespace-normal normal-case' >Do you want to give limited access to the Health ID of <span className="text-text font-bold">{properties?.firstName} {properties?.lastName}</span>? </p>
                        <span className='block text-yellow-500 text-xs max-w-80 text-center mt-2 normal-case'> This will grant limited access to the app.</span>
                    </Modal>
                }

                {
                    access !== "blocked" &&
                    <Modal openCTA={<span title="Block"> <Ban className='w-5 text-red-500' /> </span>} secondCtaText={"Block"} firstCtaText={"Cancel"} handleSecondCta={() => { handleMentalVerify(properties, "blocked") }} className={`grid place-items-center !md:max-w-[unset] !w-[unset]`}>
                        <p className='max-w-80 whitespace-normal text-center normal-case'>Do you want to block the Health ID of <span className="text-text font-bold">{properties?.firstName} {properties?.lastName}</span>? </p>
                        <span className='block text-yellow-500 text-xs max-w-80 text-center mt-2 normal-case'> This will not grant any access to the app.</span>
                    </Modal>
                }
            </div>

        </>
    )
}

export default UserActions