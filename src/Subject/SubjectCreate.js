import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const SubjectCreate = () => {

    const[subject_no,subject_nochange]=useState("");
    const[name,namechange]=useState("");
    const[credit,creditchange]=useState("");
    const[validation,valchange]=useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const subData={subject_no,name,credit};

      axios.post("http://localhost:8080/subject/add",subData
      ).then((res)=>{
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message)
      })

    }

    return (
        <div>

            <div className="row">
                <div className="offset-lg-3 col-lg-6">
                    <form className="container" onSubmit={handlesubmit}>

                        <div className="card" style={{"textAlign":"left"}}>
                            <div className="card-title">
                                <h2>Subject Create</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Subject_No</label>
                                            <input required value={subject_no} onMouseDown={e=>valchange(true)} onChange={e=>subject_nochange(e.target.value)} className="form-control"></input>
                                        {subject_no.length==0 && validation && <span className="text-danger">Enter the subject_no</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Name</label>
                                            <input value={name} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Credit</label>
                                            <input value={credit} onChange={e=>creditchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    
                                    <div className="col-lg-12">
                                        <div className="form-group">
                                           <button className="btn btn-success" type="submit">Save</button>
                                           <Link to="/" className="btn btn-danger">Back</Link>
                                        </div>
                                    </div>

                                </div>

                            </div>

                        </div>

                    </form>

                </div>
            </div>
        </div>
    );
}

export default SubjectCreate;