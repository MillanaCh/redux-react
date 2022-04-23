import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callToAPI } from "./ReduxSlice";
import {
  Grid,
  Card,
  Modal,
  Box,
  Paper,
  Typography,
  CardActionArea,
} from "@mui/material";

function Main() {
  const [selectedCartoon, setSelectedCartoon] = useState([]);
  // Modal page
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  console.log(data);

  useEffect(() => {
    dispatch(callToAPI());
  }, []);

  // Style part
  const style = {
    position: "absolute",
    top: "50%",
    left: "50%",
    transform: "translate(-50%, -50%)",
    width: 400,
    bgcolor: "background.paper",
    border: "none",
    borderRadius: "5px",
    p: 4,
    textAlign: "center",
  };

  return (
    <Grid container spacing={2}>
      {data?.map((el, index) => (
        <>
          <Grid
            item
            xs={3}
            md={2}
            sx={{ textAlign: "center" }}
            key={index}
            onClick={handleOpen}
          >
            <Card sx={{ maxWidth: 300 }} onClick={() => setSelectedCartoon(el)}>
              <CardActionArea>
                <img src={el.image} height="250px" />
                <h3>{el.title}</h3>
                <p>
                  Program creator: <h3>{el.creator[0]}</h3>
                </p>
              </CardActionArea>
            </Card>
          </Grid>
        </>
      ))}
      <div>
        <Modal
          open={open}
          onClose={handleClose}
          aria-labelledby="modal-modal-title"
          aria-describedby="modal-modal-description"
        >
          <Box sx={style}>
            <img src={selectedCartoon.image} height="250px" />
            <h2>{selectedCartoon.title}</h2>
            <div>
              <p>First episode year:</p>
              <h3>{selectedCartoon.year}</h3>
            </div>
            <div>
              <p>Episodes:</p>
              <h5>{selectedCartoon.episodes}</h5>
            </div>
            <div>
              <p>One episode: </p>
              <h5>{selectedCartoon.runtime_in_minutes}</h5>
            </div>
          </Box>
        </Modal>
      </div>
    </Grid>
  );
}
export default Main;
