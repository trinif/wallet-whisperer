import User from "../../infra/dynamo/UsersTable.js";
import { create, findById, deleteUser, updatePassword, getAllUsers, updateUsername } from "../../infra/repositories/UserRepository.js";
import crypto from "crypto";


const getUserById = async (id) => { 
    var user = await findById(id); 
    if (user == null) { 
        throw new Error('It was not possible to get the user by ID')
    }
    return user
}

const addNewUser = async (newUser) => {
    const newUserDb = {
        id: newUser.id, 
        username: setUsername(newUser.username), 
        email: setEmail(newUser.email), 
        password: setPassword(newUser.password),
        friends: Array.isArray(newUser.friends) ? newUser.friends.join(',') : ''
    }
    var returnAddition = await create(newUserDb);

    return returnAddition;
}

const returnAllUsers = async () => { 
    const allUsers = getAllUsers(); 
    console.log("hi");
    return allUsers; 
}

const removeUser = async (id) => {
    const returnDeleteUser = deleteUser(id); 
    if (!returnDeleteUser) { 
        throw new Error('It was not possible to return such value');
    }
    return returnDeleteUser;
}

const updateUserPassword = async (username, password) => {

    const validatedPassword = setPassword(password);
    const returnUserUpdate = updatePassword(username, validatedPassword); 

    if (!returnUserUpdate) { 
        throw new Error('It was not possible to update the user password based on its username');
    }

    return returnUserUpdate;
}

const updateUserEmail = async (username, email) => {

    const validatedEmail = setEmail(email);
    const returnUserUpdate = updateUserEmail(username, validatedEmail); 

    if (!returnUserUpdate) { 
        throw new Error('It was not possible to update the user email based on its username');
    }

    return returnUserUpdate;
}

const updateUserUsername = async (username) => {

    const validatedUsername = setUsername(username);
    const returnUserUpdate = updateUserEmail(validatedUsername); 

    if (!returnUserUpdate) { 
        throw new Error('It was not possible to update the user username based on its username');
    }

    return returnUserUpdate;
}

// Set and validate the username
const setUsername = (username) => {
    if (!username || username.length < 5 || username.length > 30) {
        throw new Error('Username must be between 5 and 30 characters long.');
    }
    return username;
}

// Set and validate the email
const setEmail = (email) => {
    const emailPattern = /^[\w-\.]+@([\w-]+\.)+[\w-]{2,4}$/;
    if (!email || !emailPattern.test(email.toLowerCase())) {
        throw new Error('Invalid email format.');
    }
    return email.toLowerCase().trim();
}

// Set and hash the password
const setPassword = (password) => {
    if (!password || password.length < 8) {
        throw new Error('Password must be at least 8 characters long.');
    }
    return hashPassword(password);
}

// Hash the password
const hashPassword = (password) => {
    const salt = crypto.randomBytes(16).toString('hex');
    const hash = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    return `${salt}:${hash}`;
}

// Authenticate user by comparing password hashes
const authenticate = (password) => {
    const [salt, hash] = this.password.split(':');
    const hashVerify = crypto
        .pbkdf2Sync(password, salt, 10000, 64, 'sha512')
        .toString('hex');
    return hash === hashVerify;
}

// Reset a token field, such as a password reset token
const resetToken = async (tokenField) => {
    this[tokenField] = crypto.randomBytes(64).toString('hex');
    await this.save(); // Save the updated user to DynamoDB
}

export { getUserById, addNewUser, removeUser, returnAllUsers, updateUserPassword, updateUserEmail, updateUserUsername}; 