import User from "../models/User.js"
import { Webhook } from "svix";



//api controller to manage clerk user with db

export const clerkWebhooks = async (req,res)=>{
   
    try{
      
        //create svix instance with clerk webhook secret
        const whook=new Webhook(process.env.CLERK_WEBHOOK_SECRET)

           // Verifying headers
        console.log("Webhook verification started successfully");
        console.log("Webhook triggered with body:", req.body);
        await whook.verify(JSON.stringify(req.body),{
            "svix-id": req.headers["svix-id"],
            "svix-timestamp": req.headers["svix-timestamp"],
            "svix-signature": req.headers["svix-signature"],
        })

        //getting data from req body

        const {data,type}=req.body

        //switch case for diff events

        switch(type){
            case 'user.created':{
               const userData={
                _id:data.id,
                email:data.email_addresses[0].email_address,
                name:data.first_name + " " + data.last_name,
                image :data.image_url,
                resume: ''
               }

            //    await User.create(userData)
            //    res.json({})
            //    break;
            try {
                await User.create(userData);
                console.log("User successfully saved to MongoDB");
            } catch (err) {
                console.error("Error saving user to MongoDB:", err.message);
                return res.status(500).json({ success: false, message: "Database error" });
            }
            }

            case 'user.updated' : {
                const userData={
                    email:data.email_addresses[0].email_address,
                    name:data.first_name + " " + data.last_name,
                    image :data.image_url,
                   }

                   await User.findByIdAndUpdate(data.id,userData)
                   res.json({})
                   break;
            }

            case 'user.deleted' :{
                await User.findByIdAndDelete(data.id)
                res.json({})
                break;
            }

            default: 
                break;
        }
    }catch(error){

        console.error("Error processing webhook:", error.message, error.stack);
        //res.status(500).json({ success: false, message: "Webhooks error" });
       // console.log(error.message);
        res.json({success:false,message:"Webhooks error hhh"})
    }
}

// import User from "../models/User.js";
// import { Webhook } from "svix";

// export const clerkWebhooks = async (req, res) => {
//     console.log(req.body);
//     try {
//         // Create svix instance with Clerk webhook secret
//         const whook = new Webhook(process.env.CLERK_WEBHOOK_SECRET);

//         // Verifying headers
//         try {
//             await whook.verify(JSON.stringify(req.body), {
//                 "svix-id": req.headers["svix-id"],
//                 "svix-timestamp": req.headers["svix-timestamp"],
//                 "svix-signature": req.headers["svix-signature"],
//             });
//             console.log("Webhook verified successfully");
//         } catch (err) {
//             console.error("Signature verification failed:", err.message);
//             return res.status(400).json({ success: false, message: "Invalid signature" });
//         }

//         // Extracting data from request body
//         const { data, type } = req.body;

//         console.log("Processing webhook event:", type);
//         console.log("Request body data:", JSON.stringify(req.body, null, 2));

//         // Switch case for different events
//         switch (type) {
//             case "user.created": {
//                 console.log("Creating user...");
//                 const userData = {
//                     _id: data.id,
//                     email: data.email_addresses?.[0]?.email_address || "No email",
//                     name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//                     image: data.image_url || "",
//                     resume: "",
//                 };

//                 try {
//                     const user = await User.create(userData);
//                     console.log("User successfully saved to MongoDB:", user);
//                     res.status(200).json({ success: true, message: "User created successfully" });
//                 } catch (err) {
//                     console.error("Error saving user to MongoDB:", err.message);
//                     res.status(500).json({ success: false, message: "Database error" });
//                 }
//                 break;
//             }

//             case "user.updated": {
//                 console.log("Updating user...");
//                 const userData = {
//                     email: data.email_addresses?.[0]?.email_address || "No email",
//                     name: `${data.first_name || ""} ${data.last_name || ""}`.trim(),
//                     image: data.image_url || "",
//                 };

//                 try {
//                     const updatedUser = await User.findByIdAndUpdate(data.id, userData, { new: true });
//                     console.log("User successfully updated in MongoDB:", updatedUser);
//                     res.status(200).json({ success: true, message: "User updated successfully" });
//                 } catch (err) {
//                     console.error("Error updating user in MongoDB:", err.message);
//                     res.status(500).json({ success: false, message: "Database error" });
//                 }
//                 break;
//             }

//             case "user.deleted": {
//                 console.log("Deleting user...");
//                 try {
//                     const deletedUser = await User.findByIdAndDelete(data.id);
//                     console.log("User successfully deleted from MongoDB:", deletedUser);
//                     res.status(200).json({ success: true, message: "User deleted successfully" });
//                 } catch (err) {
//                     console.error("Error deleting user from MongoDB:", err.message);
//                     res.status(500).json({ success: false, message: "Database error" });
//                 }
//                 break;
//             }

//             default: {
//                 console.log("Unhandled event type:", type);
//                 res.status(400).json({ success: false, message: `Unsupported webhook event: ${type}` });
//                 break;
//             }
//         }
//     } catch (error) {
//         console.error("Webhook error:", error.message, error.stack);
//         res.status(500).json({ success: false, message: "Webhooks error" });
//     }
// };
