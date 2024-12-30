import React from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  Grid,
  LinearProgress,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Results: React.FC = () => {
  const navigate = useNavigate();
  const pollTitle = sessionStorage.getItem("pollTitle") || "Poll Results";
  const pollOptions: string[] = JSON.parse(
    sessionStorage.getItem("pollOptions") || "[]"
  );
  const userAnswer = sessionStorage.getItem("pollAnswer") || "";
  const pollResults: { [key: string]: number } = {};

  // Mock results (replace with actual data if needed)
  pollOptions.forEach((option) => {
    pollResults[option] = Math.floor(Math.random() * 10) + 1;
  });

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
    >
      <Card sx={{ maxWidth: 600, padding: 3 }}>
        <CardContent>
          <Typography variant="h4" gutterBottom align="center">
            {pollTitle}
          </Typography>
          <Typography variant="h6" gutterBottom>
            Thank you for participating! Here's the result:
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            Your Answer: <strong>{userAnswer}</strong>
          </Typography>
          <Grid container spacing={2}>
            {pollOptions.map((option) => (
              <Grid item xs={12} key={option}>
                <Typography variant="body1">
                  {option}: {pollResults[option]} votes
                </Typography>
                <LinearProgress
                  variant="determinate"
                  value={(pollResults[option] / 10) * 100}
                  sx={{ mb: 2 }}
                />
              </Grid>
            ))}
          </Grid>
          <Button
            variant="contained"
            color="secondary"
            fullWidth
            onClick={() => navigate("/")}
          >
            Back to Main Menu
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default Results;
