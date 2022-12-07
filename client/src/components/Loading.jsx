import React from "react";
import CircularProgress from "@mui/material/CircularProgress";
const Loading = ({ size }) => {
  return (
    <>
      <CircularProgress size={size} color="secondary" />
    </>
  );
};

export default Loading;
