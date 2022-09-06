'use strict';

var WSMessage = require('./ws_message.js');
const WebSocket = require('ws');
var loginMessagesMap = new Map();
var wsUserIdMap = new Map(); //map each websocket to the userId

var wss = new WebSocket.Server({ port: 5000 })

wss.on('connection', ws => {

    //inform the newly connected client about all the users who are currently logged in the service
    loginMessagesMap.forEach(function each(message) {
        ws.send(JSON.stringify(message));
    });

    ws.on('message', message => {

        if (RegExp('userId:[0-9]+').test(message)) {
            wsUserIdMap.set(parseInt(message.split(':')[1]), ws);
        }
        else if (RegExp('chat,[0-9]+,[a-zA-Z0-9]+,[0-9]+,[a-zA-Z.!?+-]*').test(message)) {
            let tokenized = message.split(',');
            const type = tokenized[0]
            const userId = tokenized[1]
            const name = tokenized[2];
            const taskId = tokenized[3];
            const messageContent = tokenized[4];
            const m = new WSMessage(type, parseInt(userId), name, parseInt(taskId), null, messageContent);
            sendSelectedClients(m, parseInt(taskId));
        }
        else if (RegExp('typing,[0-9]+,[a-zA-Z0-9]+,[0-9]+').test(message)) {
            let tokenized = message.split(',');
            const type = tokenized[0]
            const userId = tokenized[1]
            const name = tokenized[2];
            const taskId = tokenized[3];
            const m = new WSMessage(type, parseInt(userId), name, parseInt(taskId));
            sendSelectedClients(m, parseInt(taskId));
        }
        /* else
            ws.send('The format of the message is wrong'); */
    });
})

//send the message only to the clients that have as active task the same task of the message
const sendSelectedClients = (message, taskId) => {
    wsUserIdMap.forEach((value, key) => {
        for (const login of loginMessagesMap.values()) {
            if (key === login.userId && login.taskId === taskId)
                value.send(JSON.stringify(message));
        }
    });
}

module.exports.sendAllClients = function sendAllClients(message) {
    wss.clients.forEach(function each(client) {
        client.send(JSON.stringify(message));
    });
};

module.exports.saveMessage = function saveMessage(userId, message) {
    /* console.log('Size BEFORE of loginMessagesMap' + loginMessagesMap.size);
    console.log(loginMessagesMap.values()); */
    loginMessagesMap.set(userId, message);
    /* console.log('Size AFTER of loginMessagesMap' + loginMessagesMap.size);
    console.log(loginMessagesMap.values()); */
};

module.exports.getMessage = function getMessage(userId) {
    loginMessagesMap.get(userId);
};

module.exports.deleteMessage = function deleteMessage(userId) {
    loginMessagesMap.delete(userId);
};