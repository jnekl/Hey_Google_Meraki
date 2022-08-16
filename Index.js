const {conversation} = require('@assistant/conversation');
const functions = require('firebase-functions');
const app = conversation();
// Application input
var apiKey = "abcdefghijklmnopqrstwxyz";
var networkId = "L_000000000000000";
// Handler name must match the handler name from the step 4.
app.handle('currentclients', (conv) => {
  console.log('currentclients fulfillment is activated');
  conv.overwrite = false;
  conv.scene.next.name = "Meraki";
  
  var request = require('request');
  headers = {
      "Content-Type": "application/json",
      "Accept": "application/json",
      "X-Cisco-Meraki-API-Key": apiKey
  };
  
  body = null;
  var options = {
      method: 'GET',
      url:  `https://api.meraki.com/api/v1/networks/${networkId}/clients`,
      headers,
      body,
  };
  return new Promise((resolve, reject) => { 
     request(options, function (error, response) { 
       if (error) reject(error);
       var data = JSON.parse(response.body);
      
       var clientNumber = 0;
       for (let i = 0; i < data.length; i++) { 
         if (data[i].status == "Online") {
             clientNumber = clientNumber + 1;
         }
       }
       console.log(`The number of currently connected clients is ${clientNumber}`);
       conv.add(`The number of currently connected clients is ${clientNumber}`);
       resolve();
    });
  });
});
