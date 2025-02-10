
import { FC } from "react";
import AppButton from "./AppButton";


interface Props {
    title?: string;
}

const Noteitem: FC<Props> = ({ title }) => {
    return <div className='bg-white shadow-md rounded p-5'>
        <p className='font-semibold text-lg text-gray-700 mb-4'>
            {title}
        </p>
        <div className='space-x-4'>
            <AppButton title='View' type='normal' onClick={() => {
                console.log('View');
            }} />
            <AppButton title='Update' type='regular' />
            <AppButton title='Delete' type='danger' />

        </div>
    </div>
}
export default Noteitem;
