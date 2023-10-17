import axios from "axios";
import * as dotenv from 'dotenv';
dotenv.config();


const httpClient = axios.create({
  baseURL: process.env.SERVER_URL,
  headers: {
    "Content-Type": "application/json",
    "Accept": "application/json",
  },
});

export default httpClient;