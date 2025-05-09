
import * as Yup from 'yup';

import { isValidObjectId } from 'mongoose';

export const CreateUserSchema = Yup.object().shape({
    name: Yup.string().trim().required('Name is required').min(3, 'Name must be at least 3 characters').max(20, 'Name must be at most 20 characters'),
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().trim().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter and one number')
})



export const TokenAndIdValidation = Yup.object().shape({

    token: Yup.string().trim().required("invalid token!"),
    userId: Yup.string().transform(function (value) {
        if (this.isType(value) && isValidObjectId(value)) {
            return value;
        } else {
            return "";
        }
    }).required("invalid user id!"),
});

export const UpdatePasswordSchema = Yup.object().shape({

    token: Yup.string().trim().required("invalid token!"),
    userId: Yup.string().transform(function (value) {
        if (this.isType(value) && isValidObjectId(value)) {
            return value;
        } else {
            return "";
        }
    }).required("invalid user id!"),
    password: Yup.string().trim().required('Password is required').min(8, 'Password must be at least 8 characters').matches(/^(?=.*[A-Z])(?=.*[a-z])(?=.*\d)(?=.*[@$!%*?&])[A-Za-z\d@$!%*?&]{8,}$/, 'Password must contain at least one uppercase letter, one lowercase letter and one number')
});


