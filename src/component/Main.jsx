import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callToAPI } from "./ReduxSlice";
import { Grid, Card, Box, Button, Modal, Typography, CardActionArea } from "@mui/material";

function Main() {
  const [allUsersData, setAllUsersData] = useState();
  // Modal page
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  // Redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  console.log(data);

  useEffect(() => {
    setAllUsersData(data);
  }, [data]);

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
    border: "2px solid #000",
    boxShadow: 24,
    p: 4,
  };

  return (
    <>
      <Grid container spacing={2}>
        {allUsersData?.map((el) => (
          <>
            <Grid item xs={3} md={3} sx={{ textAlign: "center" }} key={el.id} onClick={handleOpen}>
              <Card sx={{ maxWidth: 300 }}>
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
              <div>
                <Modal
                  open={open}
                  onClose={handleClose}
                  aria-labelledby="modal-modal-title"
                  aria-describedby="modal-modal-description"
                >
                  <Box sx={style}>
                    <Typography
                      id="modal-modal-title"
                      variant="h6"
                      component="h2"
                    >
                      Text in a modal
                    </Typography>
                    <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                      Duis mollis, est non commodo luctus, nisi erat porttitor
                      ligula.
                    </Typography>
                  </Box>
                </Modal>
              </div>
            </Grid>
          </>
        ))}
      </Grid>
    </>
  );
}
export default Main;
