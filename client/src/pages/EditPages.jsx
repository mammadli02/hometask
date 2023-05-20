import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editArtist, editPeoples, getPeoplesByID } from "../api/request";
import { Button, TextField, Typography } from "@mui/material";
import { useFormik } from "formik";

const EditPages = () => {
  const[peoples,setPeoples] = useState();
  console.log('peoples context: ',peoples);
  const { id } = useParams();
  const navigate = useNavigate();
  const [people, setPeople] = useState({});
  const[loading,setLoading] = useState(true);
  useEffect(() => {
    getPeoplesByID(id).then((res) => {
      setPeople(res);
      formik.values.name = res.name;
      formik.values.age = res.age;
      formik.values.imageURL = res.imageURL;
      setLoading(false);
    });
  }, [id]);
  const handleEdit = async(values, actions) => {
    // artist.find((x)=>x._id===id)
    setPeoples(values);
    await editPeoples(id,values);
    navigate('/peoples');
    actions.resetForm();
  };
  const formik = useFormik({
    initialValues: {
      name: people.name,
      age: people.age,
      imageURL: people.imageURL,
    },
    onSubmit: handleEdit,
  });
  return (
    <>
      <Typography
        style={{ textAlign: "center", marginTop: "40px", fontSize: "30px" }}
      >
        {people.name} Edit
      </Typography>
      { loading ? <div>loading...</div> : <form style={{width:'60%',margin:'0 auto'}} onSubmit={formik.handleSubmit}>
        <div style={{display:'flex',justifyContent:'center'}}>
        <TextField
          type="text"
          placeholder="people name"
          name="name"
          value={formik.values.name}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
         <TextField
          type="number"
          placeholder="people age"
          name="age"
          value={formik.values.age}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
         <TextField
          type="text"
          placeholder="people image"
          name="imageURL"
          value={formik.values.imageURL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        </div>
        <Button style={{margin:'0 auto',display:'block',marginTop:'20px'}} variant="contained" color="primary" type="submit">Edit</Button>
      </form> }
    </>
  );
};

export default EditPages;