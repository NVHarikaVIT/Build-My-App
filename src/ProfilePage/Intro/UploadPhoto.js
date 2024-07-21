import React, { useState } from 'react';
import { getStorage, ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import { doc, updateDoc } from 'firebase/firestore';
import { db } from '../../config/firebase';

const UploadPhoto = ({ userId, position }) => {const [image, setImage] = useState(null);
    const [imageUrl, setImageUrl] = useState('');
  
    const handleFileChange = (e) => {
      if (e.target.files[0]) {
        setImage(e.target.files[0]);
      }
    };
  
    const handleUpload = async () => {
      const storage = getStorage();
      const storageRef = ref(storage, `images/${userId}/${position}`);
      await uploadBytes(storageRef, image);
      const url = await getDownloadURL(storageRef);
      setImageUrl(url);
  
      const userDocRef = doc(db, 'users', userId);
      await updateDoc(userDocRef, {
        [`${position}Image`]: url,
      });
    };
  
    return (
      <div>
        <input type="file" onChange={handleFileChange} />
        <button onClick={handleUpload}>Upload</button>
        {imageUrl && <img src={imageUrl} alt="Uploaded" />}
      </div>
    );
  };

export default UploadPhoto;
