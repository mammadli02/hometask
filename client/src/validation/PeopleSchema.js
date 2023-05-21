import * as yup from "yup";

export const PeopleValidation = yup.object().shape({
  name: yup.string().required("name is required"),
  birthYaer: yup
    .number()
    .integer("age must be an integer")
    .positive("age cannot be negative number")
    .required("age is required"),
    ImageURL: yup
    .string()
    .required("image is required"),
    Genre: yup 
    .string()
    .required("genre is required"),
   
});
  