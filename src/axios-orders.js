import axios from 'axios';

const instance = axios.create ({
    baseURL: 'https://burger-builder-10ddd.firebaseio.com/'
});

export default instance;