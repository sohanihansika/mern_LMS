import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";

const SubjectDetail = () => {
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


    // console.log(subjectId)
    const [allData, setAllData] = useState({});
    const [findData, setFindData] = useState({});


    useEffect(() => {
        axios.
        get("http://localhost:8080/subject/view-subject").then((resp) => {
            setAllData(resp.data);
            findSubject(resp.data);
            // console.log(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    
function findSubject(data){

    data.map((subject,index)=>{

        if (subjectId == subject._id) {
            // console.log(subject);
            setFindData(subject);

            
        }


    })
}

    return (
        <div>


               <div className="container">
                
            <div className="card row" style={{ "textAlign": "left" }}>
                <div className="card-title">
                    <h2>Subject Create</h2>
                </div>
                <div className="card-body"></div>

                {findData &&
                    <div>
                        <h2>The Subject_No is : <b>{findData.subject_no}</b>({findData._id})</h2>
                        <h3>Subject Details</h3>
                        <h5>Name is : {findData.name}</h5>
                        <h5>Credit is : {findData.credit}</h5>
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

export default SubjectDetail;