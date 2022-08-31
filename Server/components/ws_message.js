class WSMessage {    
    constructor(type, userId, userName, taskId, taskName, chatMessage) {

        this.typeMessage = type;
        this.userId = userId;
        if(userName) this.userName = userName;
        if(taskId) this.taskId = taskId;
        if(taskName) this.taskName = taskName;
        if(chatMessage) this.chatMessage = chatMessage;
    }
}

module.exports = WSMessage;


