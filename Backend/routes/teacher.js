const router = require("express").Router();
let Teacher= require("../models/teacher.js");

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const email = req.body.email;
    const subj=req.body.subj;
    const phone = req.body.phone;

    // create a student object and save the student details in to the mongo DB
    const newTeacher = new Teacher({
        name,
        email,
        subj,
        phone
    });

    newTeacher.save().then(()=>{

        res.json("Teacher Added");

    }).catch((error)=>{
        console.log(error);

    });
});

// get the all details for the frontend
router.route("/view-teacher").get((req,res)=>{

    Teacher.find().then((teacher)=>{
        res.json(teacher);
    }).catch((error)=>{
        console.log(error);
    });

});

// update the teacher details 
router.route("/update/:id").post(async(req,res)=>{

    let userId = req.params.id;
    const {name,email,subj,phone} = req.body;
    const updateTeacher = {

        name,
        email,
        subj,
        phone
    }
    const update = await Teacher.findByIdAndUpdate(userId,updateTeacher).then(()=>{
        res.status(200).send({status : "User Updated"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({staus:"Erro With Updating Try Again",error:err.message});
    });
});



// teacher details deletion
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    console.log(userId);
    await Teacher.findByIdAndDelete(userId).then(()=>{

        res.status(200).send({status:"User Deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with delete user",error:err.message});
    });

});
// find one user details fetch
router.route("/get/:id").get(async (req,res)=>{

    let userId = req.params.id;
    const user = await Teacher.findById(userId).then(()=>{

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
