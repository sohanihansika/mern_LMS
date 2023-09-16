import { NavLink } from "react-router-dom";
import "../styling/Dashboard.css";
import { Axios } from "axios";
export default function Dashboard() {
    return (
        <div>
            <nav className="navbar navbar-expand-xl navbar-light bg-dark">
                    <NavLink className="nav-link" to="/">
                        <button className="btn btn-logout">Log Out</button>
                    </NavLink>
            </nav>
           
            
            <div className="dashboard-container">
                
                <h1 className="dashboard-title"> Learning MANAGEMENT SYSTEM</h1>

                <div className="row">
                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/student/listing">
                            <button className="btn btn-primary btn-lg btn-block">Student</button>
                        </NavLink>
                    </div>

                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/teacher/listing">
                            <button className="btn btn-secondary btn-lg btn-block">Teacher</button>
                        </NavLink>
                    </div>

                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/course/listing">
                            <button className="btn btn-success btn-lg btn-block">Course</button>
                        </NavLink>
                    </div>

                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/subject/listing">
                            <button className="btn btn-danger btn-lg btn-block">Subject</button>
                        </NavLink>
                    </div>

                    <div className="col" align="center">
                        <NavLink className="nav-link" to="/marks/listing">
                            <button className="btn btn-warning btn-lg btn-block">Mark</button>
                        </NavLink>
                    </div>
                </div>
            </div>
        </div>
    );
}
