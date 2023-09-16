import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";

const CourseDetail = () => {
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


    // console.log(sourseId)
    const [allData, setAllData] = useState({});
    const [findData, setFindData] = useState({});


    useEffect(() => {
        axios.
        get("http://localhost:8080/course/view-course").then((resp) => {
            setAllData(resp.data);
            findSourse(resp.data);
            // console.log(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    
function findSourse(data){

    data.map((user,index)=>{

        if (courseId == user._id) {
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
                    <h2>Course Create</h2>
                </div>
                <div className="card-body"></div>

                {findData &&
                    <div>
                        <h2>The Course name is : <b>{findData.name}</b>({findData._id})</h2>
                        <h5>Fee is : {findData.fee}</h5>
                        <h5>Duration is : {findData.duration}</h5>
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

export default CourseDetail;