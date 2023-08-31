
import React, { useState, useEffect } from 'react';
import {
  Container,
  Card,
  CardBody,
  Form,
  FormGroup,
  Input,
  Button,
} from 'reactstrap';

function SeeAllFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [replyMessage, setReplyMessage] = useState({
    message:"", 
    userId:"",
    responce:"",
  });
  const [selectedFeedbackId, setSelectedFeedbackId] = useState(0);
  const [tokens, setTokens] = useState(0);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await fetch(
          'http://localhost:8080/feedback/',
          {
            headers: {
              'Access-Control-Allow-Origin': '*',
              'Content-Type': 'application/json',
            },
          }
        );
        const feedbackData = await response.json();
        setFeedbackList(feedbackData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  const handleReplySubmit = async (event) => {
    event.preventDefault();

    try {
      const response = await fetch(
        `http://localhost:8080/feedback/responce/${tokens}`,
        {
          method: 'PUT',
          body: JSON.stringify(replyMessage),
          headers: {
            'Access-Control-Allow-Origin': '*',
            'Content-Type': 'application/json',
          },
        }
      );

      // Update feedbackList with new reply
      const updatedFeedbackList = feedbackList.map((feedback) => {
        if (feedback.id === selectedFeedbackId) {
          return {
            ...feedback,
            isManagerReply: 1,
            replyFromManager: replyMessage.responce,
          };
        }
        return feedback;
      });
      setFeedbackList(updatedFeedbackList);

      // Reset form fields
      setReplyMessage({...replyMessage, responce: ''});
      setSelectedFeedbackId(null);
    } catch (error) {
      console.error(error);
    }
    console.log(replyMessage);
  };

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  const refresh=(id)=>{
    setTokens(id);
    setSelectedFeedbackId(id);
    window.location.reload();
  }

  return (
    <Container>
      <h1 className="text-center my-4">User Feedback</h1>
      {feedbackList.map((feedback) => (
        <Card key={feedback.id} className="my-3">
          <CardBody>
            <h5 className="mb-3">{feedback.id}</h5>
            <p className="mb-3">{feedback.feedbackMessage}</p>
            <p className="text-muted mb-3">
              Date: {feedback.feedbackDate}
            </p>
            <p className="text-muted mb-3">
              User ID: {feedback.userId}
            </p>
            {feedback.isManagerReply ? (
              <>
                <hr className="my-3" />
                <h6 className="mb-3">Manager Reply</h6>
                <p>{feedback.replyFromManager}</p>
              </>
            ) : (
              <>
                <Form onSubmit={handleReplySubmit}>
                  <FormGroup>
                    <Input
                      name='response'
                      type="textarea"
                      onChange={(event) =>
                        setReplyMessage({...replyMessage, responce: event.target.value})
                      }
                      placeholder="Enter your reply here"
                    />
                  </FormGroup>
                  <FormGroup>
                    <Button
                      onClick={()=>refresh(feedback.id)}
                      type="submit"
                      color="primary"
                      // disabled={!replyMessage.}
                    >
                       Reply
                    </Button>
                  </FormGroup>
                  <input type="hidden" name="feedbackId" value={feedback.id} />
                  {/* <Button
                    color="link"
                    onClick={() => setSelectedFeedbackId(feedback.id)}
                    className="ml-3"
                   >
                     Cancel
                   </Button> */}
                </Form>
               </>
            )}
          </CardBody>
        </Card>
      ))}
    </Container>
  );
}
export default SeeAllFeedback;