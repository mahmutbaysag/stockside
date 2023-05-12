import {
  Button,
  Card,
  CardContent,
  CardHeader,
  Dialog,
  DialogActions,
  DialogContent,
  Grid,
  Typography,
} from "@mui/material";
import React from "react";

const DetailModal = ({
  open,
  setOpen,
  title = "",
  subheader = "",
  data = "",
}) => {
  const handleClose = () => {
    setOpen(false);
  };

  return (
    <div>
      <Dialog
        open={open}
        onClose={handleClose}
        aria-labelledby="alert-dialog-title"
        aria-describedby="alert-dialog-description"
        sx={{
          "& .MuiDialog-paper": {
            width: "100%",
            maxWidth: "600px",
            height: "100%",
            maxHeight: "300px",
          },
          "& .MuiPaper-root": {
            padding: "0px",
            height: "100%",
          },
        }}
      >
        <DialogContent>
          <Card>
            <CardHeader
              title={title ? title : ""}
              subheader={subheader ? subheader : ""}
            />
            <CardContent>
              {typeof data === "string"
                ? data
                : data.map((item, index) => {
                    return Object.keys(item).map((key) => {
                      return (
                        <Grid container>
                          <Grid item xs={4}>
                            {item[key]}
                          </Grid>
                        </Grid>
                      );
                    });
                  })}
            </CardContent>
          </Card>
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClose}>Close</Button>
        </DialogActions>
      </Dialog>
    </div>
  );
};

export default DetailModal;
