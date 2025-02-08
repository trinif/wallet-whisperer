import User from '../dynamo/UsersTable.js';
import s3 from '../s3.js';

const create = async (userData) => {
  try {
    const user = new User(userData);
    const savedUser = await user.save();
    return savedUser;
  } catch (error) {
    console.error("Error creating user:", error);
    throw error; // Re-throw the error to be handled by the calling function if needed
  }
};

const findById = async (id) => {
  try {
    const user = await User.get(id);
    return user || null;
  } catch (error) {
    console.error("Error finding user by ID:", error);
    throw error;
  }
};

const findByUsername = async (username) => {
  try {
    const users = await User.query('username').eq(username).exec();
    return users[0] || null;
  } catch (error) {
    console.error("Error finding user by username:", error);
    throw error;
  }
};

const updatePassword = async (username, password) => {
  try {
    const user = await findByUsername(username);
    const userId = user.id;

    await User.update(
      { id: userId },
      { password: password }
    );

    return true; 

  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

const updateEmail = async (username, email) => {
  try {
    const user = await findByUsername(username);
    const userId = user.id;

    await User.update(
      { id: userId },
      { email: email }
    );

    return true; 
    
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

const updateUsername = async (username) => {
  try {
    const user = await findByUsername(username);
    const userId = user.id;

    await User.update(
      { id: userId },
      { username: username }
    );

    return true; 
    
  } catch (error) {
    console.error("Error updating password:", error);
    throw error;
  }
};

const getAllUsers = async () => {
  try {
    const allUsers = await User.scan().exec((error, results) => {
      if (error) {
          console.error(error);
      } else {
          console.log(results);
          console.log(results[0]);
          console.log(results.count);
          console.log(Array.isArray(results));
          console.log(results.scannedCount);
      }
      return results;
  });
  } catch (error) {
    console.error("Error getting all users:", error);
    throw error;
  }
};

const deleteUser = async (id) => {
  try {
    await User.delete(id);
    return true;
  } catch (error) {
    console.error("Error deleting user:", error);
    throw error;
  }
};

export { create, findById, findByUsername, updateEmail, deleteUser, updatePassword, getAllUsers, updateUsername };
