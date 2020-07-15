import React, { useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';

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

    const loadPreview = async (e) => {
        const currFile = e.target.files[0];

        setPreviews([...previews, currFile])
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <input className={styles.input} type='file'
                    name="File"
                    id='file'
                    placeholder="Upload image"
                    accept='image/*'
                    onChange={loadPreview}
                />
                <label htmlFor="file">Add files to galery</label>
            </div>
            <div className={styles.wrapper}>
                {previews.map((preview, index) => {
                    const imagePreview = URL.createObjectURL(preview)
                    return <div key={index} className={styles['card-wrapper']}>
                        <img className={styles['card-img']} src={imagePreview} />
                    </div>
                })}
            </div>
            <div className={styles.wrapper}>
                <button onClick={uploadImages}>Upload images</button>
            </div>
        </div>
    );
}