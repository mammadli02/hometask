import { useState, useEffect } from "react";
import Box from "@mui/material/Box";
import Grid from "@mui/material/Grid";
import { Card, Typography } from "antd";
import { deletePeoplesByID, getAllPeoples } from "../api/request";
import { Link } from "react-router-dom";
import { Button, TextField } from "@mui/material";
import Swal from "sweetalert2";
import { Helmet } from "react-helmet";

const Peoples = () => {
  const [peoples, setPeoples] = useState([]);
  useEffect(() => {
    getAllPeoples().then((res) => {
      setPeoples(res);
    });
  }, []);
  function handleSearch(e) {
    getAllPeoples(e.target.value).then((res) => {
      setPeoples(res);
    });
  }
  return (
    <>
      <Helmet>
        <title>Peoples</title>
      </Helmet>
      <Box
        
        sx={{ flexGrow: 1, width: "90%", margin: "25px auto" }}
      >
        <div style={{ display: "flex", alignItems: "baseline" }}>
          <TextField
            onChange={(e) => handleSearch(e)}
            style={{ marginBottom: "30px" }}
            id="outlined-basic"
            label="Search Peoples"
            variant="outlined"
          />
          <Button
            variant="contained"
            color="success"
            style={{marginLeft:'10px'}}
            onClick={() => {
              let sortedPeoples = [...peoples.sort((a, b) => a.age - b.age)];
              setPeoples(sortedPeoples);
            }}
          >
            Sort by Age
          </Button>
        </div>

        <Grid container spacing={2}>
          {peoples &&
            peoples.map((people) => {
              return (
                <Grid key={people.id} item lg={3} md={6} sm={12}>
                  <Card
                    hoverable
                    cover={
                      <img
                        style={{
                          height: "250px",
                          objectFit: "cover",
                          objectPosition: "top center ",
                        }}
                        alt="example"
                        src={people.imageURL}
                      />
                    }
                  >
                    <Typography>
                      <Link to={`/peoples/${people._id}`}>{people.name}</Link>
                    </Typography>
                    <Typography>age: {people.age}</Typography>
                    <Button
                      onClick={() => {
                        Swal.fire({
                          title: "Are you sure?",
                          text: "You won't be able to revert this!",
                          icon: "warning",
                          showCancelButton: true,
                          confirmButtonColor: "#3085d6",
                          cancelButtonColor: "#d33",
                          confirmButtonText: "Yes, delete it!",
                        }).then((result) => {
                          if (result.isConfirmed) {
                            deletePeoplesByID(people._id).then((res) => {
                              Swal.fire(
                                `${res.name} Deleted!`,
                                "Your people has been deleted.",
                                "success"
                              );
                            });
                            setPeoples(
                              peoples.filter((x) => x._id !== people._id)
                            );
                          }
                        });
                      }}
                      variant="outlined"
                      color="warning"
                    >
                      Delete
                    </Button>


               <Button><Link to={`/peoples/edit/${people._id}`}>EDIT</Link></Button>
                  </Card>
                </Grid>
              );
            })}
        </Grid>
      </Box>
    </>
  );
};

export default Peoples;
