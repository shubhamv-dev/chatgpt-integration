const express = require('express');
const multer = require('multer');
const fs = require('fs');
const { Configuration, OpenAIApi } = require('openai');
const mongoose = require('mongoose');
const cors = require('cors');

require("dotenv").config()
const stripe = require('stripe')(`${process.env.STRIPE_KEY}`);

const app = express();
const corsOptions = {
    origin: '*',
};
app.use(cors(corsOptions));

const upload = multer({ dest: 'uploads/' }); // Set the upload directory

const configuration = new Configuration({
    apiKey: process.env.OPEN_AI_KEY
})

const openai = new OpenAIApi(configuration)

// MongoDB connection
mongoose.connect('mongodb+srv://shubhamvishwakarma:kAsid2D7jlK437uB@cluster0.nw1att7.mongodb.net/chatbot', { useNewUrlParser: true, useUnifiedTopology: true });
const db = mongoose.connection;

db.on('error', err => {
    console.error('Failed to connect to MongoDB:', err);
});

db.once('open', () => {
    console.log('Connected to MongoDB');
});

// Document schema and model
const documentSchema = new mongoose.Schema({
    answer: String
});

const Document = mongoose.model('Document', documentSchema);



const authRoutes = require('./routes/authRoute.js');
const userModel = require('./models/userModel.js');
const UserIp = require('./models/getUserIpModel.js');

app.get('/', (req, res) => {
    res.send(`<h1>Welcome to Ask Me Anything</h1>`)
})

let userID = "";



app.post('/webhook',
    express.raw({ type: 'application/json' }), async (request, response) => {
        if (userID) {
            console.log("userId", userID)
            const user = await userModel.findById({ _id: userID }).catch((err) => {
                console.log("Error while fetching user:", err);
                return res.json({
                    statsucode: "404",

                }); // Handle the error appropriately based on your application's needs
            });
            let event = request.body.toString();
            // console.log("event>>>>>>>>>>>", event)
            const endpointSecret = `${process.env.WEBHOOK_KEY}`;

            if (endpointSecret) {

                const signature = request.headers['stripe-signature'];
                try {
                    event = stripe.webhooks.constructEvent(
                        request.body,
                        signature,
                        endpointSecret
                    );

                } catch (err) {
                    console.log(`⚠️  Webhook signature verification failed.`, err.message);
                    return response.sendStatus(400);
                }
            }

            switch (event.type) {
                case 'checkout.session.async_payment_failed':
                    const checkoutSessionAsyncPaymentFailed = event.data.object;

                    // console.log("failed", checkoutSessionAsyncPaymentFailed)
                    // Then define and call a function to handle the event checkout.session.async_payment_failed
                    break;
                case 'checkout.session.async_payment_succeeded':
                    const checkoutSessionAsyncPaymentSucceeded = event.data.object;
                    // console.log("success", checkoutSessionAsyncPaymentSucceeded)
                    // Then define and call a function to handle the event checkout.session.async_payment_succeeded
                    break;
                case 'checkout.session.completed':
                    const checkoutSessionCompleted = event.data.object;
                    console.log("compleat", checkoutSessionCompleted)
                    try {

                        if (checkoutSessionCompleted.payment_status === "paid") {


                            if (checkoutSessionCompleted.amount_total / 100 === 49.95) {
                                user.subscription.type_of_subscription = "professional"

                            } else {
                                user.subscription.type_of_subscription = "Starter"
                            }
                            const timestamp = checkoutSessionCompleted.created;
                            const createdDate = new Date(timestamp * 1000)
                            user.subscription.created_at = createdDate;

                            const oneMonthFromCreated = new Date(createdDate);
                            user.subscription.expired_at = oneMonthFromCreated.setMonth(oneMonthFromCreated.getMonth() + 1);
                            user.subscription.planStatus = true
                            await user.save()
                        }

                    } catch (error) {
                        return response.json({
                            statsucode: "500",
                            message: "User Not saved",
                            error: error.message
                        })
                    }
                    // Then define and call a function to handle the event checkout.session.completed
                    break;
                case 'checkout.session.expired':
                    const checkoutSessionExpired = event.data.object;

                    // console.log("expired", checkoutSessionExpired)
                    // Then define and call a function to handle the event checkout.session.expired
                    break;
                // ... handle other event types
                default:
                    console.log(`Unhandled event type ${event.type}`);
            }
        } else {
            return response.json({ message: "User Id Not Find" })
        }
        response.json({
            statsucode: "200",

        });
    }
); app.use(express.json())


app.post("/getID", async (req, res) => {
    console.log("reqbody", req.body)
    if (req.body) {
        const { user_id } = req.body;
        console.log("userID", user_id)
        userID = user_id;
        res.json({ user_id })
    }
    else {
        return res.json({})
    }

})


app.post("/getCount", async (req, res) => {
    if (req.body.ip) {
        const tempuser = await UserIp.findOne({ ip: req.body.ip });
        console.log("dghfjnfghdjntyrytry", tempuser);
        if (tempuser) {
            res.json({ count: tempuser.count });
        } else {
            const newtempuser = new UserIp({ ip: req.body.ip, count: 0 });
            const savedtempuser = await newtempuser.save();
            res.status(200).json({ count: savedtempuser.count });
        }
    } else {
        res.status(400).json({ error: "Some error occured" });
    }
});

app.post("/setCount", async (req, res) => {
    const user = await UserIp.findOne({ ip: req.body.ip });
    if (user) {
        user.count = user.count + 1;
        await user.save();
        res.status(200).json({ message: "count updated" });
    } else {
        res.status(400).json({ message: "some error occured" });
    }
});





//     console.log("req.file",req.file)
//   const { file } = req;

//   // Read the uploaded document file
//   const documentContent = fs.readFileSync(file.path, 'utf-8');

//   try {
//     // Save the document information to MongoDB
//     const savedDocument = await Document.create({ filePath: file.path });

//     // Prepare the prompt/question to send to ChatGPT
//     const prompt = `Document-related question or prompt. ${documentContent}`;
// console.log("prompt",prompt)
//     // Make an API request to ChatGPT
//     const response = await openai.createCompletion({
//        // Choose the appropriate engine
//       model: 'text-davinci-003',
//       prompt: prompt,
//       max_tokens: 2048, // Set the desired length of the response
//       temperature: 0.7, // Adjust as per your preference
//       n: 1 // Generate a single response
//     });

//     console.log("response",response.data.choices[0].text.trim())
//     const answer = response.data.choices[0].text.trim();

//     await Document.findByIdAndUpdate(savedDocument._id, { answer: answer });

//     res.json({
//       success: true,
//       message: "Working Fine",
//       data: {answer} 
//     });
//   } catch (err) {
//     console.error('Error:', err);
//     res.json({
//       success: false,
//       message: "Internal Server Error."
//     });
//   } finally {
//     // Remove the uploaded file
//     fs.unlinkSync(file.path);
//   }
// });

// Upload endpoint
// app.post('/upload', upload.single('file'), async (req, res) => {
//   const { file } = req;

//   // Read the uploaded document file
//   const documentContent = fs.readFileSync(file.path, 'utf-8');

//   try {
//     // Split the document content into individual questions
//     const questions = documentContent.split('\n\n'); // Assuming each question is separated by two newlines

//     // Initialize an array to store the answers
//     const answers = [];

//     // Loop through each question and get the answer using ChatGPT API
//     for (const question of questions) {
//       // Prepare the prompt/question to send to ChatGPT
//       const prompt = `Document-related question or prompt. ${question}`;

//       // Make an API request to ChatGPT
//       const response = await openai.createCompletion({
//         // Choose the appropriate engine
//         model: 'text-davinci-003',
//         prompt: prompt,
//         max_tokens: 2048, // Set the desired length of the response
//         temperature: 0.7, // Adjust as per your preference
//         n: 1 // Generate a single response
//       });

//       // Extract the answer from the response
//       const answer = response.data.choices[0].text.trim();

//       // Store the answer in the answers array
//       answers.push(answer);
//     }

//     // Save the document information with all the answers to MongoDB
//     const savedDocument = await Document.create({ filePath: file.path, answers });

//     res.json({
//       success: true,
//       message: "Working Fine",
//       data: { answers } 
//     });
//   } catch (err) {
//     console.error('Error:', err);
//     res.json({
//       success: false,
//       message: "Internal Server Error."
//     });
//   } finally {
//     // Remove the uploaded file
//     fs.unlinkSync(file.path);
//   }
// });

// Assuming you are using Express.js
app.post('/upload-content', async (req, res) => {
    console.log("req.body", req.body)
    const { documentContent } = req.body; // Assuming the text field is named "documentContent"
    console.log("DocumentContent", documentContent)

    try {
        // Split the document content into individual questions
        const questions = documentContent.split('\n\n'); // Assuming each question is separated by two newlines

        // Initialize an array to store the answers
        const answers = [];

        // Loop through each question and get the answer using ChatGPT API
        for (const question of questions) {
            // Prepare the prompt/question to send to ChatGPT
            const prompt = `Document-related question or prompt. ${question}`;

            // Make an API request to ChatGPT
            const response = await openai.createCompletion({
                // Choose the appropriate engine
                model: 'text-davinci-003',
                prompt: prompt,
                max_tokens: 2048, // Set the desired length of the response
                temperature: 0.7, // Adjust as per your preference
                n: 1 // Generate a single response
            });

            console.log("response ===>>>", response);

            // Extract the answer from the response
            const answer = response.data.choices[0].text.trim();

            // Store the answer in the answers array
            answers.push(answer);
        }

        // No need to remove the uploaded file since we are not using file upload.
        console.log("Answer", answers)
        res.json({
            success: true,
            message: "Working Fine",
            data: { answers }
        });
    } catch (err) {
        console.error('Error:', err);
        res.json({
            success: false,
            message: "Internal Server Error."
        });
    }
});

app.use('/api/v1/auth', authRoutes)

// Start the server
app.listen(process.env.PORT, () => {
    console.log(`Server running on port ${process.env.PORT}`);
});
