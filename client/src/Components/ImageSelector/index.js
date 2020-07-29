import React, { useState } from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import SelectorButton from './SelectorButton';
import PreviewCard from './PreviewCard';


export default function ImageUploader() {
    const [imageUrl, setImageUrl] = useState('');
    const [deleteToken, setDeleteToken] = useState('');

    const uploadImage = async (image) => {
        const data = new FormData();

        data.append('file', image);

        data.append('upload_preset', 'default');

        const res = await Axios.post(process.env.REACT_APP_CLOUDINARY_API_BASE_URL, data);

        setImageUrl(res.data.secure_url);

        setDeleteToken(res.data.delete_token);
    };

    const deleteImage = async () => {
        
        const data = `token=${deleteToken}`;

        const res = await Axios.post('https://api.cloudinary.com/v1_1/nomnomapp/delete_by_token', data);

        console.log(res);

        setImageUrl('');

        setDeleteToken('');
    };

    const handleInput = (image) => {
        uploadImage(image);
    };

    const handleDelete = () => {
        deleteImage()
    };

    const Wrapper = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
    `

    return (
        <Wrapper>
            {!imageUrl && <SelectorButton onChange={handleInput} />}
            {imageUrl && <PreviewCard imageUrl={imageUrl} handleDelete={handleDelete} />}
        </Wrapper>
    );
}