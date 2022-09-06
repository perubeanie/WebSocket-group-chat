import { Form, Button, Col, Row } from 'react-bootstrap/';
import { useRef, useEffect, useState } from 'react';

const ActiveTaskChat = (props) => {

    const {activeTask, ws, chatContent, typing} = props;
    
    const [message, setMessage] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();

        let valid = true;
        if(message === '')
            valid = false;

        if(valid){
            ws.send('chat,' + localStorage.getItem('userId') + "," + localStorage.getItem('username') + "," + activeTask.id + "," + message);
            setMessage('');
        }
    }

    const handleTyping = (event) => {
        setMessage(event.target.value);
        ws.send('typing,' + localStorage.getItem('userId') + ',' + localStorage.getItem('username') + ',' + activeTask.id);
    }

    const textArea = useRef();

    useEffect(() => {
        const area = textArea.current;
        area.scrollTop = area.scrollHeight;
    });

    return (
        <>  
            <Row>
                <Col>   
                    <Form onSubmit={handleSubmit}>
                        <Form.Group className='mt-2'>
                            <Form.Label>Chat for: {activeTask ? activeTask.taskName : ""}</Form.Label>
                            <Form.Control as="textarea" rows={3} value={message} onChange={(ev) => handleTyping(ev)}/>
                            <Form.Text>{typing}</Form.Text>
                        </Form.Group>
                        <Button className="mt-2" variant="success" type="submit">
                            Submit
                        </Button>
                    </Form>
                </Col>
                <Col>
                    <Form.Control as="textarea" rows={5} value={chatContent ? chatContent : ''} ref={textArea} readOnly />
                </Col>
            </Row>
        </>
    );
}

export default ActiveTaskChat;