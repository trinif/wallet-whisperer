import express from 'express'; 
import { 
    getUserById, 
    getAllUsers, 
    addNewUserToDatabase,  
    removeUserById, 
    updateUsernameByUsername,
    updatePasswordByUsername,
    updateEmailByUsername, } 
from './application/controllers/UserController.js';

import getDirections
from './application/controllers/DirectionsController.js';

import getCustomers
from './application/controllers/CustomerController.js';

const router = express.Router(); 

router.get("/users", getAllUsers); 
router.get("/users/:id", getUserById); 
router.post("/users", addNewUserToDatabase); 
router.delete("/users/:id", removeUserById);
router.put("user/password", updateUsernameByUsername);
router.put("user/username", updatePasswordByUsername);
router.put("user/email", updateEmailByUsername);
router.get("/api/directions", getDirections);
router.get("/customers", getCustomers); 


export default router; 