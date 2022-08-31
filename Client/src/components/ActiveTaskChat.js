import React from 'react';
import { Form, Button, Col, Row, Text } from 'react-bootstrap/';

const ActiveTaskChat = (props) => {

    const {task, onSendMessage} = props;
    const [message, setMessage] = useState();

    const handleSubmit = (event) => {
        event.preventDefault();
        setErrorMessage('');
    }

    return (
        <>  
            <p className="text-start mt-5">Chat for: {task !== undefined ? task.description : ""}</p>
            <Row>
                <Col>
                    <Form.Control as="textarea" rows={3} value={message} onChange={(ev) => setMessage(ev.target.value)}></Form.Control>
                    <Button className="mt-2" variant="success" type="submit" onSubmit={handleSubmit}>
                        Submit
                    </Button>
                </Col>
                <Col>
                    <pre>Hello World!</pre>
                </Col>
            </Row>
        </>
    );
}

export default ActiveTaskChat;