const router = require("express").Router();
let Course= require("../models/course.js");

router.route("/add").post((req,res)=>{

    const name = req.body.name;
    const fee = req.body.fee;
    const duration = req.body.duration;

    // create a sourse object and save the sourse details in to the mongo DB
    const newCourse = new Course({
        name,
        fee,
        duration
    });

    newCourse.save().then(()=>{

        res.json("Course Added");

    }).catch((error)=>{
        console.log(error);

    });
});

// get the all details for the frontend
router.route("/view-course").get((req,res)=>{

    Course.find().then((course)=>{
        res.json(course);
    }).catch((error)=>{
        console.log(error);
    });

});

// update the sourse details 
router.route("/update/:id").post(async(req,res)=>{

    let userId = req.params.id;
    const {name,fee,duration} = req.body;
    const updateCourse = {

        name,
        fee,
        duration
    }
    const update = await Course.findByIdAndUpdate(userId,updateCourse).then(()=>{
        res.status(200).send({status : "User Updated"});
    }).catch((erro)=>{
        console.log(err);
        res.status(500).send({staus:"Erro With Updating Try Again",error:err.message});
    });
});



// sourse details deletion
router.route("/delete/:id").delete(async(req,res)=>{
    let userId = req.params.id;
    console.log(userId);
    await Course.findByIdAndDelete(userId).then(()=>{

        res.status(200).send({status:"User Deleted"});
    }).catch((err)=>{
        console.log(err);
        res.status(500).send({status:"Error with delete user",error:err.message});
    });

});
// find one user details fetch
router.route("/get/:id").get(async (req,res)=>{

    let userId = req.params.id;
    const user = await Course.findById(userId).then(()=>{

        if (res.statusCode==200) {
             res.json(user);
            
            console.log("Cuccess");
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
