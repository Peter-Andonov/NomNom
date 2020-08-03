import React from 'react';
import PageLayout from '../PageLayout';
import HeaderImage from '../../Components/HeaderImage';
import UserHeader from '../../Components/UserHeader';
import ProfileEditor from '../../Components/ProfileEditor';


const ProfilePage = () => {

    return (
        <PageLayout>
            <HeaderImage />
            <ProfileEditor />
            <UserHeader />
        </PageLayout>
    );
};


export default ProfilePage;