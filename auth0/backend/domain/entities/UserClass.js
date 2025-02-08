import crypto from 'crypto';

class UserClass {
    constructor(id, username, email, password, friends = []) {
        
        this.id = id || crypto.randomUUID();
        this.username = username;
        this.email = email;
        this.password = password;
        this.friends = friends;


        
    }
}

export default UserClass;