import React from 'react';
import styled from 'styled-components';


const Title = styled.h1`
    margin: 0;
    padding: 0;
    text-align: center;
    color: rgba(237, 71, 59);
    `;

const Description = styled.div`
    padding: 1rem;
`;


const PageInfo = (props) => {

    const { title } = props;

    return (
        <div>
            <Title>{title}</Title>
            <Description>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Curabitur ac accumsan velit. Donec ac leo lectus. Phasellus tincidunt, velit ac congue sollicitudin, erat urna imperdiet odio, nec bibendum eros leo id leo. In eu semper lacus. Duis accumsan elit urna, non hendrerit tortor congue nec. Donec congue lorem non congue ornare. Maecenas id arcu sed sapien laoreet auctor a sed massa. Maecenas congue, nunc sed varius faucibus, purus odio porttitor erat, non bibendum risus sapien quis massa.</Description>
        </div>
    );
};

export default PageInfo;