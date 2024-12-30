import React, { useState, useEffect } from "react";
import {
  Box,
  Card,
  CardContent,
  Typography,
  Button,
  FormControl,
  FormControlLabel,
  Radio,
  RadioGroup,
  Alert,
} from "@mui/material";
import { useNavigate } from "react-router-dom";

const Poll: React.FC = () => {
  const navigate = useNavigate();
  const pollId = sessionStorage.getItem("pollId") || "defaultPoll"; // Use a unique poll ID
  const pollTitle = sessionStorage.getItem("pollTitle") || "Poll";
  const pollOptions: string[] = JSON.parse(
    sessionStorage.getItem("pollOptions") || "[]"
  );
  const backgroundColor =
    sessionStorage.getItem("backgroundColor") || "#ffffff"; // Default background color
  const [selectedOption, setSelectedOption] = useState("");
  const [pollTaken, setPollTaken] = useState(false);

  useEffect(() => {
    // Check if this specific poll has already been taken
    const hasTakenPoll =
      sessionStorage.getItem(`pollTaken_${pollId}`) === "true";
    setPollTaken(hasTakenPoll);
  }, [pollId]);

  const handleSubmit = () => {
    if (pollTaken) {
      return; // Prevent submission if the poll is already taken
    }

    if (selectedOption) {
      sessionStorage.setItem(`pollAnswer_${pollId}`, selectedOption); // Save the answer for this poll
      sessionStorage.setItem(`pollTaken_${pollId}`, "true"); // Mark this poll as taken
      navigate("/results");
    }
  };

  return (
    <Box
      display="flex"
      justifyContent="center"
      alignItems="center"
      minHeight="100vh"
      style={{ backgroundColor: "#f5f5f5" }} // Set a neutral page background
    >
      <Card
        sx={{
          maxWidth: 600,
          padding: 3,
          backgroundColor: backgroundColor, // Apply the dynamic background color to the card
          boxShadow:
            "0px 8px 15px rgba(0, 0, 0, 0.1), 0px 4px 8px rgba(0, 0, 0, 0.08)", // Soft shadow to create depth
          borderRadius: 6, // Subtle rounded corners for an elegant look
          border: `1px solid rgba(0, 0, 0, 0.08)`, // Very soft border for refinement
          overflow: "hidden", // Ensures clean edges
        }}
      >
        <CardContent
          sx={{
            padding: 3, // Padding inside the card content
          }}
        >
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{
              fontWeight: "bold",
              color: "rgba(0, 0, 0, 0.85)", // Elegant text color
              textTransform: "uppercase", // Add a premium feel
              letterSpacing: 1.5,
            }}
          >
            {pollTitle}
          </Typography>
          {pollTaken ? (
            <Alert
              severity="warning"
              sx={{
                mt: 2,
                borderRadius: 2,
                backgroundColor: "rgba(255, 229, 100, 0.2)", // Soft alert color
                color: "rgba(0, 0, 0, 0.85)",
              }}
            >
              You have already participated in this poll.
            </Alert>
          ) : (
            <>
              <FormControl>
                <RadioGroup
                  value={selectedOption}
                  onChange={(e) => setSelectedOption(e.target.value)}
                >
                  {pollOptions.map((option, index) => (
                    <FormControlLabel
                      key={index}
                      value={option}
                      control={<Radio />}
                      label={option}
                      sx={{
                        marginBottom: 1,
                        "& .MuiTypography-root": {
                          fontWeight: "500",
                          color: "rgba(0, 0, 0, 0.75)",
                        },
                      }}
                    />
                  ))}
                </RadioGroup>
              </FormControl>
              <Box mt={3}>
                <Button
                  variant="contained"
                  color="primary"
                  fullWidth
                  onClick={handleSubmit}
                  disabled={!selectedOption}
                  sx={{
                    paddingY: 1.5,
                    fontSize: "1rem",
                    fontWeight: "bold",
                    backgroundColor: "rgba(63, 81, 181, 0.85)",
                    "&:hover": {
                      backgroundColor: "rgba(63, 81, 181, 1)",
                    },
                  }}
                >
                  Submit
                </Button>
              </Box>
            </>
          )}
        </CardContent>
      </Card>
    </Box>
  );
};

export default Poll;
