import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";

const TeacherDetail = () => {
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


    // console.log(seacherId)
    const [allData, setAllData] = useState({});
    const [findData, setFindData] = useState({});


    useEffect(() => {
        axios.
        get("http://localhost:8080/teacher/view-teacher").then((resp) => {
            setAllData(resp.data);
            findTeacher(resp.data);
            // console.log(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    
function findTeacher(data){

    data.map((user,index)=>{

        if (teacherId == user._id) {
            // console.log(user);
            setFindData(user);

            
        }


    })
}

    return (
        <div>


               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Teacher Create</h2>
                </div>
                <div className="card-body"></div>

                {findData &&
                    <div>
                        <h2>The Teacher name is : <b>{findData.name}</b>({findData._id})</h2>
                        <h5>Email is : {findData.email}</h5>
                        <h5>Subject is : {findData.subj}</h5>
                        <h5>Phone is : {findData.phone}</h5>
                        <Link className="btn btn-danger" to="/">Back to Listing</Link>
                    </div>
                }
            </div>
            </div>
            {/* </div>
            </div> */}
        </div >
    );
}

export default TeacherDetail;