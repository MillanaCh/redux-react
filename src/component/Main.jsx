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
  const [selectedCartoon, setSelectedCartoon] = useState([])
  console.log(selectedCartoon)
  // Modal page
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  // console.log(data);

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
  };

  return (
    <Grid container spacing={2}>
      {data?.map((el, index) => (
        <>
          <Grid item xs={3} md={3} sx={{ textAlign: "center" }} key={index} onClick={handleOpen}>
            <Card sx={{ maxWidth: 300 }}  onClick={() => setSelectedCartoon(el)}>
              <CardActionArea>
                <img src={el.image} height="250px" />
                <Typography gutterBottom variant="h5" component="div">
                  {el.title}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {el.creator[0]}
                </Typography>
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
                  <Typography
                    id="modal-modal-title"
                    variant="h6"
                    component="h2"
                  >
                   {selectedCartoon.title}
                  </Typography>
                  <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                    {/* Genre: {el.genre} */}
                  </Typography>
                </Box>
              </Modal>
          </div>
    </Grid>
  );
}
export default Main;
