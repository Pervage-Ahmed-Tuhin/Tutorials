
import { hash, compare } from "bcrypt";


import { Model, model, ObjectId, Schema } from "mongoose";
//interface for user
interface UserDocument {
    name: string;
    email: string;
    password: string;
    verified: boolean;
    avatar?: { url: string, publicId: string };
    tokens: string[];
    favourites: ObjectId[];
    followers: ObjectId[];
    followings: ObjectId[];
}

interface Methods {
    comparePassword: (password: string) => Promise<boolean>
}

//now making a schema for user

const userSchema = new Schema<UserDocument, {}, Methods>({
    name: {
        type: String,
        required: true,
        trim: true
    },
    email: {
        type: String,
        required: true,
        trim: true,
        unique: true
    },
    password: {
        type: String,
        required: true
    },
    avatar: {
        type: Object,
        url: String,
        publicId: String
    },
    verified: {
        type: Boolean,
        default: false
    },
    favourites: [{
        type: Schema.Types.ObjectId,
        ref: 'Audio'
    }],
    followers: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    followings: [{
        type: Schema.Types.ObjectId,
        ref: 'User'
    }],
    tokens: [String]
}, { timestamps: true });



userSchema.pre("save", async function (next) {

    //hash the password
    if (this.isModified('password')) {
        this.password = await hash(this.password, 10);
    }

    next();
});

userSchema.methods.comparePassword = async function (password) {
    const result = await compare(password, this.password);
    return result;
};




//creating the modle 

export default model("User", userSchema) as Model<UserDocument, {}, Methods>;
