import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const SubjectEdit = () => {
    const { id } = useParams();

    let subjectId;

    // id is get the first login time only then I Stored it in the cookies
    if (id != undefined) {
      document.cookie = `subjectId=${id}`;
    }
  
    function getCookie(name) {
      const cookies = document.cookie.split("; ");
      for (const cookie of cookies) {
        const [cookieName, cookieValue] = cookie.split("=");
        if (cookieName === name) {
          return decodeURIComponent(cookieValue);
        }
      }
      return null;
    }
  
    subjectId = getCookie("subjectId");


    // console.log(subjectId);



    useEffect(() => {
        axios.
        get("http://localhost:8080/subject/view-subject").then((resp) => {
            setAllData(resp.data);
            findSubject(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    },[])



    function findSubject(data){

        data.map((subject,index)=>{

            if (subjectId == subject._id) {
                setFindData(subject);

                subject_nochange(subject.subject_no);
                namechange(subject.name);
                creditchange(subject.credit);
            }
        })
    }


    const [findData, setFindData] = useState({});
    const [allData, setAllData] = useState({});

    const[subject_no,subject_nochange]=useState("");
    const[name,namechange]=useState("");
    const[credit,creditchange]=useState("");
    const[validation,valchange]=useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const subData={subject_no,name,credit};
      

      axios.post("http://localhost:8080/subject/update/"+subjectId,
        subData
      ).then((res)=>{
        console.log(res.data.status);
        alert('Saved successfully.')
        navigate('/');
      }).catch((err)=>{
        console.log(err.message);
      })

    }
    return ( 
        <div>

        <div className="row">
            <div className="offset-lg-3 col-lg-6">
                <form className="container" onSubmit={handlesubmit}>

                    <div className="card" style={{"textAlign":"left"}}>
                        <div className="card-title">
                            <h2>Subject Edit</h2>
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
                                        <label>name</label>
                                        <input value={name} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>credit</label>
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
 
export default SubjectEdit;