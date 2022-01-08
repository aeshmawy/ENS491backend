var express = require('express');
var router = express.Router();


var gameDataSchema =  require("../Schema/gameData");


/**
 * @swagger
 * /sendData:
 *  put:
 *    description: Extracting game data from user
 *    parameters:
 *     - in: body
 *       name: email
 *       schema:
 *         type: object
 *         required:
 *          - email
 *          - ballLane
 *          - catchOrNot
 *          - gameDate
 *         properties:
 *           email: 
 *             type: string
 *           ballLane:
 *             type: string
 *             default: 1
 *           catchOrNot:
 *             type: string
 *             default: 1
 *           
 *    responses:
 *      '200':
 *        description: Data sent to databse correctly
 *      '400':
 *        description: something went wrong
 *      '500':
 *        description: Something has gone terribly wrong.
 */


 router.put('/' , async (req,res) =>
 {
    var gameData = new gameDataSchema();
    gameData.ballLane = req.body.ballLane;
    gameData.catchOrNot = req.body.catchOrNot;
    gameData.userEmail = req.body.email;
    today = new Date();
    gameData.gameDate =  today.toUTCString();
    gameData.gameDateString = today.toUTCString();
   
    await gameData.save()
    res.status(200).json({msg :  "Game Data has been successfully sent", gameData })
 })
 
 module.exports = router;