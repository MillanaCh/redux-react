import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callToAPI } from "./ReduxSlice";
import {
  Grid,
  Card,
  Modal,
  Box,
  Typography,
  CardActionArea,
} from "@mui/material";

function Main() {
  // const [allUsersData, setAllUsersData] = useState();
  const [selectedCartoon, setSelectedCartoon] = useState();
  // Modal page
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);

  let toogleModal = (id) => {
    setOpen(true);
    const selectedActor = data.filter((actor) => actor.id === id);
    setSelectedCartoon(selectedActor[0].id);
  };
  // Redux
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  console.log(data)

  // useEffect(() => {
  //   setAllUsersData(data);
  // }, [data]);

  useEffect(() => {
    dispatch(callToAPI());
  }, []);

  // if(loading){
  //   return <h1>Millana</h1>
  // }

  // useEffect(function toogleModal(id){
  //   const selectedActor = allUsersData.filter((actor) => actor.id === id)
  //   setSelectedCartoon(selectedActor)
  // }, [selectedCartoon])
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
    <>
      <Grid container spacing={2}>
        {data?.map((el) => (
          <>
            <Grid
              item
              xs={3}
              md={3}
              sx={{ textAlign: "center" }}
              key={el.id}
              onClick={() => toogleModal(el.id)}
            >
              <Card sx={{ maxWidth: 300 }} onClick={handleOpen}>
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
            {data.map(el => el.id === selectedCartoon) ? (
            <Box sx={style}>
              <img src={el.image} height="250px" />
              <Typography id="modal-modal-title" variant="h6" component="h2">
                {/* {selectedCartoon[0].title} */}
              </Typography>
              <Typography id="modal-modal-description" sx={{ mt: 2 }}>
                {/* Genre: {selectedCartoon[0].genre} */}
              </Typography>
            </Box>
             ): null}
          </Modal>
        </div>
      </Grid>
    </>
  );
}
export default Main;
