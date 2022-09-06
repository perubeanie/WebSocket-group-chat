class WSMessage {    
    constructor(type, userId, userName, taskId, taskName, messageContent) {

        this.typeMessage = type;
        this.userId = userId;
        if(userName) this.userName = userName;
        if(taskId) this.taskId = taskId;
        if(taskName) this.taskName = taskName;
        if(messageContent) this.messageContent = messageContent;
    }
}

module.exports = WSMessage;


