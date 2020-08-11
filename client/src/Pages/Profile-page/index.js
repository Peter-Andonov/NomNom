import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import ProfileEditor from '../../Components/ProfileEditor';


const ProfilePage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <ProfileEditor />
            <Header />
        </PageLayout>
    );
};


export default ProfilePage;