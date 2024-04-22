import { useEffect, useRef, useState } from "react";
import { listTeachers } from "../services/TeacherService";
import { useNavigate } from "react-router-dom";

const TeacherList = () => {
  const [teachers, setTeachers] = useState([]);
  //   const clickedM = () => {
  //     console.log(teachers);
  //   };
  const navigator = useNavigate();

  const onChangeEventFirstHalf = (e, index) => {
    // console.log(e, index);
    const res = [...teachers];
    res[index].absentFirstHalf = e.target.checked;
    setTeachers(res);
  };

  const onChangeEventSecondHalf = (e, index) => {
    // console.log(e, index);
    const res = [...teachers];
    res[index].absentSecondHalf = e.target.checked;
    setTeachers(res);
  };

  const onChangeEventFullDay = (e, index) => {
    // console.log(e, index);
    const res = [...teachers];
    console.log(res);
    res[index].absentFullDay = e.target.checked;
    setTeachers(res);
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log(teachers);
    // for (let i = 0; i < original.length; i++) {
    //   if (
    //     original[i].absentFirstHalf != teachers[i].absentFirstHalf ||
    //     original[i].absentSecondHalf != teachers[i].absentSecondHalf
    //   ) {
    //     console.log("diff");
    //     comparedRes.push[teachers[i]];
    //   }
    // }

    fetch("http://13.126.112.84:8080/updateTeachers", {
      method: "POST",
      body: JSON.stringify(teachers),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => {
        response.json();
        navigator("/listAbsentList");
      })
      .then((result) => {
        console.log("success", result);
      })
      .catch((error) => {
        console.log("Error", error);
      });
  };

  useEffect(() => {
    listTeachers()
      .then((response) => {
        // console.log(response.data);
        setTeachers(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // fetch("http://13.126.112.84:8080/getTeachers")
    //   .then((response) => response.json())
    //   .then((data) => setTeachers(data))
    //   .then((err) => console.log(err));
  }, []);
  return (
    <>
      <table className="table table-bordered border-primary">
        <tbody>
          {teachers.map((teacher, index) => (
            // <li key={teacher.id}>
            //   {teacher.name}
            //   <div class="form-check form-switch">
            //     <input
            //       class="form-check-input"
            //       type="checkbox"
            //       role="switch"
            //       id="flexSwitchCheckChecked"
            //       checked
            //     />
            //     <label class="form-check-label" for="flexSwitchCheckChecked">
            //       HalfDay
            //     </label>
            //   </div>
            // </li>
            <tr key={teacher.id}>
              <td className="text-start">{teacher.name}</td>
              <td>
                <input
                  type="checkbox"
                  checked={teacher.absentFirstHalf}
                  onChange={(e) => onChangeEventFirstHalf(e, index)}
                />
              </td>
              <td>
                <input
                  type="checkbox"
                  checked={teacher.absentSecondHalf}
                  onChange={(e) => onChangeEventSecondHalf(e, index)}
                />
              </td>
              {/* <td>
                <input
                  type="checkbox"
                  checked={teacher.absentFullDay}
                  onChange={(e) => onChangeEventFullDay(e, index)}
                />
              </td> */}
            </tr>
          ))}
        </tbody>
      </table>
      <form className="input-group mb-3 " onSubmit={handleSubmit}>
        <button className="input-group-text btn btn-outline-primary">
          Upload
        </button>
      </form>
    </>
  );
};

export default TeacherList;
