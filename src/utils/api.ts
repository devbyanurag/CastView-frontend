import axios from 'axios';
import { baseURL } from './variables';

const token = 'your-token-here'; // Replace with your actual token

export const apiInstanceWithAuth = axios.create({
    baseURL: baseURL,
    headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
    },
    timeout: 10000,
});

export const apiInstance = axios.create({
    baseURL: baseURL,
});

