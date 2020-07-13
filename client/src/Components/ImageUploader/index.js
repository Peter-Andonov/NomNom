import React, { useState } from 'react';
import styles from './index.module.css';
import axios from 'axios';

export default function ImageUploader() {
    const [image, setImage] = useState('');
    const [loading, setLoading] = useState(false);

    const uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'default');
        setLoading(true)
        const res = await axios.post(process.env.REACT_APP_CLOUDINARY_API_BASE_URL, data)
        setImage(res.data.secure_url);
        setLoading(false)
    }

    return (
        <div>
            <div className={styles.wrapper}>
                <input className={styles.input} type='file'
                    name="File"
                    id='file'
                    placeholder="Upload image"
                    accept='image/*'
                    onChange={uploadImage}
                />
                <label for="file">Select file</label>
            </div>
            <div className={styles.wrapper}>
                <img className={styles['uploaded-image-card']} src={image} />
            </div>
        </div>
    );
}