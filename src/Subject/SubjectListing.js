import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
// import { useNavigate } from "react-router-dom";

const SubjectListing = () => {
    const [subdata, subdatachange] = useState(null);
    const navigate = useNavigate();


    const LoadDetail = (id) => {
        // console.log(id)
        navigate("/subject/detail/" + id);
    }

    const LoadEdit = (id) => {
        navigate("/subject/edit/" + id);
    }



    const Removefunction = (id) => {
        if (window.confirm('Do you want to remove?')) {
            axios.delete
            ("http://localhost:8080/subject/delete/" + id).then((res) => {
                alert('Removed successfully.');
                window.location.reload();
            }).catch((err) => {
                console.log(err.message)
            })
        }
    }


    useEffect(() => {
        axios.
        get("http://localhost:8080/subject/view-subject").then((resp) => {
            subdatachange(resp.data);
            // console.log(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])



    return (
        <div className="container">
            <div className="card">
                <div className="card-title">
                    <h2>Subject Listing</h2>
                </div>
                <div className="card-body">
                    <div className="divbtn">
                        <Link to="subject/create" className="btn btn-success">Add New (+)</Link>
                    </div>
                    <table className="table table-bordered">
                        <thead className="bg-dark text-white">
                            <tr>
                                <td>ID</td>
                                <td>Subject_No</td>
                                <td>Subject_Name</td>
                                <td>Credit</td>
                                <td>Action</td>
                                
                            </tr>
                        </thead>
                        <tbody>

                            {subdata &&
                                subdata.map((item,index) => (
                                    <tr key={item._id}>
                                        <td>{index+1485}</td>
                                        <td>{item.subject_no}</td>
                                        <td>{item.name}</td>
                                        <td>{item.credit}</td>
                                        <td><a onClick={() => { LoadEdit(item._id) }} className="btn btn-success">Edit</a>
                                            <a onClick={() => { Removefunction(item._id) }} className="btn btn-danger">Remove</a>
                                            <a onClick={() => { LoadDetail(item._id) }} className="btn btn-primary">Details</a>
                                        </td>
                                    </tr>
                                ))
                            }

                        </tbody>

                    </table>
                </div>
            </div>
        </div>
    );
}

export default SubjectListing;