const router = require("express").Router();
let Subject= require("../models/subject.js");

router.route("/add").post((req,res)=>{

    const subject_no = req.body.subject_no;
    const name = req.body.name;
    const credit = req.body.credit;

    // create a subject object and save the subject details in to the mongo DB
    const newSubject = new Subject({
        subject_no,
        name,
        credit
    });

    newSubject.save().then(()=>{

        res.json("Subject Added");

    }).catch((error)=>{
        console.log(error);

    });
});

// get the all details for the frontend
router.route("/view-subject").get((req,res)=>{

    Subject.find().then((subject)=>{
        res.json(subject);
    }).catch((error)=>{
        console.log(error);
    });

});

// update the subject details 
router.route("/update/:id").post(async(req,res)=>{

    let userId = req.params.id;
    const {subject_no,name,credit} = req.body;
    const updateSubject = {

        subject_no,
        name,
        credit
    }
    const update = await Subject.findByIdAndUpdate(userId,updateSubject).then(()=>{
        res.status(200).send({status : "User Updated"});
    }).catch((erro)=>{
        console.log(err);
        res.status(500).send({staus:"Erro With Updating Try Again",error:err.message});
    });
});



// subject details deletion
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    console.log(userId);
    await Subject.findByIdAndDelete(userId).then(()=>{

        res.status(200).send({status:"User Deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with delete user",error:err.message});
    });

});
// find one user details fetch
router.route("/get/:id").get(async (req,res)=>{

    let userId = req.params.id;
    const user = await Subject.findById(userId).then(()=>{

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
