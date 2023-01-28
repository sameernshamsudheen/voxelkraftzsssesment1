import {
  Button,
  Grid,
  IconButton,
  InputAdornment,
  Paper,
  Stack,
  TextField,
  Tooltip,
  Typography,
} from "@mui/material";
import React, { useState } from "react";
import AddIcon from "@mui/icons-material/Add";
import RemoveIcon from "@mui/icons-material/Remove";

function GroceryApp({ fruitData, setFruitData }) {
  const [addMode, setAddMode] = useState(false);
  const [input, setInput] = useState("");

  const handleAddFruit = () => {
    if (!input.length) {
      alert("Please Enter A Fruit Name");
    } else {
      let index = fruitData.findIndex(
        (obj) => obj.name.toLowerCase() === input.toLowerCase()
      );
      if (index === -1) {
        let tempFruitData = fruitData;

        tempFruitData.push({
          name: input,
          votes: 0,
        });
        setFruitData([...tempFruitData]);
        setAddMode(false);
      } else {
        alert(`${input} already Exists`);
      }
    }
  };
  const handleUpVote = (_name) => {
    let tempFruitData = fruitData;
    let index = tempFruitData.findIndex((obj) => obj.name === _name);
    tempFruitData[index].votes++;
    setFruitData([...tempFruitData]);
  };

  const handleDownVote = (_name) => {
    let tempFruitData = fruitData;
    let index = tempFruitData.findIndex((obj) => obj.name === _name);
    if (tempFruitData[index].votes === 0) {
      alert(`${tempFruitData[index].name} Already have 0 Votes`);
    } else {
      tempFruitData[index].votes--;
      setFruitData([...tempFruitData]);
    }
  };

  function compare(a, b) {
    if (a.votes < b.votes) {
      console.log(a.votes);
      return -1;
    }
    if (a.votes > b.votes) {
      return 1;
    }
    return 0;
  }

  return (
    <Grid container maxWidth={"lg"} p={5} sx={{ mx: "auto" }}>
      <Grid item xs={12} md={6} sx={{ mx: "auto" }}>
        <Paper sx={{ p: 3, background: "rgba(165, 147, 173, 0.14)" }}>
          <Stack spacing={2}>
            <Typography
              align="center"
              sx={{
                fontSize: "24px",
                fontWeight: 600,
                color: "rgba(68, 101, 167, 0.8)",
              }}
            >
              Grocery App
            </Typography>
            {fruitData
              .sort((a, b) => b.votes - a.votes)
              .map((obj) => {
                return (
                  <Stack
                    key={obj.name}
                    direction={"row"}
                    justifyContent="space-between"
                    alignItems="center"
                  >
                    <Typography>{obj.name}</Typography>
                    <Stack direction={"row"} alignItems="center">
                      <Tooltip title="Down Vote">
                        <IconButton
                          onClick={() => {
                            handleDownVote(obj.name);
                          }}
                        >
                          <RemoveIcon />
                        </IconButton>
                      </Tooltip>
                      <Typography>{obj.votes} Votes</Typography>
                      <Tooltip title="Up Vote">
                        <IconButton
                          onClick={() => {
                            handleUpVote(obj.name);
                          }}
                        >
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    </Stack>
                  </Stack>
                );
              })}
            {addMode ? (
              <TextField
                size="small"
                label="Add Fruit"
                onChange={(e) => {
                  setInput(e.target.value);
                }}
                InputProps={{
                  endAdornment: (
                    <InputAdornment position="end">
                      <Tooltip title="Add Fruit">
                        <IconButton onClick={handleAddFruit}>
                          <AddIcon />
                        </IconButton>
                      </Tooltip>
                    </InputAdornment>
                  ),
                }}
              />
            ) : (
              <Button
                onClick={() => {
                  setAddMode(true);
                }}
              >
                Add New Fruit
              </Button>
            )}
          </Stack>
        </Paper>
      </Grid>
    </Grid>
  );
}

export default GroceryApp;
