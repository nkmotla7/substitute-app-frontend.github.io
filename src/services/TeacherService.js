import axios from "axios";

const REST_API_BASE_URL = "http://13.201.118.247:8080/";

export const listTeachers = () => {
  return axios.get(REST_API_BASE_URL + "getTeachers");
};

export const listAbsentTeachers = () => {
  return axios.get(REST_API_BASE_URL + "getAbsentTeachers");
};

export const listSubstituteTeachers = () => {
  return axios.get(REST_API_BASE_URL + "getSubstituteTeachers");
};
