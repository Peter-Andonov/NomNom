import React from 'react'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestSetup from '../../Utils/TestUtils/test-utils';


import Header from './index';

jest.mock('./ProfileNav.js', () => 'ProfileNav');

describe('Header component', () => {
    it("renders guest navigation", () => {
        const { asFragment } = render(
            <TestSetup value={{
                loggedIn: false,
                user: null
            }}>
                <Header />
            </TestSetup>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders user navigation", () => {
        const { asFragment } = render(
            <TestSetup value={{
                loggedIn: true,
                user: {
                    _id: '1234',
                    email: "john.doe@gmail.com",
                    role: 'user',
                    firstName: undefined,
                    lastName: undefined,
                    profilePicUrl: '',
                    favouriteRecipes: []
                }}}>
                <Header />
            </TestSetup>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders admin navigation", () => {
        const { asFragment } = render(
            <TestSetup value={{
                loggedIn: true,
                user: {
                    _id: '1234',
                    email: "john.doe@gmail.com",
                    role: 'admin',
                    firstName: undefined,
                    lastName: undefined,
                    profilePicUrl: '',
                    favouriteRecipes: []
                }}}>
                <Header />
            </TestSetup>);
        expect(asFragment()).toMatchSnapshot();
    });
});