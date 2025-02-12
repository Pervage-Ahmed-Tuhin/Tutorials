
import { FC } from "react";
import AppButton from "./AppButton";


interface Props {
    title?: string;
    description?: string;
    onEditClick?: () => void;
    onDeleteClick?: () => void;
    onViewClick?: () => void;
}

const Noteitem: FC<Props> = ({ title, onEditClick, onDeleteClick, description, onViewClick }) => {
    return <div className='bg-white shadow-md rounded p-5'>
        <p className='font-semibold text-lg text-gray-700 mb-4'>
            {title}
        </p>
        {description ? <p className="ml-2 mt-2 py-2 text-lg mb-2 ">{description}</p> : null}
        <div className='space-x-4'>
            <AppButton title={description?"Hide":"View"} type='normal'
                onClick={onViewClick} />
            <AppButton onClick={onEditClick} title='Update' type='regular' />
            <AppButton onClick={onDeleteClick} title='Delete' type='danger' />

        </div>
    </div>
}
export default Noteitem;
