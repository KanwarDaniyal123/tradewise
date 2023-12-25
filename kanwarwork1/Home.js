import React, { useState } from 'react'; // Import useState
import { useNavigate } from 'react-router-dom';

function Home() {
    const [roomid, setRoomID] = useState(''); // Initialize state with an empty string
    const navigate = useNavigate();

    const handleJoin = () => {
        navigate(`/room/${roomid}`); // Corrected the template string syntax
    };

    return (
        <div>
            <input
                type='text'
                placeholder='Enter RoomID'
                value={roomid}
                onChange={e => setRoomID(e.target.value)} // Corrected the onChange handler
            />
            <button onClick={handleJoin}>Join</button> // Corrected the onClick syntax
        </div>
    );
}

export default Home;
