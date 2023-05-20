import React, { useEffect, useState } from 'react'
import { Link, useParams } from 'react-router-dom'
import { getPeoplesByID } from '../api/request';
import { Box, Button, Grid, Typography } from '@mui/material';
import { Card } from 'antd';
import { Helmet } from 'react-helmet';

const DetailPeople = () => {
  const[people,setPeople] = useState({});
  const{id} = useParams();
  useEffect(()=>{
    getPeoplesByID(id).then(res=>{
        setPeople(res);
    })
  },[id]);
  return (
    <>
    <Helmet>
       <title>Detail Page</title>
     </Helmet>
     <Box sx={{ flexGrow: 1, width: "90%", margin: "25px auto" }}>
      <Grid container spacing={2}>
              <Grid key={people._id} item lg={3} md={6} sm={12}>
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
                  <Typography>{people.name}</Typography>
                  <Button variant='contained' color="primary"><Link style={{color:'white'}} to='/peoples'>Go Back</Link></Button>
                  <Typography>birthYaer: {people.birthYaer}</Typography>
                  <Typography>Genre: {people.Genre}</Typography>
                </Card>
              </Grid>
      </Grid>
    </Box>
    </>
  )
}

export default DetailPeople