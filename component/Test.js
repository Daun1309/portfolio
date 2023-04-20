import React, { useRef, useEffect } from 'react';
import styles from '@/styles/main.module.scss';

const Test = () => {
  const containerRef = useRef(null);
  const layerRef1 = useRef(null);
  const layerRef2 = useRef(null);
  const layerRef3 = useRef(null);
  const layerRef4 = useRef(null);

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
    layerRef1.current.style.transform = `translate(${X / 80}px, ${Y / 80}px)`;
    layerRef2.current.style.transform = `translate(${Y / 100}px, ${X / 100}px)`;
    layerRef3.current.style.transform = `translate(${X / 50}px, ${Y / 50}px)`;
    layerRef4.current.style.transform = `translate(${Y / 100}px, ${X / 100}px)`;

  };

  return (
    <div ref={containerRef} className={styles.container}>
      {/* <div className={`${styles.layer1} ${styles.layer}`} /> */}
      <div ref={layerRef1} className={styles.layer1}></div>
      <div ref={layerRef2} className={styles.layer2}></div>
      <div ref={layerRef3} className={styles.layer3}></div>
      <div ref={layerRef4} className={styles.layer4}></div>
    </div>
  );
};

export default Test;



// .container{
//   width: 100vw;
//   height: 100vh;
//   overflow: hidden;
//   background-color: azure;
//   position: relative;
// }

// .layer1{
//   position: absolute;
//   top: 0;
//   left: 0;
//   width: 20%;
//   height: 100%;
//   background-image: url("/img/d.svg");
//   background-repeat: no-repeat;
// }

// .layer2{
//   position: absolute;
//   top: 0;
//   left: 20%;
//   width: 20%;
//   height: 100%;
//   background-image: url("/img/a.svg");
//   background-repeat: no-repeat;
// }

// .layer3{
//   position: absolute;
//   top: 0;
//   left: 40%;
//   width: 20%;
//   height: 100%;
//   background-image: url("/img/u.svg");
//   background-repeat: no-repeat;
// }

// .layer4{
//   position: absolute;
//   top: 0;
//   left: 60%;
//   width: 20%;
//   height: 100%;
//   background-image: url("/img/n.svg");
//   background-repeat: no-repeat;
// }