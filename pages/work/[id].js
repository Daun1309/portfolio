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

          <video autoPlay controls loop muted src={data[0].video}/>

          <div className={styles.details01}>

            {
              data &&
              data[0].dataD[0].number.map((n, key) => (
                <div className={styles.details02} key={key}>
                  <b>{n}</b>
                  {data[0].dataD[1].subheading.map((s, subKey) => (
                    <p key={subKey} className={styles.detailsP}>{s}</p>
                  ))}
                  <p className={styles.detailsT}>
                    전체 게시글을 조회할 때 고화질의 이미지가 많이 사용되다보니 속도가 저하되는 문제가 발생하였습니다. 
                    이 문제를 해결하기 위해 이미지를 리사이징하고 레이지 로딩을 적용시켜 속도 저하문제를 해결하였습니다.
                  </p>
                </div>
              ))
            }
            
          </div>
      </section>

    </div>
  )
}

export default Work








// export async function getStaticPaths() {
//   // const res = await axios.get('http://localhost:3000/api');
//   // const data = res.data.map((obj) => ({ params: { id: obj.id.toString() } }));
//   // console.log(data)
//   return {
//     paths: [{params:{ id: '1' }},{params:{ id: '2' }}],
//     fallback: false,
//   };
// }

export async function getServerSideProps({ params }) {
console.log(params.id)
    const res = await axios.get(`http://localhost:3000/api/url/${params.id}`);
    const data = res.data;
  
    return {
      props: {
        data
      }
    };
  }
  