import React, { useState } from 'react';
import axios from 'axios';
import SelectorButton from './SelectorButton';
import PreviewList from './PreviewsList';


export default function ImageUploader() {
    const [previews, setPreviews] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const uploadImages = () => {
        
        previews.map( async (preview) => {
            const data = new FormData();

            data.append('file', preview);

            data.append('upload_preset', 'default');

            const res = await axios.post(process.env.REACT_APP_CLOUDINARY_API_BASE_URL, data);

            setImageUrls([...imageUrls, res.data.secure_url])
        })
        
    }

    function handleInput(newImage) {
        setPreviews([...previews, newImage])
      }

    return (
        <div>
            <SelectorButton onChange={handleInput} />
            <PreviewList previews={previews}/>
            <button onClick={uploadImages}>Upload images</button>
        </div>
    );
}