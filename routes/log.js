var express = require('express');
var router = express.Router();
var bcrypt = require('bcrypt');

var User =  require("../Schema/User");



/**
 * @swagger
 * /log:
 *   post:
 *    description: Give a json file containing a username and password. 
 *    tags: 
 *      - log
 *    parameters:
 *       - in : body
 *         name : SomeUser
 *         schema: 
 *          type: object
 *          properties:
 *            email:
 *              type: string
 *            password:
 *              type: string
 *       
 *    responses:
 *      '200':
 *        description: A successful Login
 *      '404': 
 *        description: Username does not exist in database
 *      '400':
 *        description: Username exists but the password is wrong
 *      '500':
 *        description: Something has gone terribly wrong.
 */
 router.post('/', async (req,res) => {
  
  var email = req.body.email;
  var password = req.body.password;
  
  
  if(email && password)
  {
    
  var userInfo = await User.findOne({email: email}).exec();

  console.log(userInfo)
  
  if(userInfo)
  {
    if(await bcrypt.compare(password,userInfo.password) )
    {
      
      return res.status(200).json({ msg: "Log in is successful", status:200 , loggedIn : true})
      
    }
    else
    {
      return res.status(401).send("Wrong Password");
    }
  }
  else
  {
    return res.status(400).send("User does not exist");
  }
}
  
});



module.exports = router;