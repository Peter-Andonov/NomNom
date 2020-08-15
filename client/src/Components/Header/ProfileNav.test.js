import React from 'react'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestSetup from '../../Utils/TestUtils/test-utils';


import ProfileNav from './ProfileNav.js';

describe('ProfileNav component', () => {
    it("renders default avatar picture and email", () => {
        const { asFragment } = render(
            <TestSetup value={{
                loggedIn: false,
                user: {
                    _id: '1234',
                    email: "john.doe@gmail.com",
                    role: 'user',
                    firstName: undefined,
                    lastName: undefined,
                    profilePicUrl: undefined,
                    favouriteRecipes: []
                }
            }}>
                <ProfileNav />
            </TestSetup>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders user uploaded profile picture", () => {
        const { asFragment } = render(
            <TestSetup value={{
                loggedIn: false,
                user: {
                    _id: '1234',
                    email: "john.doe@gmail.com",
                    role: 'user',
                    firstName: undefined,
                    lastName: undefined,
                    profilePicUrl: 'https://i.picsum.photos/id/1005/5760/3840.jpg?hmac=2acSJCOwz9q_dKtDZdSB-OIK1HUcwBeXco_RMMTUgfY',
                    favouriteRecipes: []
                }
            }}>
                <ProfileNav />
            </TestSetup>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders default profile pic and user names instead of email", () => {
        const { asFragment } = render(
            <TestSetup value={{
                loggedIn: false,
                user: {
                    _id: '1234',
                    email: "john.doe@gmail.com",
                    role: undefined,
                    firstName: 'John',
                    lastName: 'Doe',
                    profilePicUrl: undefined,
                    favouriteRecipes: []
                }
            }}>
                <ProfileNav />
            </TestSetup>);
        expect(asFragment()).toMatchSnapshot();
    });
});