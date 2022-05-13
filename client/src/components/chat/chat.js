import React, { useEffect, useState } from "react";
import ScrollToBottom from "react-scroll-to-bottom";

function Chat({ socket, username, room ,id,msg}) {
  const [currentMessage, setCurrentMessage] = useState("");
  const [messageList, setMessageList] = useState([]);
const hide= (e)=>{
 var Id=id+id
  var doc=document.getElementById(Id) //.style.display = "none";
  
  if(doc.style.display == '' || doc.style.display == 'none'){
    doc.style.display = 'block';
}
else {
  doc.style.display = 'none';
}
}
const sendinvit=async (msg)=>{
console.log(username+"hhh"+id+"hhhh"+room);
  const res = await fetch("http://localhost:3001/message/send", {

      method: "POST",
      headers: { 'Content-Type': ' application/json'}
      ,
            
      body: JSON.stringify({sender :username,receiver :id ,room:room,msg:msg})
  }).then(res => {
    
    if (res.status === 201) {
 
    
        
        
          
      console.log('message envoyé')
          
      }
      else if (res.status === 400) {
          window.alert("message non envoyé ")
          
           }
          
  })}

  const sendMessage = async () => {
    if (currentMessage !== "") {
      const messageData = {
        room: room,
        author: username,
        message: currentMessage,
        time:
          new Date(Date.now()).getHours() +
          ":" +
          new Date(Date.now()).getMinutes(),
      };

      await socket.emit("send_message", messageData);
      if(messageList.length===0){
        sendinvit(messageData);
      }
      
      setMessageList((list) => [...list, messageData]);
      setCurrentMessage("");
    }
  };

  useEffect(() => {
    socket.on("receive_message", (data) => {
      console.log(data)
      setMessageList((list) => [...list, data]);
    });
  }, [socket]);

  useEffect(() => {
    console.log(msg,"hghhhhhhhhh");
    if(msg !==""){
      setMessageList((list) => [...list, msg]);
  }},[])
  return (
    <div className="chat-window" >
      <div className="chat-header" id={id} onClick={(e)=>hide(e)}>
        <p>Live Chat</p>
      </div>
      <div >
        <div  id={id+id} >
      <div className="chat-body" >
        <ScrollToBottom className="message-container">
          {messageList.map((messageContent) => {
            return (
              <div
                className="message"
                id={username === messageContent.author ? "you" : "other"}
              >
                <div>
                  <div className="message-content">
                    <p>{messageContent.message}</p>
                  </div>
                  <div className="message-meta">
                    <p id="time">{messageContent.time}</p>
                    <p id="author">{messageContent.author}</p>
                  </div>
                </div>
              </div>
            );
          })}
        </ScrollToBottom>
      </div>
      <div className="chat-footer">
        <input
          type="text"
          value={currentMessage}
          placeholder="Hey..."
          onChange={(event) => {
            setCurrentMessage(event.target.value);
          }}
          onKeyPress={(event) => {
            event.key === "Enter" && sendMessage();
          }}
        />
        <button onClick={sendMessage}>&#9658;</button>
      </div>
      </div>
      </div>
    </div>
  );
}

export default Chat;
