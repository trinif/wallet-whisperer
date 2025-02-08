import UserClass from '../../domain/entities/UserClass.js';
import { addNewUser, removeUser, returnAllUsers, getUserById, updateUserPassword, updateUserEmail, updateUserUsername  } from '../services/UserServices.js';

const addNewUserToDatabase = async (req, res) => { 
    try {
        console.log(req.body)
        const { id, username, email, password, friends } = req.body;
        console.log(username)
        const returnUser = {id: id, username: username, email: email, password: password, friends: friends}; 
        const userServiceReturn = await addNewUser(returnUser);

        return res.status(201).json(returnUser);
    }
    catch (error) {
        console.log(req.body);
        console.error('Error creating user:', error);
        return res.status(500).json({ error: "Error creating user" });
    }
}

/*const getUserById = async (req, res) => {
    try {
        const userId = req.params.id;
        const returnUserId = getUserById(userId);
        return res.status(200).json(returnUserId);
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
}
    */

const updatePasswordByUsername = async (req, res) => {
    try {
        const { username, password } = req.body;
        const returnUserId = updateUserUsername(username, password);
        return res.status(200).json(returnUserId);
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const updateEmailByUsername = async (req, res) => {
    try {
        const { username, email } = req.body;
        const returnUserId = updateUserEmail(username, email);
        return res.status(200).json(returnUserId);
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const updateUsernameByUsername = async (req, res) => {
    try {
        const { username } = req.body;
        const returnUserId = updateUserPassword(username);
        return res.status(200).json(returnUserId);
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
}



const getAllUsers = async (req, res) => {
    try {
        const allUsers = returnAllUsers();
        console.log("hi");
        return res.status(200).json(allUsers);
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
}

const removeUserById = async (req, res) => {
    try {
        const userId = req.params.id; 
        const resultRemoveUser = removeUser(userId);
        return res.status(204).json(resultRemoveUser); 
    }
    catch (error) {
        console.error('Error:', error);
        return res.status(500).json({ error: "Internal server error" });
    }
}


export {
    getUserById, 
    updateUsernameByUsername,
    updatePasswordByUsername,
    updateEmailByUsername,
    getAllUsers,
    removeUserById,
    addNewUserToDatabase

};