import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Backlogs() {
    const [loginBacklogs, setLoginBacklogs] = useState([]);
    const [roomBacklogs, setRoomBacklogs] = useState([]);

    useEffect(() => {
        // Fetch login_backlogs
        axios.get('/login-backlogs')
            .then(response => setLoginBacklogs(response.data))
            .catch(error => console.error('Error fetching login backlogs:', error));

        // Fetch room_backlogs
        axios.get('/room-backlogs')
            .then(response => setRoomBacklogs(response.data))
            .catch(error => console.error('Error fetching room backlogs:', error));
    }, []);

    return (
        <div>
            <h2>Login Backlogs</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>School ID</th>
                        <th>Login Time</th>
                    </tr>
                </thead>
                <tbody>
                    {loginBacklogs.map(log => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.school_id}</td>
                            <td>{log.login_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>

            <h2>Room Backlogs</h2>
            <table>
                <thead>
                    <tr>
                        <th>ID</th>
                        <th>School ID</th>
                        <th>Room</th>
                        <th>Type</th>
                        <th>Logs Time</th>
                    </tr>
                </thead>
                <tbody>
                    {roomBacklogs.map(log => (
                        <tr key={log.id}>
                            <td>{log.id}</td>
                            <td>{log.school_id}</td>
                            <td>{log.room}</td>
                            <td>{log.type}</td>
                            <td>{log.logs_time}</td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
}

export default Backlogs;
