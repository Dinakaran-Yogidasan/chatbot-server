// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const { SessionsClient } = require('dialogflow');

// // const app = express();
// // app.use(bodyParser.json());

// // const projectId = 'chatbot-qlpo';
// // const sessionId = 'YOUR_SESSION_ID';
// // const languageCode = 'en-US';

// // const sessionClient = new SessionsClient();

// // app.post('/webhook', async (req, res) => {
// //     const query = req.body.query;
// //     const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

// //     const request = {
// //         session: sessionPath,
// //         queryInput: {
// //             text: {
// //                 text: query,
// //                 languageCode: languageCode,
// //             },
// //         },
// //     };

// //     const responses = await sessionClient.detectIntent(request);
// //     const result = responses[0].queryResult;
// //     res.json({ fulfillmentText: result.fulfillmentText });
// // });

// // const PORT = process.env.PORT || 5000;
// // app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));


// // index.js
// const express = require('express');
// const bodyParser = require('body-parser');

// const app = express();
// app.use(bodyParser.json());

// app.post('/webhook', (req, res) => {
//     const intentName = req.body.queryResult.intent.displayName;

//     if (intentName === 'yourIntentName') {
//         // Handle the intent
//         const response = {
//             fulfillmentText: 'Your response text'
//         };
//         res.json(response);
//     } else {
//         res.json({
//             fulfillmentText: `Unknown intent: ${intentName}`
//         });
//     }
// });

// // Add this to your Node.js server code
// app.post('/api/send-message', async (req, res) => {
//     const { message } = req.body;

//     const dialogflowRequest = {
//         session: `projects/YOUR_PROJECT_ID/agent/sessions/unique_session_id`,
//         queryInput: {
//             text: {
//                 text: message,
//                 languageCode: 'en-US',
//             },
//         },
//     };

//     try {
//         const responses = await dialogflowClient.detectIntent(dialogflowRequest);
//         const result = responses[0].queryResult;
//         res.json(result);
//     } catch (error) {
//         res.status(500).send('Error processing request');
//     }
// });




// const PORT = process.env.PORT || 5000;
// app.listen(PORT, () => console.log(`Server is running on port ${PORT}`));



const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();
app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
  const agent = new WebhookClient({ request: req, response: res });

  function welcome(agent) {
    agent.add(`Welcome to my agent!`);
  }

  function fallback(agent) {
    agent.add(`I didn't understand`);
    agent.add(`I'm sorry, can you try again?`);
  }

  let intentMap = new Map();
  intentMap.set('Default Welcome Intent', welcome);
  intentMap.set('Default Fallback Intent', fallback);

  agent.handleRequest(intentMap);
});

const PORT = process.env.PORT || 5000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
