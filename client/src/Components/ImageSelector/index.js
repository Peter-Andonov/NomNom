import React, { useState } from 'react';
import Axios from 'axios';
import SelectorButton from './SelectorButton';
import PreviewList from './PreviewsList';
import styled from 'styled-components';


export default function ImageUploader() {
    const [previews, setPreviews] = useState([]);
    const [imageUrls, setImageUrls] = useState([]);

    const uploadImages = () => {

        previews.map(async (preview) => {
            const data = new FormData();

            data.append('file', preview);

            data.append('upload_preset', 'default');

            const res = await Axios.post(process.env.REACT_APP_CLOUDINARY_API_BASE_URL, data);

            setImageUrls([...imageUrls, res.data.secure_url])
        })

    }

    function handleInput(newImage) {
        setPreviews([...previews, newImage])
    }

    const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
    `

    return (
        <Wrapper>
            <SelectorButton onChange={handleInput} />
            <PreviewList previews={previews} />
        </Wrapper>
    );
}