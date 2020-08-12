import React from 'react';
import PageLayout from '../PageLayout';
import BannerImage from '../../Components/BannerImage';
import Header from '../../Components/Header';
import ProfileEditor from '../../Components/ProfileEditor';
import Footer from '../../Components/Footer';


const ProfilePage = () => {

    return (
        <PageLayout>
            <BannerImage />
            <ProfileEditor />
            <Header />
            <Footer />
        </PageLayout>
    );
};


export default ProfilePage;