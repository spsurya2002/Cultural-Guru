import express from 'express';
import bodyParser from 'body-parser';
import axios from 'axios';
import { GoogleGenerativeAI } from "@google/generative-ai";
import dotenv from "dotenv"
dotenv.config({
    path:'./.env'
 })
const app = express();
app.use(bodyParser.json());

const genAI = new GoogleGenerativeAI(process.env.API_KEY);
const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash"});
console.log(genAI);
app.post('/api/chat', async (req, res) => {
  const prompt = req.body.message;
  //Ana
  const result = await model.generateContent(prompt);
  const response = await result.response;
  const text = response.text();
  console.log(text);
  res.send(text);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => console.log(`Server started on port ${PORT}`));


// import express from 'express';
// import bodyParser from 'body-parser';
// import axios from 'axios';
// import { GoogleGenerativeAI } from "@google/generative-ai";
// import dotenv from "dotenv";
// dotenv.config({
//    path: './.env'
// });

// const app = express();
// app.use(bodyParser.json());

// const genAI = new GoogleGenerativeAI(process.env.API_KEY);
// const model = genAI.getGenerativeModel({ model: "gemini-1.5-flash" });

// // Function to classify if the topic is related to Indian culture
// async function classifyTopic(prompt) {
//     const classificationPrompt = `Is the following topic related to Indian culture? "${prompt}" Answer with yes or no.`;
//     try {
//         const classificationResult = await model.generateContent(classificationPrompt);
//         const classificationResponse = await classificationResult.response;
//         const classificationText = classificationResponse.text();
//         return classificationText.trim().toLowerCase() === 'yes';
//     } catch (error) {
//         console.error("Error classifying topic:", error);
//         return false;
//     }
// }

// app.post('/api/chat', async (req, res) => {
//     const prompt = req.body.message;
//     const isIndianCulture = await classifyTopic(prompt);
//     if (!isIndianCulture) {
//         res.send("I have no expertise on this.");
//         return;
//     }
//     try {
//         const result = await model.generateContent(prompt);
//         const response = await result.response;
//         const text = response.text();
//         console.log(text);
//         res.send(text);
//     } catch (error) {
//         console.error("Error generating content:", error);
//         res.status(500).send("An error occurred while processing your request.");
//     }
// });

// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server started on port ${PORT}`));
