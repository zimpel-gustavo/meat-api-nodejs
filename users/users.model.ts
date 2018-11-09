import * as mongoose from 'mongoose';
import {enumGender} from './users.enum';
import {validateCPF} from '../common/validators';

export interface User extends mongoose.Document {
    name:string,
    email:string,
    password:string
}

const userSchema = new mongoose.Schema({
    name: {
        type:String,
        required:true,
        maxlength:80,
        minlength:3
    },
    email:{
        type:String,
        unique:true,
        match:/^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
        required:true

    },
    password:{
        type:String,
        select:false,
        required:true
    },
    gender:{
        type:String,
        required:false,
        enum:enumGender
    },
    cpf:{
        type:String,
        required:false,
        validate:{
            validator:validateCPF,
            message:'{PATH}: invalid CPF ({VALUE})'
        }
    }
});


export const User = mongoose.model<User>('User', userSchema);
