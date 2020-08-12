import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import Axios from 'axios';
import * as utils from '../../Utils/user';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import UnitEditor from '../../Components/UnitEditor';


const CreateUnitPage = () => {

    const [name, setName] = useState('');
    const [error, setError] = useState(false);
    const [errorMessage, setErrorMessage] = useState('');

    const history = useHistory();

    const saveUnit = async (e) => {

        e.preventDefault();

        const authToken = utils.getCookieByName('auth-token');

        const data = {
            name: name,
        };

        Axios('http://localhost:5000/api/unit', {
            method: 'POST',
            headers: {
                'content-type': 'application/json',
                'Authorization': authToken
            }, data: data
        }).then(() => {
            history.push('/admin');
        }).catch((err) => {
            setError(true);
            setErrorMessage('Something went wrong');
        });
    };

    return (
        <PageLayout>
            <BannerImage />
            <UnitEditor 
                name={name}
                setName={setName}
                error={error}
                setError={setError}
                errorMessage={errorMessage}
                setErrorMessage={setErrorMessage}
                onSubmit={saveUnit}
            />
            <Header />
        </PageLayout>
    );
};


export default CreateUnitPage;