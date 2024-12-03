import React from "react";
import { LinearProgress } from "@mui/material";

const LoadingIndicator = () => {
    return (
        <div style={{ position: "fixed", top: 0, left: 0, width: "100%", zIndex: 999 }}>
            <LinearProgress />
        </div>
    );
};

export default LoadingIndicator;