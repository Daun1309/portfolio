import React, { useContext, useRef, useState, useEffect } from 'react';
import styles from '@/styles/message.module.scss'
import axios from 'axios';
import { DbContext } from './Context';


const Message = () => {

  const { message, messageFun } = useContext(DbContext);

  const sortMessage = message.sort((prev, cur) => {
    if(prev.id < cur.id) return 1;
    if(prev.id > cur.id) return -1;
  });

  const sampleTimestamp = Date.now();
  const date = new Date(sampleTimestamp); 
  const year = date.getFullYear().toString().slice(-2);
  const month = ("0" + (date.getMonth() + 1)).slice(-2);
  const day = ("0" + date.getDate()).slice(-2);
  const hour = ("0" + date.getHours()).slice(-2);
  const minute = ("0" + date.getMinutes()).slice(-2); 
  const returnDate = year + "-" + month + "-" + day + " " + hour + ":" + minute;

  const initial = {id:"", name:"", password:"", text:""}
  const [inputValue, setValue] = useState(initial);
  const [editingId, setEditingId] = useState(null)
  const elInputT = useRef();
  const elInputN = useRef();
  const elInputP = useRef();

  const valueChange = (e) => {
    let t = e.target;
    setValue((obj) => {
      return {...obj, [t.name] : t.value}
    })
  }
  const create = (e) => {
    e.preventDefault();
    axios.post("/api/message", {...inputValue, id:Date.now().toString(), date:returnDate })
    elInputN.current.value = "";
    elInputP.current.value = "";
    elInputT.current.value = "";
    messageGet();
  } 

  function messageEdit(id){
    const m =  message.find(obj => obj.id === id);
    setValue(m)
    setEditingId(id)
  }
  
  function edit(e){
    e.preventDefault();
    axios.put("api/message",{ ...inputValue, id: editingId});
    setEditingId(null);
    elInputN.current.value = "";
    elInputP.current.value = "";
    elInputT.current.value = "";
    messageGet();
  }

  function messageDelete(id){
    axios.delete("api/message",{data : id});
    messageGet();
  }

  function messageGet() {
    messageFun('get')
  }

  useEffect(messageGet,[])


  return (
    <section id='message' className={styles.guest}>

        <div className={styles.line}></div>

        <h2>MESSAGE</h2>

        <form onSubmit={editingId !== null ? edit : create} className={styles.form}>
          <div className={styles.inputContainer}>
            <input 
              className={styles.inputName}
              ref={elInputN} 
              onChange={valueChange} 
              value={inputValue.name}
              type='text' 
              placeholder='닉네임' 
              name='name'
            />
            <input 
              className={styles.inputPassword}
              ref={elInputP} 
              onChange={valueChange} 
              value={inputValue.password} 
              type='password' 
              placeholder='비밀번호' 
              name='password'
            />
          </div>
          <input 
            className={styles.inputText}
            ref={elInputT} 
            onChange={valueChange} 
            value={inputValue.text} 
            type='text' 
            placeholder='내용'
            name='text'
           />
          <input 
            className={styles.inputSubmit} 
            type='submit'
          />
        </form>

        <div className={styles.messageContainer}>
          {
             sortMessage &&  sortMessage.map((obj) => ( 
              <div key={obj.id} className={styles.messageBox}>
                <div className={styles.MBox}>
                  <div className={styles.ND}>
                    <b>{obj.name}</b>
                    <p>{obj.date}</p>
                  </div>
                  <div className={styles.B}>
                    <button onClick={()=> messageEdit(obj.id)}>수정</button>
                    <button onClick={()=> messageDelete(obj.id)}>삭제</button>
                  </div>
                </div>
                <p className={styles.messageText}>{obj.text}</p>
              </div>
            ))
          }
        </div>
    </section>
  )
}

export default Message