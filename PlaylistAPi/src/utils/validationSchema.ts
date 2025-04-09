
import * as Yup from 'yup';

import { isValidObjectId } from 'mongoose';
import { title } from 'process';
import { categories } from './audio_category';

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


export const SignInValidationSchema = Yup.object().shape({
    email: Yup.string().email('Invalid email').required('Email is required'),
    password: Yup.string().trim().required('Password is missing')


});



export const AudioValidationSchema = Yup.object().shape({
    title: Yup.string().required('title is missing'),
    about: Yup.string().required('About is missing'),
    category: Yup.string().oneOf(categories, "Invalid categories").required('Category is missing'),


});


// while creating playlist there can be request
// with new playlist name and the audio that user wants to store inside that playlist
// or user just want to create an empty playlist

export const NewPlaylistValidateSchema = Yup.object().shape({

    title: Yup.string()
       
        .required('Title is required'),

    resId: Yup.string().transform(function (value) {
        if(this.isType(value) && isValidObjectId(value)) {
            return value;
        }
        else{
            return "";
        }

    }),

    visibility: Yup.string().oneOf(["public", "private"], "Invalid visibility!").required("Visibility is missing"),
        
        

    
});
