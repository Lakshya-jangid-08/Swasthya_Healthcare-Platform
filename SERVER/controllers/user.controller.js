const User = require("../models/Users.model");

const getProfileById = async(req, res) => {
    try {
        const {id} = req.params;
    
        const user = await User.findById(id).select("profileImage fullname role contactNumber");
        if(!user) {
            return res.status(400).json({message : "Can't exist"})
        }
        return res.status(200).json({user : user, message : "successfully fetch !"});
    } catch(err) {
        console.log(err);
        return res.status(500).json({ message: "SERVER ERROR" });
    }

}


module.exports = {getProfileById}