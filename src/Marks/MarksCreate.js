import { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";

const MarksCreate = () => {

    const[subjectNo,subjectNochange]=useState("");
    const[mark,markchange]=useState("");
    const[studentName,studentNamechange]=useState("");
    const[validation,valchange]=useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const MData={subjectNo,mark,studentName};

      axios.post("http://localhost:8080/marks/add",MData
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
                                <h2>Marks Create</h2>
                            </div>
                            <div className="card-body">

                                <div className="row">

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Subject ID</label>
                                            <input required value={subjectNo} onMouseDown={e=>valchange(true)} onChange={e=>subjectNochange(e.target.value)} className="form-control"></input>
                                        {subjectNo.length==0 && validation && <span className="text-danger">Enter the subjectNo</span>}
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Mark</label>
                                            <input value={mark} onChange={e=>markchange(e.target.value)} className="form-control"></input>
                                        </div>
                                    </div>

                                    <div className="col-lg-12">
                                        <div className="form-group">
                                            <label>Student Name</label>
                                            <input value={studentName} onChange={e=>studentNamechange(e.target.value)} className="form-control"></input>
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

export default MarksCreate;