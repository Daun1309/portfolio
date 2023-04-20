import axios from 'axios';
import React, { createContext, useEffect, useState } from 'react';
export const DbContext = createContext(null);

const Context = ({ children }) => {

    const [data, setData] = useState([]);
    const [message, setMessage] = useState([]);


    async function dataFun(type) {
        let trans;
        if (type == 'get') {
            await axios.get('/api').then(res => trans = res.data)
        }
        setData(trans);
    }

    async function messageFun(type, obj) {
        let trans;
        if (type == 'get') {
            await axios.get('/api/message').then(res => trans = res.data)
        } else if (type == 'post') {
            await axios.post('/api/message', obj)
            return messageFun('get');
        }
        setMessage(trans);
    }

    useEffect(() => {
        dataFun('get');
        messageFun('get');
    }, [])

    return (
        <DbContext.Provider value={{ data, dataFun , message, messageFun}}>
            {children}
        </DbContext.Provider>
    )
}

export default Context