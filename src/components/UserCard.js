import React from 'react';
import { useSelector} from 'react-redux';



export default function UserCard(){
    const user = useSelector(state => state.user);
    return (
        <div>
            <h1>User Card</h1>
            <p>Name: {user.name}</p>
            <p>Email: {user.email}</p>
        </div>
    )

}

