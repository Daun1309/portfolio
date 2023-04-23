import React, { useRef, useEffect, useState } from 'react';
import styles from '@/styles/main.module.scss'
import Image from 'next/image';
import Link from 'next/link';

const Main = () => {

  const containerRef = useRef(null);
  const layerRef1 = useRef(null);
  const layerRef2 = useRef(null);
  const layerRef3 = useRef(null);
  const layerRef4 = useRef(null);
  const [isCopied, setIsCopied] = useState(false);

  const copyToClipboard = (text) => {
    navigator.clipboard.writeText(text);
    setIsCopied(true);
    setTimeout(() => setIsCopied(false), 1000);
  }

  useEffect(() => {
    const container = containerRef.current;
    if (container) {
      container.addEventListener('mousemove', handleMouseMove);
    }
    return () => {
      if (container) {
        container.removeEventListener('mousemove', handleMouseMove);
      }
    };
  }, []);

  const handleMouseMove = (e) => {
    let X = e.pageX;
    let Y = e.pageY;
    layerRef1.current.style.transform = `translate(${X / 40}px, ${Y / 40}px)`;
    layerRef2.current.style.transform = `translate(${Y / 70}px, ${X / 70}px)`;
    layerRef3.current.style.transform = `translate(${X / 30}px, ${Y / 30}px)`;
    layerRef4.current.style.transform = `translate(${Y / 60}px, ${X / 60}px)`;

  };

  return (
    <section className={styles.main} id='main'>

        <div ref={containerRef} className={styles.mainBg}>
            <Image ref={layerRef1} className={styles.d} src="/img/d.svg" alt='' width={385} height={365}/>
            <Image ref={layerRef2} className={styles.a} src="/img/a.svg" alt='' width={445} height={415}/>
            <Image ref={layerRef3} className={styles.u} src="/img/u.svg" alt='' width={302} height={312}/>
            <Image ref={layerRef4} className={styles.n} src="/img/n.svg" alt='' width={285} height={280}/>
        </div>

        <div className={styles.text}>
            <h1>DAUN PORTFOLIO</h1>
            <p className={styles.glass}>Frontend Developer</p>
        </div>

        <div className={styles.contactBox}>
          <Link href={"https://github.com/Daun1309"} target="_blank">
            <div className={styles.contact1}>
              <Image src="/img/github.png" alt='' width={25} height={25}/>
              <p>github</p>
              <Image src="/img/arrow.png" alt='' width={16} height={16}/>
            </div>
          </Link>
          <Link href={"https://velog.io/@daun"} target="_blank">
            <div className={styles.contact2}>
              <Image src="/img/velog.png" alt='' width={25} height={25}/>
              <p>velog</p>
              <Image src="/img/arrow.png" alt='' width={16} height={16}/>
            </div>
          </Link>
          <div className={styles.contact3}>
            <Image src="/img/email.png" alt='' width={25} height={25} />
            <p onClick={() => copyToClipboard('daun1309@gmail.com')}>
              {isCopied ? 'copied ! ' : 'daun1309@gmail.com'}
            </p>
            <Image src="/img/arrow.png" alt='' width={16} height={16} />
          </div>
        </div>
    </section>
  )
}

export default Main