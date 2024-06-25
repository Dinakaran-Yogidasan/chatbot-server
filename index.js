// // // // const express = require('express');
// // // // const bodyParser = require('body-parser');

// // // // const app = express();
// // // // const PORT = process.env.PORT || 5000;

// // // // app.use(bodyParser.json());

// // // // app.post('/webhook', (req, res) => {
// // // //     const intentName = req.body.queryResult.intent.displayName;

// // // //     let responseText = 'Sorry, I did not understand that.';

// // // //     if (intentName === 'Default Welcome Intent') {
// // // //         responseText = 'Hello! How can I help you today?';
// // // //     }

// // // //     res.json({
// // // //         fulfillmentText: responseText
// // // //     });
// // // // });

// // // // app.listen(PORT, () => {
// // // //     console.log(`Server is running on port ${PORT}`);
// // // // });

// // // const express = require('express');
// // // const cors = require('cors');

// // // const app = express();
// // // const port = 3001;

// // // app.use(cors());
// // // app.use(express.json());

// // // const responses = [
// // //     "Hello! How can I help you today?",
// // //     "I'm not sure about that.",
// // //     "Can you please elaborate?",
// // //     "That's interesting!",
// // //     "Let's talk more about that."
// // // ];

// // // app.post('/chat', (req, res) => {
// // //     const userMessage = req.body.message;
// // //     const randomResponse = responses[Math.floor(Math.random() * responses.length)];
// // //     res.json({ response: randomResponse });
// // //     console.log(userMessage)
// // // });

// // // app.listen(port, () => {
// // //     console.log(`Chatbot server listening at http://localhost:${port}`);
// // // });


// // const express = require('express');
// // const bodyParser = require('body-parser');
// // const { SessionsClient } = require('dialogflow');

// // const app = express();
// // const port = 3000;

// // // Middleware
// // app.use(bodyParser.json());

// // // DialogFlow Config
// // const projectId = 'applied-polymer-426905-u4';
// // const sessionClient = new SessionsClient({ keyFilename: '/Users/dyogidasan/chatbot-server/client_secret_1079728314020-7fgcksba2qa6gkcmlcm4mieao0khoj68.apps.googleusercontent.com.json' });

// // app.post('/webhook', async (req, res) => {
// //   const sessionPath = sessionClient.projectAgentSessionPath(projectId, req.body.sessionId);
// //   const request = {
// //     session: sessionPath,
// //     queryInput: {
// //       text: {
// //         text: req.body.query,
// //         languageCode: 'en-US',
// //       },
// //     },
// //   };

// //   try {
// //     const responses = await sessionClient.detectIntent(request);
// //     const result = responses[0].queryResult;
// //     res.json({ fulfillmentText: result.fulfillmentText });
// //   } catch (error) {
// //     console.error('ERROR:', error);
// //     res.status(500).send('Something went wrong with DialogFlow');
// //   }
// // });

// // app.listen(port, () => {
// //   console.log(`Server running on port ${port}`);
// // });


// const express = require('express');
// const bodyParser = require('body-parser');
// const { WebhookClient } = require('dialogflow-fulfillment');

// const app = express();
// app.use(bodyParser.json());

// app.post('/webhook', (req, res) => {
//   const agent = new WebhookClient({ request: req, response: res });

//   function welcome(agent) {
//     agent.add('Welcome to my DialogFlow agent!');
//   }

//   function fallback(agent) {
//     agent.add('I didn\'t understand that. Can you say it again?');
//   }

//   let intentMap = new Map();
//   intentMap.set('Default Welcome Intent', welcome);
//   intentMap.set('Default Fallback Intent', fallback);
//   agent.handleRequest(intentMap);
// });

// const PORT = process.env.PORT || 3000;
// app.listen(PORT, () => {
//   console.log(`Server is running on port ${PORT}`);
// });


// const express = require('express');
// const bodyParser = require('body-parser');
// const { SessionsClient } = require('dialogflow');

// const app = express();
// const port = process.env.PORT || 5000;

// const projectId = 'applied-polymer-426905-u4';
// const sessionId = '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';
// const languageCode = 'en-US';

// const sessionClient = new SessionsClient({ keyFilename: '/Users/dyogidasan/chatbot-server/client_secret_1079728314020-7fgcksba2qa6gkcmlcm4mieao0khoj68.apps.googleusercontent.com.json' });
// const sessionPath = sessionClient.projectAgentSessionPath(projectId, sessionId);

// app.use(bodyParser.json());

// app.post('/webhook', async (req, res) => {
//   const query = req.body.query;
//   const request = {
//     session: sessionPath,
//     queryInput: {
//       text: {
//         text: query,
//         languageCode: languageCode,
//       },
//     },
//   };

//   try {
//     const responses = await sessionClient.detectIntent(request);
//     const result = responses[0].queryResult;
//     res.json({ response: result.fulfillmentText });
//   } catch (err) {
//     res.status(500).send(err);
//   }
// });

// app.listen(port, () => {
//   console.log(`Server is running on port ${port}`);
// });



const express = require('express');
const bodyParser = require('body-parser');
const { WebhookClient } = require('dialogflow-fulfillment');

const app = express();
const PORT = process.env.PORT || 3000;

app.use(bodyParser.json());

app.post('/webhook', (req, res) => {
    const agent = new WebhookClient({ request: req, response: res });

    function welcome(agent) {
        agent.add('Welcome to my DialogFlow agent!');
    }

    function fallback(agent) {
        agent.add('I didn\'t understand that. Can you try again?');
    }

    let intentMap = new Map();
    intentMap.set('Default Welcome Intent', welcome);
    intentMap.set('Default Fallback Intent', fallback);

    agent.handleRequest(intentMap);
});

app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
});
