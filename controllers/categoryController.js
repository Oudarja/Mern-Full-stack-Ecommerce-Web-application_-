import slugify from "slugify";
import categoryModel from "../models/categoryModel.js";

//********controller function are part of API********** */
//crearing category
export const createCategoryController=async(req,res)=>
{
    try{
       
        // const { name } = req.body is object destructuring, a
        // syntax used to extract specific properties from an
        // object and assign them to variables.
        //so const {name} =req.body also correct
        const {name} = req.body;

        if(!name){
            return res.status(401).send({
                message:'Name is required'
            })
        }

        const existingCategory=await categoryModel.findOne({name})

        if(existingCategory){
            return res.status(200).send(
        {
            success:true,
            message:'Category Already Exists'
        }
    )
    }

    const category=await new categoryModel({name,slug:slugify(name)}).save();
    res.status(201).send({
       
        success:true,
        message:'new category created',
        category,
    })



   }
    catch(error)
    {
        console.log(error)

        res.status(500).send({
         success:false,
         error,
         message:'Error in category'
        })
    }


};

/*
*********The async/await syntax makes asynchronous code look like synchronous 
code, which is easier for developers to follow.****************

The updateCategoryController method is async/await because it involves 
asynchronous operations, particularly database interactions, which do 
not complete instantly and require waiting for their results before 
proceeding. Using async/await allows the code to handle these asynchronous
operations in a clean and readable manner.
*/
//Async: Marks the function as asynchronous, allowing the use of await inside it.
//await categoryModel.findByIdAndUpdate: Pauses the execution of the function until
// the database operation completes.



//Update category
export const updateCategoryController=async(req,res)=>
{
    try
    {
        const {name}=req.body
        const{id}=req.params
        const category=await categoryModel.findByIdAndUpdate(
            id,{name,slug:slugify(name)},{new:true})

        res.status(200).send({
            success:true,
            message:"Category updated Successfully",
            category
        })
    }
    catch(error)
    {
     console.log(error)
     res.status(500).send({
        success:false,
        error,
        mesage:'Error while updating category'
     })

    }





}

//get all category

export const getAllcategoryController=async(req,res)=>
{
    try
    {
        const category=await categoryModel.find({})

        res.status(200).send({
            success:true,
            message:"All Categories List",
            category,
        })

    }
    catch(error)
    {
        console.log(error)
        res.status(500).send({
           success:false,
           error,
           mesage:'Error while getting all category'
        })
        
    }

}

//single category controller

export const getSinglecategoryController=async(req,res)=>
    {
    
        try
        {
            //instead of this const id = req.params.id can be used

           const category=await categoryModel.findOne({slug:req.params.slug})

           res.status(200).send({

            success:true,
            message:"Get single Category Successfull",
            category,

           })
    
        }
        catch(error)
        {
            console.log(error)
            res.status(500).send({
            success:false,
            error,
            mesage:'Error while getting single category'
        })
    
    }

}
    

    //delete category
    export const deleteCategoryController=async(req,res)=>
        {
        
            try
            {
                const {id}=req.params
                 const category=await categoryModel.findByIdAndDelete(id)
                 res.status(200).send({
                    success:true,
                    message:"Category Deleted Successfully"
                 })
        
            }
            catch(error)
            {
                console.log(error)
                res.status(500).send({
                success:false,
                error,
                mesage:'Error while deleting  category'
                
            })
        
        }

    }
        











/*
An API (Application Programming Interface) in the context of web development consists of several
interconnected parts. Together, these components enable the communication between clients 
(like frontend applications or third-party services) and a backend server.

An API (Application Programming Interface) in web development typically consists of:

1) Routes: These define the endpoint (URL) and HTTP method (GET, POST, PUT, DELETE, etc.).
Example: PUT /api/v1/category/update/:id
2) Controller Functions: These define the logic that handles requests to the routes.
Example: Logic for updating a category in the database.
3) Middleware (Optional): These are additional functions to process the request before or 
after the controller, like authentication or validation.

*/