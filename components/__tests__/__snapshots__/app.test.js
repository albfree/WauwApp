import React from 'react';
import {render} from 'react-native-testing-library';
import App from '../../../App';

describe('<App />', () => {
    it('testing the whole app with a snapshot', () => {
        const result = render(<App />).toJSON();
        expect(result).toMatchSnapshot();
    });
});