import React, { useState, useEffect } from "react";
import axios from "axios";
import { io } from "socket.io-client";

const socket = io("http://192.168.88.145:9001"); // Adjust if using a live server

const USSDPush = () => {
  const [phoneNumber, setPhoneNumber] = useState("");
  const [sessionId, setSessionId] = useState(null);
  const [ussdResponse, setUssdResponse] = useState("");

  const sendUSSDPush = async () => {
    try {
      const response = await axios.post("http://192.168.88.145:9001/send-ussd", {
        phoneNumber,
      });

      if (response.data.success) {
        setSessionId(response.data.sessionId);
        alert("USSD push sent to user!");
      }
    } catch (error) {
      console.error("Error sending USSD:", error);
      alert("Failed to send USSD push.");
    }
  };

  useEffect(() => {
    socket.on("ussd-response", (data) => {
      if (data.phoneNumber === phoneNumber) {
        setUssdResponse(data.userResponse === "1" ? "Approved" : "Declined");
      }
    });

    return () => socket.off("ussd-response");
  }, [phoneNumber]);

  return (
    <div>
      <h2>USSD Push (Network Initiated)</h2>
      <input
        type="text"
        placeholder="Enter phone number"
        value={phoneNumber}
        onChange={(e) => setPhoneNumber(e.target.value)}
      />
      <button onClick={sendUSSDPush}>Send USSD</button>

      {sessionId && <p>Session ID: {sessionId}</p>}
      {ussdResponse && <p>User Response: {ussdResponse}</p>}
    </div>
  );
};

export default USSDPush;
