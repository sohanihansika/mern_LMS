const router = require("express").Router();
let Marks= require("../models/marks.js");

router.route("/add").post((req,res)=>{

    const subjectNo = req.body.subjectNo;
    const mark = req.body.mark;
    const studentName = req.body.studentName;

    // create a sarks object and save the sarks details in to the mongo DB
    const newMarks = new Marks({
        subjectNo,
        mark,
        studentName
    });

    newMarks.save().then(()=>{

        res.json("Marks Added");

    }).catch((error)=>{
        console.log(error);

    });
});

// get the all details for the frontend
router.route("/view-marks").get((req,res)=>{

    Marks.find().then((marks)=>{
        res.json(marks);
    }).catch((error)=>{
        console.log(error);
    });

});

// update the sarks details 
router.route("/update/:id").post(async(req,res)=>{

    let userId = req.params.id;
    const {subjectNo,mark,studentName} = req.body;
    const updateMarks = {

        subjectNo,
        mark,
        studentName
    }
    const update = await Marks.findByIdAndUpdate(userId,updateMarks).then(()=>{
        res.status(200).send({status : "User Updated"});
    }).catch((erro)=>{
        console.log(err);
        res.status(500).send({staus:"Erro With Updating Try Again",error:err.message});
    });
});



// sarks details deletion
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    console.log(userId);
    await Marks.findByIdAndDelete(userId).then(()=>{

        res.status(200).send({status:"User Deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with delete user",error:err.message});
    });

});
// find one user details fetch
router.route("/get/:id").get(async (req,res)=>{

    let userId = req.params.id;
    const user = await Marks.findById(userId).then(()=>{

        if (res.statusCode==200) {
             res.json(user);
            
            console.log("Success");
        }
        else{
            console.log("Unsuccess");

        }
       
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with fetch user",error : err.message});
    });


})

module.exports=router;
