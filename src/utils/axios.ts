import axios from 'axios'

let APIkit = axios.create({
    headers: {
        "Content-Type": "application/json; charset=UTF-8",
        "Access-Control-Allow-Origin": "*",
        "Access-Control-Allow-Headers": "X-Requested-With",
      },
    timeout: 10000,
});

export default APIkit