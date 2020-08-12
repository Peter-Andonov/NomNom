import React from 'react';
import styled from 'styled-components';

const Layout = styled.div`
    display: flex;
    flex-direction: column;
    align-items: center;
`;

const PageLayout = (props) => {
    return(
        <Layout>
            {props.children}
        </Layout>
    );
};

export default PageLayout;