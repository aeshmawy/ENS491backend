var express = require('express');
var router = express.Router();

var validator = require('validator')
var bcrypt = require('bcrypt');
var User =  require("../Schema/User");


/**
 * @swagger
 * /register:
 *  post:
 *    description: username and password are required. usertype is not. (default for isSM and isPM is false)
 *    tags:
 *      - log
 *    parameters:
 *     - in: body
 *       name: email
 *       schema:
 *         type: object
 *         required:
 *          - email
 *          - password
 *         properties:
 *           email: 
 *             type: string
 *           password:
 *             type: string
 *           userType:
 *             type: number
 *             default: 1
 *    responses:
 *      '200':
 *        description: Successful Registration(User has been added to the database)
 *      '400':
 *        description: Username or password is wrong
 *      '500':
 *        description: Something has gone terribly wrong.
 */


 router.post('/' , async (req,res) =>
 {
   
   
   var newuser = new User();
   if(req.body.email)
   {
     if(validator.isEmail(req.body.email))// somestring@somestring.xyz
     {
       if(await User.exists({ email: req.body.email}) )
       {return res.status(401).send("Email must be unique.")}
       console.log("I am here")
       newuser.email = req.body.email;
     }
     else
     {
       return res.status(401).send("Invalid email.")
     }
   }
   else {return res.status(400).send("Please insert a Email");}
   
   
   
   newuser.userType = req.body.userType
 
   if(req.body.password)
   {
     newuser.password = await bcrypt.hash(req.body.password, 10); 
   }
   else {return res.status(400).send("Please insert a password.");}
   
   
 
    await newuser.save((err, Saveduser) => {
 
     if(err)
     { 
       //console.log(err);
       res.status(500).send("Something went wrong")
     }
     else
     {
       var userinfo = newuser;
       
       res.status(200).json({msg :  "User has been successfully added" ,userinfo  })
   
     }
     }); 
 })
 
 module.exports = router;