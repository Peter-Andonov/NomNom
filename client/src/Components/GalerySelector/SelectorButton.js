import React from 'react';
import styled from 'styled-components';


const Input = styled.input`
    display: none;
`;


const SelectorButton = (props) => {

    const handleSelection = (e) => {
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
            <label htmlFor="file"> + Select Image</label>
        </div>
    );
};


export default SelectorButton;