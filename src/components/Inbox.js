import React, { useEffect, useState } from 'react';
import { ListGroup } from 'react-bootstrap';

const Inbox = () => {
  const [emails, setEmails] = useState([]);

  useEffect(() => {
    const fetchEmails = async () => {
      try {
        const response = await fetch("http://localhost:5000/email");
        if (response.ok) {
          const responseData = await response.json();
          // Sort emails by date from newest to oldest
          const sortedData = responseData.sort((a, b) => new Date(b.date) - new Date(a.date));
          setEmails(sortedData);
        } else {
          throw new Error("Failed to fetch emails from the server");
        }
      } catch (error) {
        console.error(error);
        // Display an error message to the user
        // ...
      }
    };

    fetchEmails();
  }, []);

  return (
    <ListGroup>
      {emails.map(email => (
        <ListGroup.Item key={email.id}>
          <h4>{email.subject}</h4>
          <p>{email.sender}</p>
        </ListGroup.Item>
      ))}
    </ListGroup>
  );
};

export default Inbox;
