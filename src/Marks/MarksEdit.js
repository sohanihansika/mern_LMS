import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const MarksEdit = () => {
    const { id } = useParams();

    let marksId;

    // id is get the first login time only then I Stored it in the cookies
    if (id != undefined) {
      document.cookie = `marksId=${id}`;
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
  
    marksId = getCookie("marksId");


    // console.log(marksId);



    useEffect(() => {
        axios.
        get("http://localhost:8080/marks/view-marks").then((resp) => {
            setAllData(resp.data);
            findMarks(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    },[])



    function findMarks(data){

        data.map((user,index)=>{

            if (marksId == user._id) {
                setFindData(user);

                subjectNochange(user.subjectNo);
                markchange(user.mark);
                studentNamechange(user.studentName);
            }
        })
    }


    const [findData, setFindData] = useState({});
    const [allData, setAllData] = useState({});

    const[subjectNo,subjectNochange]=useState("");
    const[mark,markchange]=useState("");
    const[studentName,studentNamechange]=useState("");
    const[validation,valchange]=useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const MData={subjectNo,mark,studentName};
      

      axios.post("http://localhost:8080/marks/update/"+marksId,
        MData
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
                            <h2>Marks Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Subject No</label>
                                        <input required value={subjectNo} onMouseDown={e=>valchange(true)} onChange={e=>subjectNochange(e.target.value)} className="form-control"></input>
                                    {subjectNo.length==0 && validation && <span className="text-danger">Enter the subject no</span>}
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
                                        <label>Student name</label>
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
 
export default MarksEdit;