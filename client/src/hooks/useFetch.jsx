import axios from 'axios';
import React, { useEffect, useState } from 'react'
import { toast } from 'react-toastify';

const useFetch = (url) => {
    const [data, setData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchData = async () => {
            try {
                const response = await fetch(url);
                const data = await response.json();
                setData(data);
                setLoading(false);
            } catch (err) {
                setError(err);
                console.log(err);
            }
        };
                // const response = await fetch(url)
                // .then(response => response.json())
                // .then(data => {
                //     setData(data);
                //     setLoading(false);
                // })
                // .catch(err => {
                // setError(err);
                // console.log(err);
                // });
        // }
        fetchData();
    },[url]);

    return [ data, loading, error ];
}

export default useFetch