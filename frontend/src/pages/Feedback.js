import React, { useEffect, useState } from 'react';
import { feedbackService } from '../services/feedbackService';
import TextField from '@mui/material/TextField';
import Button from '@mui/material/Button';
import Box from '@mui/material/Box';
import Typography from '@mui/material/Typography';
import Alert from '@mui/material/Alert';
import List from '@mui/material/List';
import ListItem from '@mui/material/ListItem';
import ListItemText from '@mui/material/ListItemText';
import Divider from '@mui/material/Divider';
import Rating from '@mui/material/Rating';
import Paper from '@mui/material/Paper';

const Feedback = () => {
  const [feedbackList, setFeedbackList] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [form, setForm] = useState({ name: '', email: '', feedback: '', rating: 0 });
  const [submitting, setSubmitting] = useState(false);
  const [success, setSuccess] = useState('');

  // Fetch feedback on mount
  useEffect(() => {
    const fetchFeedback = async () => {
      setLoading(true);
      setError('');
      try {
        const data = await feedbackService.getAllFeedback();
        setFeedbackList(data);
      } catch (err) {
        setError('Failed to load feedback.');
      }
      setLoading(false);
    };
    fetchFeedback();
  }, []);

  const handleChange = (e) => {
    setForm({ ...form, [e.target.name]: e.target.value });
  };

  const handleRatingChange = (e, value) => {
    setForm({ ...form, rating: value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setSubmitting(true);
    setError('');
    setSuccess('');
    if (!form.feedback || !form.rating) {
      setError('Please provide feedback and a rating.');
      setSubmitting(false);
      return;
    }
    try {
      await feedbackService.submitFeedback(form);
      setSuccess('Thank you for your feedback!');
      setForm({ name: '', email: '', feedback: '', rating: 0 });
    } catch (err) {
      setError('Failed to submit feedback.');
    }
    setSubmitting(false);
  };

  return (
    <Box minHeight="80vh" display="flex" flexDirection="column" alignItems="center" justifyContent="center">
      <Typography variant="h4" align="center" gutterBottom sx={{ mt: 4 }}>
        Submit Feedback
      </Typography>
      <Paper elevation={3} sx={{ p: 4, width: '100%', maxWidth: 500, mt: 2 }}>
        <form onSubmit={handleSubmit}>
          <TextField
            label="Name (optional)"
            name="name"
            value={form.name}
            onChange={handleChange}
            fullWidth
            margin="normal"
          />
          <TextField
            label="Email (optional)"
            name="email"
            value={form.email}
            onChange={handleChange}
            fullWidth
            margin="normal"
            type="email"
          />
          <TextField
            label="Your Feedback *"
            name="feedback"
            value={form.feedback}
            onChange={handleChange}
            fullWidth
            margin="normal"
            multiline
            minRows={3}
            required
          />
          <Box mt={3} mb={2} display="flex" flexDirection="column" alignItems="center">
            <Typography component="legend" sx={{ mb: 1 }}>
              Rating *
            </Typography>
            <Rating
              name="rating"
              value={form.rating}
              onChange={handleRatingChange}
              size="large"
              required
            />
          </Box>
          {error && <Alert severity="error" sx={{ mb: 2 }}>{error}</Alert>}
          {success && <Alert severity="success" sx={{ mb: 2 }}>{success}</Alert>}
          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            size="large"
            disabled={submitting}
            sx={{ mt: 2 }}
          >
            {submitting ? 'Submitting...' : 'SUBMIT FEEDBACK'}
          </Button>
        </form>
      </Paper>
      {loading ? (
        <Typography>Loading feedback...</Typography>
      ) : (
        <List>
          {feedbackList && feedbackList.length > 0 ? (
            feedbackList.map((fb) => (
              <React.Fragment key={fb._id || fb.id}>
                <ListItem alignItems="flex-start">
                  <ListItemText
                    primary={<><strong>{fb.name}</strong> <Rating value={fb.rating} readOnly size="small" /></>}
                    secondary={fb.feedback}
                  />
                </ListItem>
                <Divider component="li" />
              </React.Fragment>
            ))
          ) : (
            <ListItem>
              <ListItemText primary="No feedback yet." />
            </ListItem>
          )}
        </List>
      )}
    </Box>
  );
};

export default Feedback; 