import React from "react";
import { Helmet } from "react-helmet";
import { useFormik } from "formik";
import { PeopleValidation } from "../validation/PeopleSchema";
import { postPeoples } from "../api/request";

import Swal from "sweetalert2";
import { useNavigate } from "react-router-dom";

const AddPeoples = () => {
  const navigate = useNavigate();
  const handleSubmit = async(values, actions) => {
    await postPeoples(values);
    Swal.fire({
      position: 'top-end',
      icon: 'success',
      title: `${values.name} posted successfully!`,
      showConfirmButton: false,
      timer: 1500
    })
    actions.resetForm();
    navigate('/peoples');
  };
  const formik = useFormik({
    initialValues: {
      name: "",
      age: "",
      imageURL: "",
    },
    validationSchema: PeopleValidation,
    onSubmit: handleSubmit,
  });
  return (
    <>
      <Helmet>
        <title>Add New Peoples</title>
      </Helmet>
      <form onSubmit={formik.handleSubmit}>
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.name}
          placeholder="enter name"
          type="text"
          name="name"
        />
        {formik.errors.name && formik.touched.name && (
          <span>{formik.errors.name}</span>
        )}
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.age}
          placeholder="enter age"
          type="number"
          name="age"
        />
        {formik.errors.age && formik.touched.age && (
          <span>{formik.errors.age}</span>
        )}
        <input
          onChange={formik.handleChange}
          onBlur={formik.handleBlur}
          value={formik.values.imageURL}
          placeholder="enter image"
          type="url"
          name="imageURL"
        />
        {formik.errors.imageURL && formik.touched.imageURL && (
          <span>{formik.errors.imageURL}</span>
        )}
        <button
          disabled={Object.keys(formik.errors).length !== 0 ? true : false}
          type="submit"
        >
          Add New Peoples
        </button>
      </form>
    </>
  );
};

export default AddPeoples;


