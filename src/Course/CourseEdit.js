import { useEffect, useState } from "react";
import { Link, useNavigate, useParams } from "react-router-dom";
import axios from "axios";

const CourseEdit = () => {
    const { id } = useParams();

    let courseId;

    // id is get the first login time only then I Stored it in the cookies
    if (id != undefined) {
      document.cookie = `courseId=${id}`;
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
  
    courseId = getCookie("courseId");


    // console.log(sourseId);



    useEffect(() => {
        axios.
        get("http://localhost:8080/course/view-course").then((resp) => {
            setAllData(resp.data);
            findCourse(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    },[])



    function findCourse(data){

        data.map((user,index)=>{

            if (courseId == user._id) {
                setFindData(user);

                namechange(user.name);
                feechange(user.fee);
                durationchange(user.duration);
            }
        })
    }


    const [findData, setFindData] = useState({});
    const [allData, setAllData] = useState({});

    const[name,namechange]=useState("");
    const[fee,feechange]=useState("");
    const[duration,durationchange]=useState("");
    const[validation,valchange]=useState(false);

    const navigate=useNavigate();

    const handlesubmit=(e)=>{
      e.preventDefault();
      const CData={name,fee,duration};
      

      axios.post("http://localhost:8080/sourse/update/"+courseId,
        CData
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
                            <h2>Course Edit</h2>
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
                                        <label>fee</label>
                                        <input value={fee} onChange={e=>feechange(e.target.value)} className="form-control"></input>
                                    </div>
                                </div>

                                <div className="col-lg-12">
                                    <div className="form-group">
                                        <label>duration</label>
                                        <input value={duration} onChange={e=>durationchange(e.target.value)} className="form-control"></input>
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
 
export default CourseEdit;