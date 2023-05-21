import React, { useEffect, useState } from "react";
import { useNavigate, useParams } from "react-router-dom";
import { editPeoples, getPeoplesByID } from "../api/request";
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
      formik.values.birthYaer = res.birthYaer;
      formik.values.ImageURL = res.ImageURL;
      formik.values.Genre = res.Genre;
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
      birthYaer: people.birthYaer,
      ImageURL: people.ImageURL,
      Genre:people.Genre
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
          placeholder="people birthYear"
          name="birthYear"
          value={formik.values.birthYaer}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
         <TextField
          type="url"
          placeholder="people ImageURL"
          name="ImageURL"
          value={formik.values.ImageURL}
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
        />
        
        <TextField
          type="text"
          placeholder="people genre"
          name="Genre"
          value={formik.values.Genre}
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