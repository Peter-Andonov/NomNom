import React from 'react'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestSetup from '../../Utils/TestUtils/test-utils';


import Dropdown from './ProfileNav.js';

describe('Dropdown component', () => {
    it("renders user options - favourites, profile, logout", () => {
        const { asFragment } = render(
            <TestSetup value={{
                loggedIn: true,
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
                <Dropdown />
            </TestSetup>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders admin options - profile, logout", () => {
        const { asFragment } = render(
            <TestSetup value={{
                loggedIn: false,
                user: {
                    _id: '1234',
                    email: "john.doe@gmail.com",
                    role: 'admin',
                    firstName: undefined,
                    lastName: undefined,
                    profilePicUrl: '',
                    favouriteRecipes: []
                }
            }}>
                <Dropdown />
            </TestSetup>);
        expect(asFragment()).toMatchSnapshot();
    });
});