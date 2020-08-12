import React from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import * as utils from '../../Utils/user';
import styled from 'styled-components';
import editIcon from '../../Images/Icons/edit-24px.svg';
import deleteIcon from '../../Images/Icons/delete-24px.svg';


const Wrapper = styled.div`
    margin: 1rem;
    display: flex;
    flex-direction: row;
    align-items: center;
    justify-content: space-between;
`;

const Image = styled.img`
    margin: 0.5rem;
    &:hover {
        cursor: pointer;
    }
`;


const ListItem = (props) => {

    const history = useHistory();

    const handleEdit = () => {
        history.push(`/edit/${props.entityType}/${props.id}`)
    };

    const handleDelete = () => {
        const authToken = utils.getCookieByName('auth-token');

        Axios(`http://localhost:5000/api/${props.entityType}`, {
            method: 'DELETE',
            headers: {
                'content-type': 'application/json',
                'Authorization': authToken
            }, params: {
                id: props.id
            }
        }).then((res) => {
            const newState = props.entities.filter((entity) => {
                return props.id !== entity._id;
            });
            props.stateUpdate(newState);
        }).catch((err) => {
            console.log(err)
        });
    };

    return (
        <Wrapper>
            <div>{props.title}</div>
            <div>
                <Image src={editIcon} onClick={handleEdit} />
                <Image src={deleteIcon} onClick={handleDelete} />
            </div>
        </Wrapper>
    );
};


export default ListItem;