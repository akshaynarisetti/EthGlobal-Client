import { useState } from "react";
import { IconButton, Snackbar, Button } from "@mui/material";
import ShareIcon from "@mui/icons-material/Share";

const CopyToClipboardButton = (url) => {
  const [open, setOpen] = useState(false);

  const styles = {
    root: {
      background: 'red'
    }
  };
  
  const handleClick = () => {
    setOpen(true);
    navigator.clipboard.writeText(url.url);
  };

  return (
    <>
    <Button onClick={handleClick} >Click to COPY<IconButton  style={{color: "#4200FF" }} color="primary">
        <ShareIcon />
    </IconButton></Button>
      
      <Snackbar
        message="Copied to Clip Board"
        anchorOrigin={{ vertical: "top", horizontal: "center" }}
        autoHideDuration={2000}
        onClose={() => setOpen(false)}
        open={open}
      />
    </>
  );
};

export default CopyToClipboardButton;