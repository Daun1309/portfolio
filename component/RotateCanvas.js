import React, { useEffect, useRef } from 'react';
import { Engine, Render, Runner, Mouse, MouseConstraint, Composite, Bodies, Events } from 'matter-js';
import styles from '@/styles/about.module.scss'

const RotateCanvas = () => {
    const canvasRef = useRef(null);
    //const react = `<img src="/img/work/react.png"/>`

    useEffect(() => {
        const canvas = canvasRef.current
        const cw = 600
        const ch = 600

        const gravityPower = 0.5
        let gravityDeg = 0

        let engine, render, runner, mouse, mouseConstraint

        initScene()
        initMouse()
        initGround()
        initImageBoxes()

        Events.on(runner, 'tick', () => {
            gravityDeg += 1
            engine.world.gravity.x = gravityPower * Math.cos(Math.PI / 180 * gravityDeg)
            engine.world.gravity.y = gravityPower * Math.sin(Math.PI / 180 * gravityDeg)
        })

        // canvas.addEventListener("mousewheel", () => {
        //     addRect(mouse.position.x, mouse.position.y, 50, 50)
        // })

        function initScene(){
            engine = Engine.create()
            render = Render.create({
                canvas: canvas,
                engine: engine,
                options: { width: cw, height:ch, wireframes: false, background:'#fff'}
            })
            runner = Runner.create()

            Render.run(render)
            Runner.run(runner, engine)
        }

        function initMouse(){
            mouse = Mouse.create(canvas)
            mouseConstraint = MouseConstraint.create(engine, {
                mouse: mouse
            })
            Composite.add(engine.world, mouseConstraint)
        }

        function initGround(){
            // const ground = Bodies.rectangle(cw/2, ch, cw, 50, { isStatic: true})
            // Composite.add(engine.world, ground)
            const segments = 60
            const deg = (Math.PI * 2) / segments
            const width = 50
            const radius = cw / 2 + width / 2
            const height = radius * Math.tan(deg / 2) * 2

            for (let i = 0; i < segments; i++){
                const theta = deg * i
                const x = radius * Math.cos(theta) + cw / 2
                const y = radius * Math.sin(theta) + ch / 2
                addRect(x, y, width, height, {isStatic:true, angle: theta})
            }
        }

        function initImageBoxes(){
            // addRect(cw / 2, ch / 2, 100*0.5, 100*0.5, {render:{sprite:{texture:"/img/work/react.png", xScale:0.5, yScale:0.5}}})
             // addRect(cw / 2 - 100 * 0.5, ch /  2 - 100 * 0.5, 100*0.5, 100*0.5, {render:{sprite:{texture:"/img/work/react.png", xScale:0.5, yScale:0.5}}})
            addRect(cw / 2, ch / 2, 170, 80, {render:{sprite:{texture:"/img/nn.png", xScale:0.5, yScale:0.5 }}})
            addRect(cw / 2, ch / 2, 93, 93, {render:{sprite:{texture:"/img/rrr.png", xScale:0.5, yScale:0.5 }}})
            addRect(cw / 2, ch / 2, 93, 93, {render:{sprite:{texture:"/img/ss.png", xScale:0.5, yScale:0.5 }}})
            addRect(cw / 2, ch / 2, 163, 83, {render:{sprite:{texture:"/img/mm.png", xScale:0.5, yScale:0.5 }}})
            addRect(cw / 2, ch / 2, 173, 83, {render:{sprite:{texture:"/img/rr.png", xScale:0.5, yScale:0.5 }}})
            addRect(cw / 2, ch / 2, 93, 123, {render:{sprite:{texture:"/img/jj.png", xScale:0.5, yScale:0.5 }}})
            addRect(cw / 2, ch / 2, 93, 123, {render:{sprite:{texture:"/img/hh.png", xScale:0.5, yScale:0.5 }}})
            addRect(cw / 2, ch / 2, 100, 100, {render:{sprite:{texture:"/img/gg.png", xScale:0.5, yScale:0.5 }}})

        }

        function addRect(x, y, w, h, options = {}){
            const rect = Bodies.rectangle(x, y, w, h, options)
            Composite.add(engine.world, rect)
        }
    }, [])


    return (
        <div className={styles.rotateCanvasWrapper}>
            <canvas ref={canvasRef}></canvas>
        </div>
    )
}

export default RotateCanvas