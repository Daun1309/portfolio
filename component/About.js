import React from 'react';
import styles from '@/styles/about.module.scss'
import Image from 'next/image';
import RotateCanvas from './RotateCanvas';

const About = () => {
  return (
    <>
        <div className={styles.lineDrawing}></div>

        <section className={styles.about} id='about'>

            <div className={styles.sticky}>
                <h2>
                    ABOUT /<br/>
                    SKILL
                </h2>
                <a href={"/img/a.png"} download>
                    <Image src="/img/resume.png" alt='' width={37} height={37}/>
                    이력서 다운로드
                </a>
                <p className={styles.qrT}>카카오톡 1:1 오픈채팅</p>
                <Image className={styles.qr} src="/img/qr.png" alt='' width={120} height={120}/>
            </div>

            <div className={styles.doIt}>
                <b> JUST DO IT. </b>
                <p className={styles.doT}>
                    나이키의 슬로건 Just Do It 은 제가 가장 좋아하는 말 입니다.
                    이 말처럼 새로운 기술과 시도를 두려워하지 않고
                    도전하며 끊임없이 성장하는 프론트엔드 개발자가 되겠습니다.
                </p>
                <p>Education</p>
                <p>22.11 - 23.04 그림컴퓨터아카데미(감남) 프론트엔드 웹&앱 SW개발자 양성과정</p>
                <p>22.03 - 22.06 스파르타코딩클럽 항해99 6기</p>
            </div>

            <div className={styles.M}>
                <Image src="/img/drawing4.svg" alt='' width={500} height={500}/>
                <Image src="/img/drawing5.svg" alt='' width={500} height={500}/>
                <Image src="/img/drawing6.svg" alt='' width={500} height={500}/>
            </div>
        </section>
        
        <div className={styles.canvasContainer}>
            <RotateCanvas/>
            <Image className={styles.water} src="/img/water.png" alt='' width={1920} height={1220}/>
            <div className={styles.tool}>
                <b>Programming Languages</b>
                <p>
                    HTML  JS   React   Next  CSS     SASS    Styled Components
                </p>
                <b>Tool</b>
                <p>
                    Github    Notion    Slack    VScode
                </p>
                <b>Design</b>
                <p>
                    illustrator   Photoshop    Figma
                </p>
            </div>
        </div>
    </>
  )
}

export default About

