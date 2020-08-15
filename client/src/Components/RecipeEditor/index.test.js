import React from 'react'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect';
import TestSetup from '../../Utils/TestUtils/test-utils';


import RecipeEditor from './index';

jest.mock('./IngredientsTable.js', () => () => <div />);
jest.mock('../TextEditor/index.js', () => () => <div />);

describe('RecipeEditor component', () => {
    it("renders correctly", () => {
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
                }
            }}>
                <RecipeEditor />
            </TestSetup>);
        expect(asFragment()).toMatchSnapshot();
    });
});