import React, {useState} from 'react';
import { storage } from '../config/firebase';

function FilesUpload() {
    
  const [file, setFile] = useState(null);

  const handleFileChange = (e) => {
    const selectedFile = e.target.files[0];
    setFile(selectedFile);
  };

  const handleUpload = async () => {
    try {
      const storageRef = storage.ref();
      const fileRef = storageRef.child(file.name);
      await fileRef.put(file);
      console.log('File uploaded successfully');
    } catch (error) {
      console.error('Error uploading file:', error.message);
    }
  };
  return (
    <div>
      <h2> File upload </h2>
      <input type="file" name="files" id="file1" onChange={handleFileChange}/>
      <button type="submit" onClick={handleUpload}></button>
    </div>
  )
}

export default FilesUpload;
