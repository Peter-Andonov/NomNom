import React from 'react';
import styled from 'styled-components';
import GreenButton from '../RecipeDetails/GreenButton';


const Wrapper = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const Container = styled.div`
    display: flex;
    flex-direction: row;
    align-items: center;
`;

const SearchInput = styled.input`
    font-size: 1.5rem;
    width: 60%;
    padding: 0.5rem;
    border-radius: 5px;
    border: 2px solid black;
`;

const Search = (props) => {

    const handleInput = (e) => {
        props.onChange(e.target.value)
    };

    const handleEnter = (e) => {
        if (e.key === 'Enter') {
            props.onSearch()
        };
    };

    return (
        <Wrapper>
            <Container>
                <SearchInput
                    type='text'
                    value={props.value}
                    onChange={handleInput}
                    onKeyDown={handleEnter}
                />
                <GreenButton
                    label={'Search'}
                    action={props.onSearch}
                />
            </Container>
        </Wrapper>
    );
};


export default Search;