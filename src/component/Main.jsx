import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callToAPI } from "./ReduxSlice";
import Header from "./Header";
import {
  Grid,
  Card,
  Modal,
  Box,
  Paper,
  Typography,
  CardActionArea,
} from "@mui/material";
import { debounce } from "lodash";

function Main() {
  const [selectedCartoon, setSelectedCartoon] = useState([]);
  const [loading, setLoading] = useState(true);

  const dispatch = useDispatch();
  const data = useSelector((state) => state);

  useEffect(() => {
    dispatch(callToAPI());
  }, []);
  setTimeout(() => {
    setLoading(false);
  }, 2000);

  // Modal page
  const [open, setOpen] = useState(false);
  const handleClose = () => setOpen(false);
  const handleOpen = () => setOpen(true);
  // Modal Style part
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

  // Search part
  const [searched, setSearched] = useState([]);
  const [lengthSearch, setLengthSearch] = useState(0);
  const handlerOnChange = debounce((e) => {
    const filteredCartoons = data.filter((cartoon) => {
      if (cartoon.title === e.target.value) {
        return cartoon;
      }
    });
    setSearched(filteredCartoons);
    setLengthSearch(filteredCartoons[0].title.length)
  }, 500);

  useEffect(() => {
    handlerOnChange()
  }, [searched])
  // https://logolook.net/wp-content/uploads/2021/07/Nickelodeon-Logo.svg
  // https://static.cdnlogo.com/logos/n/16/nickelodeon.svg
  return (
    <>
      {loading ? (
        <img
          src="https://logolook.net/wp-content/uploads/2021/07/Nickelodeon-Logo.svg"
          width="100%"
        />
      ) : (
        <>
          <Header />
          <div className="input-div">
            <input
              className="input-search"
              onChange={(e) => handlerOnChange(e)}
            />
          </div>
          {lengthSearch > 1 ? (
            <>
            <Grid container spacing={2}>
            {searched?.map((el, index) => (
              <>
                <Grid
                  item
                  xs={3}
                  md={2}
                  sx={{ textAlign: "center" }}
                  key={index}
                  onClick={handleOpen}
                >
                  <Card
                    sx={{ maxWidth: 300 }}
                    onClick={() => setSelectedCartoon(el)}
                  >
                    <CardActionArea>
                      <img src={el.image} height="260px" />
                      <h3 style={{ color: "#fbad00" }}>{el.title}</h3>
                      <p>
                        Program creator: <h4>{el.creator[0]}</h4>
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
                  <div className="element-flex">
                    <p>First episode year: </p>
                    <h3> {selectedCartoon.year}</h3>
                  </div>
                  <div className="element-flex">
                    <p>Episodes: </p>
                    <h3>{selectedCartoon.episodes}</h3>
                  </div>
                  <div className="element-flex">
                    <p>One episode time:</p>
                    <h3>{selectedCartoon.runtime_in_minutes}</h3>
                  </div>
                </Box>
              </Modal>
            </div>
          </Grid>
            </>
          ) : (
            <>
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
                  <Card
                    sx={{ maxWidth: 300 }}
                    onClick={() => setSelectedCartoon(el)}
                  >
                    <CardActionArea>
                      <img src={el.image} height="260px" />
                      <h3 style={{ color: "#fbad00" }}>{el.title}</h3>
                      <p>
                        Program creator: <h4>{el.creator[0]}</h4>
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
                  <div className="element-flex">
                    <p>First episode year: </p>
                    <h3> {selectedCartoon.year}</h3>
                  </div>
                  <div className="element-flex">
                    <p>Episodes: </p>
                    <h3>{selectedCartoon.episodes}</h3>
                  </div>
                  <div className="element-flex">
                    <p>One episode time:</p>
                    <h3>{selectedCartoon.runtime_in_minutes}</h3>
                  </div>
                </Box>
              </Modal>
            </div>
          </Grid></>
          )}
          
        </>
      )}
    </>
  );
}
export default Main;
