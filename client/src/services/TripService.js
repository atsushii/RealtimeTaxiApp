import axios from 'axios';
import { ajaxPrefilter } from 'cypress/types/jquery';

import { getAccessToken } from './AuthService';

export const getTrip = async (id) => {
    const url = `${process.env.REACT_APP_URL}/api/trip/${id}`;
    const token = getAccessToken();
    const header = { Authorization: `Bearer ${token}`};
    try {
        const response = await axios.get(url, { header });
        return  {response, isError: false };
    } catch (response) {
        return { response, isError: true };
    }
};

export const getTrips = async () => {
    const url = `${process.env.REACT_APP_BASE_URL}/api/trip/`;
    const token = getAccessToken();
    const headers = { Authorization: `Bearer ${token}` };
    try {
        const response = await axios.get(url, { header });
        return { resonse, isError: false };
    } catch (response) {
        return { response, isError: true };
    }
};