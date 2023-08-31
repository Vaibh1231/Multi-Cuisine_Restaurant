import React from 'react';
import { Button, Card, CardBody, CardHeader, Container } from 'reactstrap';
import 'bootstrap/dist/css/bootstrap.min.css';

function Manager() {       
    return (
        <div style={{ backgroundColor: '#f5f5f5', padding: '1rem', border: '1px solid #ccc' }}>
            <Container className='text-center'>
                <Card>
                    <CardHeader className='text-white bg-info'>
                        <h4>FeedBack</h4>
                    </CardHeader>

                    <CardBody>
                        <Button color='primary' outline size='lg' block href="/SeeAllFeedback">
                            See All Feedback
                        </Button>
                        <br />
                        <Button color='primary' outline size='lg' block href="/respondedFeedback">
                            See Responded Feedback
                        </Button> 
                        <br />
                        <Button color='primary' outline size='lg' block href="/notRespondedFeedback">
                            Non Responded Feedback
                        </Button> 
                    </CardBody>
                </Card>
            </Container>
        </div>
    );
}

export default Manager;