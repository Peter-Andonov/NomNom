import React from 'react';
import styled from 'styled-components';
import Pagination from '../../Components/Pagination';


const Wrapper = styled.div`
    min-width: 40rem;
    background-color: rgb(242, 243, 247);
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const ContainerTitle = styled.h4`
    text-align: center;
    width: 100%;
`;

const ContentContainer = styled.div`
    min-height: 30rem;
    width: 100%;
    display: flex;
    flex-direction: column;
    align-items: left;
`;

const DashboardContainer = (props) => {
    return (
        <Wrapper>
            <ContainerTitle>{props.title}</ContainerTitle>
            <ContentContainer>
                {props.children}
            </ContentContainer>
            {props.totalCount > props.perPage ?
                <Pagination
                    currentPage={props.currentPage}
                    totalPages={props.totalPages}
                    changePage={props.changePage}
                /> : ''}
        </Wrapper>
    );
};


export default DashboardContainer;