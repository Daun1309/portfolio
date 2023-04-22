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
  const [editingId, setEditingId] = useState(null);
  const [password, setPassword] = useState("");
  const [showModal, setShowModal] = useState(false);

  function passwordCheck() {
    setShowModal(true);
  }

  function closeModal() {
    setShowModal(false);
  }

  // function confirmPassword() {
  //   if (password === inputValue.password) {
  //     setShowModal(false);
  //   } else {
  //     alert("비밀번호가 틀렸습니다.");
  //   }
  // }

  const valueChange = (e) => {
    let t = e.target;
    setValue((obj) => {
      return {...obj, [t.name] : t.value}
    })
  }
  const create = (e) => {
    e.preventDefault();
    axios.post("/api/message", {...inputValue, id:Date.now().toString(), date:returnDate })
    setValue(initial);
    messageGet();
  } 


  function messageEdit(id){
    const m =  message.find(obj => obj.id === id);
    setValue(m);
    setEditingId(id);
    passwordCheck();
  }
  
  function edit(e){
    e.preventDefault();
    axios.put("api/message",{ ...inputValue, id: editingId});
    setEditingId(null);
    setValue(initial);
    messageGet();
  }

  function messageDelete(id){
    axios.delete("api/message",{data : id});
    messageGet();
    passwordCheck();
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
              onChange={valueChange} 
              value={inputValue.name}
              type='text' 
              placeholder='닉네임' 
              name='name'
              required
            />
            <input 
              className={styles.inputPassword}
              onChange={valueChange} 
              value={inputValue.password} 
              type='password' 
              placeholder='비밀번호' 
              name='password'
              required
            />
          </div>
          <input 
            className={styles.inputText}
            onChange={valueChange} 
            value={inputValue.text} 
            type='text' 
            placeholder='내용을 입력해주세요 :)'
            name='text'
            required
           />
          <input 
            className={styles.inputSubmit} 
            type='submit'
            value=""
          >
            {/* <span></span> */}
            </input>
        </form>

        {/* {
          showModal && (
          <div className={styles.modal}>
            <div className={styles.modalContent}>
              <span className={styles.close} onClick={closeModal}>
                &times;
              </span>
              <h2>비밀번호 확인</h2>
              <input
                className={styles.modalInput}
                type="password"
                placeholder="비밀번호를 입력하세요"
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={confirmPassword}>확인</button>
            </div>
          </div>
        )
        } */}

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
                    <button onClick={()=> {messageEdit(obj.id); passwordCheck()}}>수정</button>
                    <button onClick={()=> {messageDelete(obj.id); passwordCheck()}}>삭제</button>
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