import styles from '@/styles/main.module.scss'
import Main from '../component/Main'
import About from '../component/About'
import Test from '../component/Test'
import Works from '../component/Works'
import Guest from '../component/Message'
import Header from '../component/Header'
import { useEffect, useRef, useState } from 'react'

export default function Home() {

  return (
    <>
      <Header/>
      <Main/>
      <About/>
      <Works/>
      <Guest/>
    </>
  )
}
