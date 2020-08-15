import React from 'react'
import { render } from '@testing-library/react';
import '@testing-library/jest-dom/extend-expect'
import Footer from './index';


describe('Footer component', () => {
    it("renders correctly", () => {
        const { asFragment } = render(<Footer />);
        expect(asFragment()).toMatchSnapshot();
    });
});