import { useEffect, useState } from "react";
import { listAbsentTeachers } from "../services/TeacherService";
import { useNavigate } from "react-router-dom";

const AbsentTeacherComponet = () => {
  const [absentTeacher, setAbsentTeacher] = useState([]);
  const [vacantTeach, setVacantTeacher] = useState([]);
  const [dropdownBackgroundColors, setDropdownBackgroundColors] = useState([]);

  const [subData, setSubData] = useState([]);

  const navigator = useNavigate();

  const handleClickNext = () => {
    navigator("/substituteList");
  };

  const handleClick = (key, day) => (e, index) => {
    console.log(key);
    console.log(e);
    console.log(day);
    const url = "http://127.0.0.1:8080/getVacantTeachers/" + key + "/" + day;
    fetch(url)
      .then((response) => response.json())
      .then((data) => {
        setVacantTeacher(data);
        // console.log(data);
      })
      .then((err) => console.log(err));

    // console.log(vacantTeach);
  };

  const onChangeEvent = (key, value) => (e, index) => {
    console.log(index);
    console.log(key);
    console.log("value", value);
    const res = [...absentTeacher];
    //     console.log(res);
    //     res[index].absentFullDay = e.target.checked;
    let s = e.target.value;
    absentTeacher[index].currentPeriod = key;
    absentTeacher[index].currentSubstituteTeacherClass = value;
    absentTeacher[index].currentSubstituteTeacherName = s.split("|")[0];
    if (key === "period1") {
      absentTeacher[index].substituteTeacherPeriod1 = e.target.value;
    } else if (key === "period2") {
      absentTeacher[index].substituteTeacherPeriod2 = e.target.value;
    } else if (key === "period3") {
      absentTeacher[index].substituteTeacherPeriod3 = e.target.value;
    } else if (key === "period4") {
      absentTeacher[index].substituteTeacherPeriod4 = e.target.value;
    } else if (key === "period5") {
      absentTeacher[index].substituteTeacherPeriod5 = e.target.value;
    } else if (key === "period6") {
      absentTeacher[index].substituteTeacherPeriod6 = e.target.value;
    } else if (key === "period7") {
      absentTeacher[index].substituteTeacherPeriod7 = e.target.value;
    } else if (key === "period8") {
      absentTeacher[index].substituteTeacherPeriod8 = e.target.value;
    }
    setAbsentTeacher(absentTeacher);
  };

  const handleClickSubmit = (e, index, index1) => {
    console.log("submitted");
    console.log(index);
    e.preventDefault();

    // console.log(teachers);
    // for (let i = 0; i < original.length; i++) {
    //   if (
    //     original[i].absentFirstHalf != teachers[i].absentFirstHalf ||
    //     original[i].absentSecondHalf != teachers[i].absentSecondHalf
    //   ) {
    //     console.log("diff");
    //     comparedRes.push[teachers[i]];
    //   }
    // }
    console.log(JSON.stringify(subData));

    fetch("http://127.0.0.1:8080/updateSubstitute", {
      method: "POST",
      body: JSON.stringify(absentTeacher),
      headers: {
        "Content-Type": "application/json",
      },
    })
      .then((response) => response.json())
      .then((result) => {
        console.log("success", result);
        // Change background color of the dropdown upon successful submission
      })
      .catch((error) => {
        console.log("Error", error);
      });

    const updatedDropdownBackgroundColors = [...dropdownBackgroundColors];
    updatedDropdownBackgroundColors[index1] = "green"; // Change to your desired background color
    setDropdownBackgroundColors(updatedDropdownBackgroundColors);
    console.log(dropdownBackgroundColors);
    console.log("hii" + updatedDropdownBackgroundColors);
    absentTeacher[index].currentPeriod = null;
    absentTeacher[index].currentSubstituteTeacherClass = null;
    absentTeacher[index].currentSubstituteTeacherName = null;
    setVacantTeacher([]);
  };

  useEffect(() => {
    listAbsentTeachers()
      .then((response) => {
        console.log(response.data);
        setAbsentTeacher(response.data);
      })
      .catch((error) => {
        console.log(error);
      });

    // fetch("http://127.0.0.1:8080/getTeachers")
    //   .then((response) => response.json())
    //   .then((data) => setTeachers(data))
    //   .then((err) => console.log(err));
  }, []);

  return (
    <>
      {absentTeacher.map((teacher, index) => (
        <div key={teacher.id}>
          <h1>{teacher.name}</h1>
          <table className="table table-bordered table-striped">
            <tbody>
              {Object.entries(teacher).map(([key, value], index1) => {
                // Check if value is empty
                if (
                  value !== "" &&
                  (key === "period1" ||
                    key === "period2" ||
                    key === "period3" ||
                    key === "period4" ||
                    key === "period5" ||
                    key === "period6" ||
                    key === "period7" ||
                    key === "period8")
                ) {
                  return (
                    <tr
                      key={key + value}
                      style={{
                        backgroundColor: dropdownBackgroundColors[index1],
                      }}
                    >
                      <td>
                        {key} :{value}
                      </td>
                      <td className="d-flex justify-content-evenly">
                        <button
                          className="btn btn-danger"
                          onClick={handleClick(key, teacher.day)}
                        >
                          <i className="bi bi-bootstrap-reboot"></i>
                        </button>
                        <select
                          className="form-select"
                          aria-label="Default select example"
                          onChange={(e) => onChangeEvent(key, value)(e, index)}
                          style={{
                            width: "30vw",
                          }}
                        >
                          {vacantTeach.map((vacant) => (
                            <option
                              key={vacant.id}
                              value={vacant.combinedString}
                            >
                              {vacant.combinedString}
                            </option>
                          ))}
                        </select>
                        <button
                          className="btn btn-success"
                          onClick={(e) => handleClickSubmit(e, index, index1)}
                        >
                          Done
                        </button>
                      </td>
                    </tr>
                  );
                } else {
                  return null; // Skip rendering if value is empty
                }
              })}
            </tbody>
          </table>
        </div>
      ))}
      <button className="btn btn-primary btn-lg" onClick={handleClickNext}>
        Next
      </button>
    </>
  );
};

export default AbsentTeacherComponet;
