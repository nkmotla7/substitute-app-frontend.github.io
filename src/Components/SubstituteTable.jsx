import { useEffect, useState } from "react";
import { listSubstituteTeachers } from "../services/TeacherService";

const SubstituteTable = () => {
  const [substituteTeacher, setSubstituteTeacher] = useState([]);

  useEffect(() => {
    listSubstituteTeachers()
      .then((response) => {
        console.log(response.data);
        setSubstituteTeacher(response.data);
      })
      .catch((error) => {
        console.log(error);
      });
  }, []);

  return (
    <>
      <table className="table table-bordered border-primary">
        <thead>
          <tr>
            <th scope="col">#</th>
            <th scope="col">Teacher Name</th>
            <th scope="col">Period I</th>
            <th scope="col">Period II</th>
            <th scope="col">Period III</th>
            <th scope="col">Period IV</th>
            <th scope="col">Period V</th>
            <th scope="col">Period VI</th>
            <th scope="col">Period VII</th>
            <th scope="col">Period VIII</th>
            <th scope="col">Co-Class Teacher</th>
          </tr>
        </thead>
        <tbody>
          {substituteTeacher.map((subTeacher) => (
            <tr key={subTeacher.id}>
              <td>{subTeacher.id}</td>
              <td>{subTeacher.name}</td>
              <td>{subTeacher.period1}</td>
              <td>{subTeacher.period2}</td>
              <td>{subTeacher.period3}</td>
              <td>{subTeacher.period4}</td>
              <td>{subTeacher.period5}</td>
              <td>{subTeacher.period6}</td>
              <td>{subTeacher.period7}</td>
              <td>{subTeacher.period8}</td>
              <td>Class</td>
            </tr>
          ))}
        </tbody>
      </table>
    </>
  );
};

export default SubstituteTable;
