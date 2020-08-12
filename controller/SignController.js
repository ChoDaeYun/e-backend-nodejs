const User = require("../model/User");
const Admin = require("../model/Admin");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("./response/apiResponse");
const bcrypt = require("bcrypt");
const jwt = require("jsonwebtoken");

exports.signup = [
    body("name").isLength({ min: 1 }).trim().withMessage("name must be specified.")
        .isAlphanumeric().withMessage("name has non-alphanumeric characters."),
    body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
        .isEmail().withMessage("Email must be a valid email address.").custom((value) => {
        return User.findOne({email : value}).then((user) => {
            if (user) {
                return Promise.reject("E-mail already in use");
            }
        });
    }),
    body("password").isLength({ min: 6 }).trim().withMessage("Password must be 6 characters or greater."),
    sanitizeBody("name").escape(),
    sanitizeBody("email").escape(),
    sanitizeBody("password").escape(),
    (req, res) => {
        try {
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            } else {
                bcrypt.hash(req.body.password, 10, function (err, hash) {
                    var user = new User(
                        {
                            name: req.body.name,
                            email: req.body.email,
                            password: hash
                        }
                    );
                    user.save(function (err) {
                        if (err) {
                            return apiResponse.ErrorResponse(res, err);
                        }
                        let userData = {
                            _id: user._id,
                            name: req.body.name,
                            email: req.body.email
                        };
                        return apiResponse.successResponseWithData(res, "Registration Success.", userData);
                    });
                });
            }
        } catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

exports.signin = [
    body("email").isLength({ min: 1 }).trim().withMessage("Email must be specified.")
        .isEmail().withMessage("Email must be a valid email address."),
    body("password").isLength({ min: 1 }).trim().withMessage("Password must be specified."),
    sanitizeBody("email").escape(),
    sanitizeBody("password").escape(),
    (req,res) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }else {
                User.findOne({email:req.body.email}).then(user=>{
                   if(user){
                       bcrypt.compare(req.body.password,user.password,function (err,same) {
                           if(same){
                               let userData = {
                                   _id: user._id,
                                   name: user.name,
                                   email: user.email,
                                   auth:'user'
                               };

                               const jwtPayload = userData;
                               const jwtData = {
                                   expiresIn: process.env.JWT_TIMEOUT_DURATION,
                               };
                               const secret = process.env.JWT_SECRET;
                               userData.token = jwt.sign(jwtPayload, secret, jwtData);
                               return apiResponse.successResponseWithData(res,"Login Success.", userData);
                           }else{
                               return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
                           }
                       });
                   }else{
                       return apiResponse.unauthorizedResponse(res, "Email or Password wrong.");
                   }
                });
            }
        }catch (err) {
            return apiResponse.ErrorResponse(res.err);
        }

    }
];
exports.admincreate = [
    (req,res) => {
        try{
            let admin_id = process.env.ADMINID;
            let password = process.env.ADMINPW;
            bcrypt.hash(password, 10, function (err, hash) {
                var admin = new Admin(
                    {
                        admin_id: admin_id,
                        password: hash
                    }
                );
                admin.save(function (err) {
                    if (err) {
                        return apiResponse.ErrorResponse(res, err);
                    }
                    return apiResponse.successResponse(res, "Registration Success.");
                });
            });
        }catch (err) {
            return apiResponse.ErrorResponse(res.err);
        }

    }
]
exports.adminsignin = [
    body("admin_id").isLength({ min: 1 }).trim().withMessage("id must be specified."),
    body("password").isLength({ min: 1 }).trim().withMessage("Password must be specified."),
    sanitizeBody("admin_id").escape(),
    sanitizeBody("password").escape(),
    (req,res) => {
        try{
            const errors = validationResult(req);
            if (!errors.isEmpty()) {
                return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
            }else {
                Admin.findOne({admin_id:req.body.admin_id}).then(admin=>{
                    if(admin){
                        bcrypt.compare(req.body.password,admin.password,function (err,same) {
                            if(same){
                                let adminData = {
                                    _id: admin._id,
                                    admin_id: admin.admin_id,
                                    auth_lev: admin.auth_lev,
                                    auth:'admin'
                                };

                                const jwtPayload = adminData;
                                const jwtData = {
                                    expiresIn: process.env.JWT_TIMEOUT_DURATION,
                                };
                                const secret = process.env.JWT_SECRET;
                                adminData.token = jwt.sign(jwtPayload, secret, jwtData);
                                return apiResponse.successResponseWithData(res,"Login Success.", adminData);
                            }else{
                                return apiResponse.unauthorizedResponse(res, "id or Password wrong.");
                            }
                        });
                    }else{
                        return apiResponse.unauthorizedResponse(res, "id or Password wrong.");
                    }
                });
            }
        }catch (err) {
            return apiResponse.ErrorResponse(res.err);
        }

    }
];
