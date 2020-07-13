import React from 'react';
import styles from './index.module.css';
import axios from 'axios';

export default class ImageUploader extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            image: '',
            loading: false
        }
    }

    uploadImage = async (e) => {
        const files = e.target.files;
        const data = new FormData();
        data.append('file', files[0]);
        data.append('upload_preset', 'default');

        const res = await axios.post(process.env.REACT_APP_CLOUDINARY_API_BASE_URL, data);
    }

    render() {
        return (
            <div className={styles.wrapper}>
                <h3>Upload image</h3>
                <input type='file'
                    name="File"
                    placeholder="Upload image"
                    onChange={this.uploadImage}
                />
            </div>
        );
    }
}