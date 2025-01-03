import { useRef, useState, useEffect } from "react";
import "./App.css";
import { uploadFile } from "./services/api";

function App() {
  const [file, setFile] = useState("");
  const [result, setResult] = useState("");

  const fileInputRef = useRef();

  const onUploadClick = () => {
    fileInputRef.current.click();
  };

  useEffect(() => {
    const getImage = async () => {
      if (file) {
        const data = new FormData();
        data.append("name", file.name);
        data.append("file", file);
  
        try {
          const response = await uploadFile(data);
          console.log("Server Response:", response); // Debugging
          if (response && response.path) {
            setResult(response.path);
          } else {
            console.error("Invalid response format:", response);
            setResult("Error: Invalid server response");
          }
        } catch (error) {
          console.error("Error uploading file:", error);
          setResult("Error: Unable to upload file");
        }
      }
    };
    getImage();
  }, [file]);
  

  const background = `${process.env.PUBLIC_URL}/1.jpeg`;

  return (
    <div className="container">
      <div className="wrapper">
        <h1>Simple file Sharing</h1>
        <p>Upload and Share the Download link</p>

        <button onClick={() => onUploadClick()}>Upload</button>
        <input
          type="file"
          ref={fileInputRef}
          style={{ display: "none" }}
          onChange={(e) => setFile(e.target.files[0])}
        />

        <a href={result} target="_blank" rel="noopener noreferrer">{result}</a>
      </div>
    </div>
  );
}

export default App;