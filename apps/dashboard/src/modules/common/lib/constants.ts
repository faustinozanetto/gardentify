/* eslint-disable @typescript-eslint/naming-convention */
export const __PROD__ = process.env.NODE_ENV === 'production';
export const __URL__ = __PROD__ ? 'https://gardentify-dashboard.vercel.app' : 'http://localhost:3000';

export const __API__ = __PROD__ ? 'https://gardentify-api.onrender.com/api' : 'http://localhost:4000/api';
