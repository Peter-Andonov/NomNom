import React from 'react';
import Axios from 'axios';
import styled from 'styled-components';
import SelectorButton from './SelectorButton';
import PreviewCard from './PreviewCard';


const Wrapper = styled.div`
    width: 60%;
    display: flex;
    flex-direction: column;
    align-items: center;
`;


const ImageUploader = (props) => {

    const uploadImage = async (image) => {
        const data = new FormData();

        data.append('file', image);

        data.append('upload_preset', 'default');

        const res = await Axios.post(process.env.REACT_APP_CLOUDINARY_API_BASE_URL, data);

        props.setImageUrl(res.data.secure_url);

        props.setDeleteToken(res.data.delete_token);
    };

    const deleteImage = async () => {
        
        const data = `token=${props.deleteToken}`;

        await Axios.post('https://api.cloudinary.com/v1_1/nomnomapp/delete_by_token', data);

        props.setImageUrl('');

        props.setDeleteToken('');
    };

    const handleInput = (image) => {
        uploadImage(image);
    };

    const handleDelete = () => {
        deleteImage()
    };

    return (
        <Wrapper>
            {!props.imageUrl && <SelectorButton onChange={handleInput} />}
            {props.imageUrl && <PreviewCard imageUrl={props.imageUrl} handleDelete={handleDelete} />}
        </Wrapper>
    );
}

export default ImageUploader;