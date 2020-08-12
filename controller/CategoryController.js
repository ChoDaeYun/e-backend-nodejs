const Category = require("../model/Category");
const { body,validationResult } = require("express-validator");
const { sanitizeBody } = require("express-validator");
const apiResponse = require("./response/apiResponse");
const mongoose = require("mongoose");
const auth = require("../middleware/jwt");
mongoose.set("useFindAndModify", false);

exports.find = [
    (req,res) => {
        try {
            let search = {};
            if(req.params.category_id != null){
                search.category_id = req.params.category_id;
            }
            Category.find(search,{_id:0,category_id:1,name:1}).then((cates)=>{
                if(cates != null){
                    return apiResponse.successResponseWithData(res,"success", {categorys:cates});
                }else{
                    return apiResponse.notFoundResponse(res,"no data");
                }
            }).catch((err)=>{
                return apiResponse.ErrorResponse(res,err);
            });
        } catch (err) {
            return apiResponse.ErrorResponse(res,err);
        }
    }
];
exports.update = [
    auth,
    body("name").isLength({ min: 1 }).trim().withMessage("name must be specified."),
    sanitizeBody("name").escape(),
    (req,res) => {
        try{
            if(req.user.auth != 'admin'){
                return apiResponse.ErrorResponse(res,"admin api");
            }else{
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
                }else{
                    Category.findOne({category_id:req.params.category_id}).then((category)=>{
                        if(category != null){
                            category.name = req.body.name;
                            Category.findByIdAndUpdate(category._id,category,{},(err)=>{
                                if (err) {
                                    return apiResponse.ErrorResponse(res, err);
                                }else{
                                    return apiResponse.successResponse(res,"Success.");
                                }
                            })
                        }else{
                            return apiResponse.notFoundResponse(res,"no data");
                        }
                    }).catch((err)=>{
                        return apiResponse.ErrorResponse(res,err);
                    });
                }
            }
        }catch (err) {
            return apiResponse.ErrorResponse(res,err);
        }
    }
];
exports.create = [
    auth,
    body("category_id").isLength({ min: 1 }).trim().withMessage("category_id must be specified.")
        .isAlphanumeric().withMessage("category_id has non-alphanumeric characters.").custom((value)=>{
        return Category.findOne({category_id : value}).then((category) => {
            if (category) {
                return Promise.reject("Already exist");
            }
        });
    }),
    body("name").isLength({ min: 1 }).trim().withMessage("name must be specified."),
    sanitizeBody("category_id").escape(),
    sanitizeBody("name").escape(),
    (req,res) => {
        try{
            if(req.user.auth != 'admin'){
                return apiResponse.ErrorResponse(res,"admin api");
            }else {
                const errors = validationResult(req);
                if (!errors.isEmpty()) {
                    return apiResponse.validationErrorWithData(res, "Validation Error.", errors.array());
                } else {
                    let category = new Category(
                        {
                            category_id: req.body.category_id,
                            name: req.body.name
                        }
                    );

                    if (req.body.parent_id) {
                        category.depth = 1;
                        category.parent_id = req.body.parent_id;
                    }

                    category.save(function (err) {
                        if (err) {
                            return apiResponse.ErrorResponse(res, err);
                        }
                        return apiResponse.successResponseWithData(res, "Registration Success.", category);
                    });
                }
            }
        }catch (err) {
            return apiResponse.ErrorResponse(res, err);
        }
    }
];

