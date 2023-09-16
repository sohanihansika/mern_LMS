import { useEffect, useState } from "react";
import { Link, useParams,useNavigate } from "react-router-dom";
import axios from "axios";

const MarksDetail = () => {
    const { id } = useParams();

    let markId;


  // id is get the first login time only then I Stored it in the cookies
  if (id != undefined) {
    document.cookie = `markId=${id}`;
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

  markId = getCookie("markId");


    // console.log(sarkId)
    const [allData, setAllData] = useState({});
    const [findData, setFindData] = useState({});


    useEffect(() => {
        axios.
        get("http://localhost:8080/mark/view-mark").then((resp) => {
            setAllData(resp.data);
            findMark(resp.data);
            // console.log(resp.data);
        }).catch((err) => {
            console.log(err.message);
        })
    }, [])

    
function findMark(data){

    data.map((user,index)=>{

        if (markId == user._id) {
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
                    <h2>Mark Create</h2>
                </div>
                <div className="card-body"></div>

                {findData &&
                    <div>
                        <h2>The Subject number is : <b>{findData.subjectNo}</b>({findData._id})</h2>
        
                        <h5>Mark is : {findData.mark}</h5>
                        <h5>Student Name is : {findData.studentName}</h5>
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

export default MarksDetail;