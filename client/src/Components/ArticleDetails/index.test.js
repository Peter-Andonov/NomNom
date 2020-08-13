import React from 'react'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestSetup from '../../Utils/TestUtils/test-utils';


import ArticleDetails from './index';


describe('ArticleDetails component', () => {
    it("does not render comment section or edit/delete buttons", () => {
        const { asFragment } = render(
            <TestSetup value={{
                loggedIn: false,
                user: null
            }}>
                <ArticleDetails />
            </TestSetup>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders comment section, but not edit/delete buttons", () => {
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
                <ArticleDetails />
            </TestSetup>);
        expect(asFragment()).toMatchSnapshot();
    });

    it("renders comment section and admin edit/delete buttons", () => {
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
                <ArticleDetails />
            </TestSetup>);
        expect(asFragment()).toMatchSnapshot();
    });
});