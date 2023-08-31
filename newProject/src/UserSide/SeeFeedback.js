import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Container, Card, CardBody } from 'reactstrap';

function SeeFeedback() {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const response = await axios.get(`http://localhost:8080/feedback/getFbByUserId/${sessionStorage.getItem("custId")}`);
        const feedbackData = response.data;
        setFeedbackList(feedbackData);
        console.log(feedbackData);
      } catch (error) {
        setError(error);
      } finally {
        setLoading(false);
      }
    };

    fetchData();
  }, []);

  if (loading) {
    return <p>Loading...</p>;
  }

  if (error) {
    return <p>Error: {error.message}</p>;
  }

  return (
    <Container>
      <h1 className="text-center my-4">User Feedback</h1>
      {feedbackList.map(feedback => (
        <Card key={feedback.id} className="my-3">
          <CardBody>
            <h5 className="mb-3">{feedback.id}</h5>
            <p className="mb-3">{feedback.feedbackMessage}</p>
            <p className="text-muted mb-3">Date: {feedback.feedbackDate}</p>
            {feedback.isManagerReply && (
              <>
                <hr className="my-3" />
                <h6 className="mb-3">Manager Reply</h6>
                <p>{feedback.replyFromManager}</p>
              </>
            )}
          </CardBody>
        </Card>
      ))}
    </Container>
  );
}

export default SeeFeedback;
