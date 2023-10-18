import './App.css'
import {Link, useParams} from "react-router-dom";
import {useEffect, useState} from "react";

const fetchAppointmentForUser = (id) => {
    return fetch(`/api/users/${id}`).then((res) => {
        return res.json();
    });
};

function deleteAppointment(id) {
    console.log("DELETE ID: ", id);
    return fetch(`/api/appointments/${id}`, {method: "DELETE"}).then((res) =>
        res.json());
}

function App() {
    const {id} = useParams();
    const [isLoggedIn, setIsLoggedIn] = useState(false);
    const [user, setUser] = useState(null);
    const [appointment, setAppointment] = useState(null);
    console.log("ID: ", id);
    console.log("ISLOGGEDIN: ", isLoggedIn);
    console.log("USER", user);
    console.log("APPOINTMENT", appointment);

    if (id && !isLoggedIn) {
        setIsLoggedIn(true);
    }

    useEffect(() => {
        if (id !== undefined) {
            fetchAppointmentForUser(id)
                .then(({id, email, password, appointmentDTO}) => {
                    setUser({id, email, password, appointmentDTO});
                    setAppointment(appointmentDTO);
                });
        }
    }, [id]);

    return (
        <>
            <div>{user ? `Welcome ${user.email} !` : "Main Page"}</div>
            {isLoggedIn && !appointment &&
                <Link to={`/calendar/${id}`}>
                    <button className='reservationButton' type="button">Reserve an appointment</button>
                </Link>}
            {!isLoggedIn &&
                <>
                    <Link to="/login">
                        <button className='loginButton' type="button">Login</button>
                    </Link>
                    <Link to="/register">
                        <button className='registerButton' type="button">Register</button>
                    </Link>
                </>
            }
            {appointment &&
                <>
                    <div>
                        {`You have a reserved appointment at: ${appointment.appointment}`}
                    </div>
                    <button onClick={() => {
                        setAppointment(null);
                        return deleteAppointment(appointment.id);
                    }}>
                        DELETE APPOINTMENT
                    </button>
                </>
            }
        </>
    )
}

export default App
