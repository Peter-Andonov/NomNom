import React from 'react';
import styled from 'styled-components';


const List = styled.ul`
    margin: 0;
    padding: 0;
    list-style-type: none;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: center;
`;

const PageLink = styled.li`
    margin-left: 0.5rem;
    margin-right: 0.5rem;
    &:hover {
        cursor: pointer;
    }
    ${(props) => props.isActive && `
    color: rgba(237, 71, 59);
  `}
`;

const Pagination = (props) => {

    const pageLinks = [];

    for (let i = 1; i <= props.totalPages; i++) {
        let isActive = props.currentPage === i;
        pageLinks.push(
            <PageLink
                isActive={isActive}
                key={i}
                onClick={() => props.changePage(i)} >{i}</PageLink>)
    }

    return (
        <List>
            <PageLink onClick={() => props.changePage(props.currentPage - 1)} >Prev</PageLink>
            {pageLinks}
            <PageLink onClick={() => props.changePage(props.currentPage + 1)} >Next</PageLink>
        </List>
    )
};


export default Pagination;