import React, { useContext, useEffect, useState } from 'react'
import { DbContext } from './Context';
import Image from 'next/image';
import styles from '@/styles/work.module.scss'
import Link from 'next/link';

const Work = () => {

  const { data, dataFun } = useContext(DbContext);

  function dataget() {
    dataFun('get')
  }

  useEffect(dataget,[])

  return (
    <section id='work' className={styles.work}>
      <h2>WORK</h2>
      <div className={styles.container}>
      {
        data && data.map((obj) => ( 
          <Link href={`/work/${obj.id}`} key={obj.title} className={styles.box}>
            <div className={styles.imgBox}>
              <Image src={obj.thumbnail} alt='' width={490} height={310}/>
            </div>
            <p>{obj.category}</p>
            <b>{obj.title}</b>
          </Link>
        ))
      }
      </div>
    </section>
  )
}

export default Work
