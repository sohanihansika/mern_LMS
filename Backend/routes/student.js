const router = require("express").Router();
let Student= require("../models/student.js");

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const email = req.body.email;
    const phone = req.body.phone;

    // create a student object and save the student details in to the mongo DB
    const newStudent = new Student({
        name,
        email,
        phone
    });

    newStudent.save().then(()=>{

        res.json("Student Added");

    }).catch((error)=>{
        console.log(error);

    });
});

// get the all details for the frontend
router.route("/view-student").get((req,res)=>{

    Student.find().then((student)=>{
        res.json(student);
    }).catch((error)=>{
        console.log(error);
    });

});

// update the student details 
router.route("/update/:id").post(async(req,res)=>{

    let userId = req.params.id;
    const {name,email,phone} = req.body;
    const updateStudent = {

        name,
        email,
        phone
    }
    const update = await Student.findByIdAndUpdate(userId,updateStudent).then(()=>{
        res.status(200).send({status : "User Updated"});
    }).catch((erro)=>{
        console.log(err);
        res.status(500).send({staus:"Erro With Updating Try Again",error:err.message});
    });
});



// student details deletion
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    console.log(userId);
    await Student.findByIdAndDelete(userId).then(()=>{

        res.status(200).send({status:"User Deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with delete user",error:err.message});
    });

});
// find one user details fetch
router.route("/get/:id").get(async (req,res)=>{

    let userId = req.params.id;
    const user = await Student.findById(userId).then(()=>{

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
