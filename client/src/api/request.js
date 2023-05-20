import { BASE_URL } from "./base_url";
import axios from "axios";

//get all Peoples
export const getAllPeoples = async (name) => {
  let globalData;
  let URL;
  if (!name) {
    URL = BASE_URL+'/peoples';
  }
  else{
    URL = BASE_URL+'/peoples'+`?name=${name}`;
  }
  await axios.get(URL).then((res) => {
    globalData = res.data.data;
  });
  return globalData;
};
//get Peoples by ID
export const getPeoplesByID = async (ID) => {
  let globalData;
  await axios.get(`${BASE_URL}/peoples/${ID}`).then((res) => {
    globalData = res.data.data;
  });
  return globalData;
};

//delete Peoples by  ID
export const deletePeoplesByID = async (ID) => {
  let deletedPeoples;
  await axios.delete(`${BASE_URL}/peoples/${ID}`).then((res) => {
    deletedPeoples = res.data.data;
  });

  return deletedPeoples;
};
//post Peoples
export const postPeoples = (payload) => {
  axios.post(`${BASE_URL}/peoples`, payload);
};
//put Peoples
export const editPeoples=(id,payload)=>{
  axios.put(`${BASE_URL}/peoples/${id}`,payload)
}