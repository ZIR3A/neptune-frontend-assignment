import { Button, Divider, Paper, TextField, Typography } from "@mui/material";
import { Box } from "@mui/system";
import type { NextPage } from "next";
import React, { useState } from "react";
import AlertDialog from "./dialog";

interface IStateType {
  NEP: number;
  BUSD: number;
}

const InputFields: NextPage = () => {
  const [convertAmount, setConvertAmount] = useState<IStateType>({
    NEP: 0,
    BUSD: 0,
  });

  const [open, setOpen] = useState<boolean>(false);

  const handleInput = (event: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value } = event.target;
    const convertValue = parseInt(value);
    switch (name) {
      case "NEP":
        setConvertAmount({
          ...convertAmount,
          NEP: convertValue,
          BUSD: convertValue * 3,
        });
        break;
      case "BUSD":
        setConvertAmount({
          ...convertAmount,
          BUSD: convertValue,
          NEP: convertValue / 3,
        });
        break;
    }
  };

  function getTwoDigitNum(params: number) {
    if (params > 0) return params.toFixed(2);
    return params;
  }

  return (
    <>
      <Box
        sx={{
          height: "100vh",
          width: "100vw",
          display: "flex",
          justifyContent: "center",
          flexDirection: "column",
          alignItems: "center",
          background: "#1e272e",
        }}
      >
        <Paper
          sx={{
            height: "305px",
            width: "500px",
            p: 2,
            boxShadow: 5,
          }}
        >
          <Typography
            sx={{ textAlign: "center", fontWeight: "bold" }}
            variant="h5"
          >
            Crypto Converter
          </Typography>
          <Divider sx={{ my: 2 }} />
          <TextField
            name="NEP"
            value={getTwoDigitNum(convertAmount.NEP)}
            onChange={handleInput}
            autoFocus
            fullWidth
            type="number"
            label="NEP"
            variant="standard"
            helperText="Enter NEP Amount"
          />
          <TextField
            name="BUSD"
            value={getTwoDigitNum(convertAmount.BUSD)}
            onChange={handleInput}
            autoFocus
            fullWidth
            type="number"
            label="BUSD"
            variant="standard"
            helperText="Enter BUSD Amount"
            sx={{ mt: 2 }}
          />
          <Button
            fullWidth
            sx={{ mt: 2, fontWeight: "bold" }}
            onClick={() => setOpen(true)}
          >
            Check wallet details
          </Button>
        </Paper>
        <Typography
          sx={{ color: "#dfe6e9", mt: 2, opacity: 0.5, fontSize: "0.8rem" }}
        >
          Created By : Saran Baral
        </Typography>
      </Box>
      <AlertDialog open={open} setOpen={setOpen} />
    </>
  );
};

export default InputFields;
