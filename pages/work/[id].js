import axios from 'axios';
import React from 'react';
import Image from 'next/image';
import styles from '@/styles/work.module.scss'
import Link from 'next/link';

const Work = ({data}) => {

  console.log(data)
  return (
    
    <div>
      <section className={styles.detail}>
        <Image className={styles.bannerImg} src={data[0].banner} alt='' width={1920} height={869}/>  
        <Link className={styles.github} href={data[0].github} target="_blank" >
          github <Image src="/img/work/arrowW.svg" alt='' width={27} height={27}/>  
        </Link>
      </section>

      <section  className={styles.detailT}>
        <h2 className={styles.title}>{data[0].title}</h2>
        <p className={styles.introduction}>{data[0].introduction}</p>
        <div className={styles.iconBoxes}>
          {
            data && data[0].icon.map((icon,key) => (
              <img key={key} src={icon} alt=''/>
            ))
          }
        </div>
      </section>

      <section className={styles.details}>
          {
            data[0].video &&
            <video autoPlay controls loop muted src={data[0].video}/>
          }

          <div className={styles.borderTop}></div>

          <div className={styles.details01}>
            {
              data &&
              data[0].dataD[0].number.map((n, key) => (
                <div className={styles.details02} key={key}>
                  <b>{n}</b>
                  <p  className={styles.detailsP}>{data[0].dataD[1].subheading[key]}</p>
                  <p className={styles.detailsT}>{data[0].dataD[2].detail[key]}</p>
                </div>
              ))
            }
          </div>

          <div className={styles.borderTop}></div>

          <div className={styles.next}>
            <Link href={data[0].before}>
              <Image src="/img/work/nextBtn.png" alt='' width={15} height={27}/>  
              <p>이전 프로젝트보기</p>
            </Link>
            <Link className={styles.nextBtn} href={data[0].next}>
              <p>다음 프로젝트보기</p>
              <Image src="/img/work/nextBtn.png" alt='' width={15} height={27}/>  
            </Link>
          </div>
      </section>

    </div>
  )
}

export default Work



export async function getServerSideProps({ params }) {
console.log(params.id)
    // const res = await axios.get(`http://localhost:3000/api/url/${params.id}`);
    const res = await axios.get(`https://portfolio-a5gc5jtws-daun1309.vercel.app//api/url/${params.id}`);
    const data = res.data;
  
    return {
      props: {
        data
      }
    };
  }
  