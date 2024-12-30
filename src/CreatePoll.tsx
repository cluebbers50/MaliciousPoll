import React, { useState } from "react";
import {
  Box,
  TextField,
  Button,
  Typography,
  Card,
  CardContent,
} from "@mui/material";
import { ChromePicker } from "react-color";
import { useNavigate } from "react-router-dom";

const CreatePoll: React.FC = () => {
  const navigate = useNavigate();
  const [formFields, setFormFields] = useState({
    pollTitle: "",
    options: ["", ""],
    backgroundColor: "#ffffff", // Default color
  });
  const [colorPickerVisible, setColorPickerVisible] = useState(false);
  const [currentColor, setCurrentColor] = useState("#ffffff"); // For temporary color selection

  const handlePollTitleChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormFields((prev) => ({
      ...prev,
      pollTitle: event.target.value,
    }));
  };

  const handleOptionChange = (index: number, value: string) => {
    const updatedOptions = [...formFields.options];
    updatedOptions[index] = value;
    setFormFields((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const addOption = () => {
    if (formFields.options.length < 5) {
      setFormFields((prev) => ({
        ...prev,
        options: [...prev.options, ""],
      }));
    }
  };

  const handleRemoveOption = () => {
    if (formFields.options.length > 2) {
      setFormFields((prev) => ({
        ...prev,
        options: prev.options.slice(0, -1),
      }));
    }
  };

  const handleColorChange = (color: any) => {
    setCurrentColor(color.hex); // Update the temporary color
  };

  const selectColor = () => {
    setFormFields((prev) => ({
      ...prev,
      backgroundColor: currentColor, // Confirm the selected color
    }));
    setColorPickerVisible(false); // Close the picker
  };

  const handleSubmit = () => {
    if (
      formFields.pollTitle.trim() &&
      formFields.options.every((option) => option.trim())
    ) {
      sessionStorage.setItem("pollTitle", formFields.pollTitle);
      sessionStorage.setItem("pollOptions", JSON.stringify(formFields.options));
      sessionStorage.setItem("backgroundColor", formFields.backgroundColor);
      navigate("/poll");
    }
  };

  return (
    <Box
      sx={{
        display: "flex",
        justifyContent: "center",
        alignItems: "center",
        minHeight: "100vh",
        padding: 2,
        backgroundColor: "background.default",
      }}
    >
      <Card
        sx={{
          maxWidth: 600,
          width: "100%",
          padding: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "background.paper",
        }}
      >
        <CardContent>
          <Typography
            variant="h4"
            gutterBottom
            align="center"
            sx={{ fontWeight: "bold", color: "primary.main" }}
          >
            Create a Poll
          </Typography>

          <TextField
            label="Poll Title"
            fullWidth
            value={formFields.pollTitle}
            onChange={handlePollTitleChange}
            margin="normal"
            sx={{
              marginBottom: 2,
              "& .MuiInputBase-root": {
                backgroundColor: "background.default",
              },
            }}
          />

          <Box sx={{ marginBottom: 2 }}>
            {formFields.options.map((option, index) => (
              <TextField
                key={index}
                label={`Option ${index + 1}`}
                fullWidth
                value={option}
                onChange={(e) => handleOptionChange(index, e.target.value)}
                sx={{
                  marginBottom: 1.5,
                  "& .MuiInputBase-root": {
                    backgroundColor: "background.default",
                  },
                }}
              />
            ))}
          </Box>

          <Box sx={{ marginBottom: 2 }}>
            <Button
              variant="outlined"
              onClick={() => setColorPickerVisible(!colorPickerVisible)}
              fullWidth
              sx={{ marginBottom: 1 }}
            >
              Select Background Color
            </Button>

            {colorPickerVisible && (
              <Box>
                <ChromePicker
                  color={currentColor}
                  onChange={handleColorChange}
                />
                <Button
                  variant="contained"
                  onClick={selectColor}
                  sx={{
                    marginTop: 1,
                    backgroundColor: currentColor,
                    color: "#fff",
                    "&:hover": { backgroundColor: currentColor },
                  }}
                >
                  Select Color
                </Button>
              </Box>
            )}
          </Box>

          <Box
            sx={{
              marginBottom: 2,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
            }}
          >
            <Typography>Selected Color:</Typography>
            <Box
              sx={{
                width: 40,
                height: 40,
                borderRadius: "50%",
                backgroundColor: formFields.backgroundColor,
                border: "1px solid #ccc",
              }}
            />
          </Box>

          <Box
            sx={{
              display: "flex",
              justifyContent: "space-between",
              marginBottom: 2,
            }}
          >
            <Button
              variant="outlined"
              color="primary"
              onClick={addOption}
              disabled={formFields.options.length >= 5}
              sx={{ paddingX: 2 }}
            >
              Add
            </Button>

            <Button
              variant="outlined"
              color="secondary"
              onClick={handleRemoveOption}
              disabled={formFields.options.length <= 2}
              sx={{ paddingX: 2 }}
            >
              Remove
            </Button>
          </Box>

          <Button
            variant="contained"
            color="primary"
            fullWidth
            onClick={handleSubmit}
            sx={{
              paddingY: 1.5,
              fontSize: "1rem",
              fontWeight: "bold",
            }}
          >
            Create Poll
          </Button>
        </CardContent>
      </Card>
    </Box>
  );
};

export default CreatePoll;
