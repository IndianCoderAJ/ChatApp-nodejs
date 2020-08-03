const users = [];
let errors;
const addUser = ({ id, name, room}) => {
 name = name.trim().toLowerCase();
 room = room.trim().toLowerCase();
 const existingUser = users.find((users) => {users.room ===room && users.name === name});
 
 if(existingUser){
     errors = "User Already In a Room"
     return{errors};
 }
 const user = { id, name, room};
 users.push(user);
 return {user}
}

const removeUser = ({id}) => {

    const index = user.findIndex((user) => { user.id === id});
    if(index !== -1) {
       return users.splice(index, 1)[0];
    }
    users

}

const getUser = (id) => {
    let  currentUser =  users.find((user) => user.id == id)
    return {currentUser}
 };


const getUserInRoom = (room) => users.filter((user) => {user.room == room});

module.exports  = { addUser, removeUser, getUser, getUserInRoom}
