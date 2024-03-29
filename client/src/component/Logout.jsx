import axios from "axios";
import {useEffect} from "react";
import { useNavigate } from "react-router-dom";

export default function Logout() {
    const navigate = useNavigate()
    useEffect(() =>{
        axios.get('http://localhost:3001/logout')
        .then(res => {
            if(res.data.logout){
                navigate('/');
            }
        }).catch(err => console.log(err));
    })
}