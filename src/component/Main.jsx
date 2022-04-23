import { useEffect, useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { callToAPI } from "./ReduxSlice";

import {
  Grid,
  Card,
  CardActionArea
} from "@mui/material";

function Main() {
  const [allUsersData, setAllUsersData] = useState([]);
  const dispatch = useDispatch();
  const data = useSelector((state) => state);
  console.log(data)
  
  useEffect(() =>{
    setAllUsersData(data)
  }, [data])

  useEffect(() => {
    dispatch(callToAPI())
  }, []);

  return (
    <>
          <Grid container spacing={2}>
          {allUsersData?.map((el) => {
            return (
              <Grid item xs={3} md={3} key={el.id}>
                <Card sx={{ maxWidth: 300 }}>
                  <CardActionArea>
                    <h3>{el.title}</h3>
                  </CardActionArea>
                </Card>
              </Grid>
            );
          })}
        </Grid>
    </>
  );
}
export default Main;
