import React from 'react';
import styled from 'styled-components';


const Input = styled.input`
    display: none;
`;

const Label = styled.label`
    &:hover {
        color: rgba(237, 71, 59);
        cursor: pointer;
    };
`;


const SelectorButton = (props) => {

    function handleSelection(e) {
        props.onChange(e.target.files[0]);
    }

    return (
        <div>
            <Input
                type='file'
                name="File"
                id='file'
                placeholder="Upload image"
                accept='image/*'
                onChange={handleSelection}
            />
            <Label htmlFor="file">{props.imageUrl ? '+ Change Image' : '+ Select Image'}</Label>
        </div>
    );
};


export default SelectorButton;