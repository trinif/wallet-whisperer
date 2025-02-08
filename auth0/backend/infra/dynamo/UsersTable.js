import dynamoose from "../db.js";
import crypto from 'crypto';

// UserModel.js
const UserSchema = new dynamoose.Schema({
    id: {
        type: String,
        hashKey: true,
        default: () => crypto.randomUUID(),
    },
    username: {
        type: String,
        required: true,
    },
    email: {
        type: String,
        required: true,
    },
    password: {
        type: String,
        required: true,
    },
    friends: {
        type: String,
    },
});

const User = dynamoose.model("stride_users_table", UserSchema);

export default User;