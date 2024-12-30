import React, { useState } from "react";
import {
  FormControl,
  FormLabel,
  RadioGroup,
  FormControlLabel,
  Radio,
  TextField,
  Button,
  Box,
  Stack,
} from "@mui/material";
import { red } from "@mui/material/colors";

interface Props {
  formLabel: string;
  onSave: (newPoll: PollData) => void; // Callback to save the new poll
  pollData?: PollData; // Optional prop for editing existing poll
}

// Define PollData structure
interface PollData {
  formLabel: string;
  options: { label: string; value: string }[];
}

const PollForm: React.FC<Props> = ({ formLabel, onSave, pollData }) => {
  const [formFields, setFormFields] = useState<PollData>({
    formLabel: pollData?.formLabel || formLabel,
    options: pollData?.options || [
      { label: "Option 1", value: "Option 1 Value" },
      { label: "Option 2", value: "Option 2 Value" },
    ],
  });

  const handleFormLabelChange = (
    event: React.ChangeEvent<HTMLInputElement>
  ) => {
    setFormFields((prev) => ({
      ...prev,
      formLabel: event.target.value,
    }));
  };

  const handleOptionChange = (
    index: number,
    field: "label" | "value",
    value: string
  ) => {
    const updatedOptions = [...formFields.options];
    updatedOptions[index][field] = value;
    setFormFields((prev) => ({
      ...prev,
      options: updatedOptions,
    }));
  };

  const handleAddOption = () => {
    setFormFields((prev) => ({
      ...prev,
      options: [
        ...prev.options,
        { label: `Option ${prev.options.length + 1}`, value: "" },
      ],
    }));
  };

  const handleRemoveOption = () => {
    if (formFields.options.length > 1) {
      setFormFields((prev) => ({
        ...prev,
        options: prev.options.slice(0, -1),
      }));
    }
  };

  const handleSubmit = () => {
    onSave(formFields);
  };

  return (
    <Box
      sx={{
        width: "100%",
        maxWidth: "600px",
        margin: "0 auto",
        padding: { xs: "16px", sm: "24px" },
        boxShadow: 3,
        borderRadius: 2,
        backgroundColor: "background.paper",
        typography: "body1",
      }}
    >
      <FormControl component="fieldset" fullWidth>
        <FormLabel
          id="poll-label"
          sx={{
            marginBottom: 2,
            typography: { xs: "h6", sm: "h5" },
            textAlign: "center",
          }}
        >
          {formFields.formLabel}
        </FormLabel>

        <RadioGroup
          aria-labelledby="poll-label"
          defaultValue={formFields.options[0]?.value}
          name="radio-buttons-group"
          sx={{ marginBottom: 2 }}
        >
          {formFields.options.map((option, index) => (
            <FormControlLabel
              key={index}
              value={option.value}
              control={<Radio />}
              label={option.label}
              sx={{
                typography: "body1",
                padding: { xs: 1, sm: 2 },
              }}
            />
          ))}
        </RadioGroup>

        <TextField
          label="Poll Question"
          value={formFields.formLabel}
          onChange={handleFormLabelChange}
          fullWidth
          margin="normal"
          sx={{ marginBottom: 2 }}
        />

        {formFields.options.map((option, index) => (
          <TextField
            key={index}
            label={`Option ${index + 1}`}
            value={option.label}
            onChange={(e) => handleOptionChange(index, "label", e.target.value)}
            fullWidth
            margin="normal"
            sx={{ marginBottom: 2 }}
          />
        ))}

        <Box
          sx={{
            display: "flex",
            justifyContent: "center",
            gap: "8px",
            marginTop: 3,
          }}
        >
          <Button
            variant="outlined"
            color="primary"
            onClick={handleAddOption}
            sx={{ flex: 1 }}
          >
            +
          </Button>

          <Button
            variant="outlined"
            color="primary"
            onClick={handleRemoveOption}
            sx={{ flex: 1 }}
          >
            -
          </Button>
        </Box>

        <Box sx={{ marginTop: 3, textAlign: "center" }}>
          <Button
            variant="contained"
            color="primary"
            onClick={handleSubmit}
            sx={{
              padding: { xs: 1, sm: 2 },
              width: { xs: "100%", sm: "auto" },
            }}
          >
            Save Poll
          </Button>
        </Box>
      </FormControl>
    </Box>
  );
};

export default PollForm;
