import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const TeacherEdit = () => {
    const { id } = useParams();

    let teacherId;

    // id is get the first login time only then I Stored it in the cookies
    if (id != undefined) {
      document.cookie = `teacherId=${id}`;
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
  
    teacherId = getCookie("teacherId");


    // console.log(seacherId);



    useEffect(() => {
        axios.
        get("http://localhost:8080/teacher/view-teacher").then((resp) => {
            setAllData(resp.data);
            findSeacher(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    },[])



    function findSeacher(data){

        data.map((user,index)=>{

            if (teacherId == user._id) {
                setFindData(user);

                namechange(user.name);
                emailchange(user.email);
                subjchange(user.subj);
                phonechange(user.phone);
            }
        })
    }


    const [findData, setFindData] = useState({});
    const [allData, setAllData] = useState({});

    const[name,namechange]=useState("");
    const[email,emailchange]=useState("");
    const[subj,subjchange]=useState("");
    const[phone,phonechange]=useState("");
    const[validation,valchange]=useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const subjData={name,email,subj,phone};
      

      axios.post("http://localhost:8080/teacher/update/"+teacherId,
        subjData
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
                            <h2>Teacher Edit</h2>
                        </div>
                        <div className="card-body">

                            <div className="row">

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Name</label>
                                        <input required value={name} onMouseDown={e=>valchange(true)} onChange={e=>namechange(e.target.value)} className="form-control"></input>
                                    {name.length==0 && validation && <span className="text-danger">Enter the name</span>}
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Email</label>
                                        <input value={email} onChange={e=>emailchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Subject</label>
                                        <input value={subj} onChange={e=>subjchange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>Phone</label>
                                        <input value={phone} onChange={e=>phonechange(e.target.value)} className="form-control"></input>
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
 
export default TeacherEdit;