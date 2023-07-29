import React from 'react';
import { Button, ListGroup } from 'react-bootstrap';

const Sidebar = () => {
    return (
        <div style={{ width: '250px' }}>
            <Button variant="primary" size="lg" block="true" style={{ marginBottom: '20px' }}>
              Compose
            </Button>

            <ListGroup>
                <ListGroup.Item action href="#inbox">
                    Inbox
                </ListGroup.Item>
                <ListGroup.Item action href="#sent">
                    Sent
                </ListGroup.Item>
                <ListGroup.Item action href="#drafts">
                    Drafts
                </ListGroup.Item>
                <ListGroup.Item action href="#spam">
                    Spam
                </ListGroup.Item>
                <ListGroup.Item action href="#trash">
                    Trash
                </ListGroup.Item>
            </ListGroup>
        </div>
    );
};

export default Sidebar;
