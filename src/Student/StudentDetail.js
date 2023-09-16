import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";

const StudentDetail = () => {
    const { id } = useParams();

    let studentId;


  // id is get the first login time only then I Stored it in the cookies
  if (id != undefined) {
    document.cookie = `studentId=${id}`;
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

  studentId = getCookie("studentId");


    // console.log(studentId)
    const [allData, setAllData] = useState({});
    const [findData, setFindData] = useState({});


    useEffect(() => {
        axios.
        get("http://localhost:8080/student/view-student").then((resp) => {
            setAllData(resp.data);
            findStudent(resp.data);
            // console.log(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    
function findStudent(data){

    data.map((user,index)=>{

        if (studentId == user._id) {
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
                    <h2>Employee Create</h2>
                </div>
                <div className="card-body"></div>

                {findData &&
                    <div>
                        <h2>The Student name is : <b>{findData.name}</b>({findData._id})</h2>
                        <h3>Contact Details</h3>
                        <h5>Email is : {findData.email}</h5>
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

export default StudentDetail;