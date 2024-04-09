import { useState } from "react";
import { useNavigate } from "react-router-dom";

const ExcelUpload = () => {
  const [file, setFile] = useState();
  const navigator = useNavigate();

  const handleFile = (e) => {
    setFile(e.target.files[0]);
    console.log(e.target.files[0]);
  };

  const handleUpload = (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("files", file);
    fetch("http://127.0.0.1:8080/exam-import-excel", {
      method: "POST",
      body: formData,
    })
      .then((response) => {
        response.json();
        navigator("/listTeachers");
      })
      .then((result) => {
        console.log("success", result);
      })
      .catch((error) => {
        console.log("Error", error);
      });

    // navigator("/listTeachers");
  };

  return (
    <>
      <h1 className="m-5">Upload Teachwise Data in Excel</h1>
      <form className="input-group mb-3 " onSubmit={handleUpload}>
        <input
          type="file"
          name="file"
          className="form-control"
          onChange={handleFile}
        />
        <button className="input-group-text btn btn-outline-primary">
          Upload
        </button>
      </form>
    </>
  );
};

export default ExcelUpload;
