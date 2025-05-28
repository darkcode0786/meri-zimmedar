'use client';

import React, { useEffect, useRef, useCallback, useState } from 'react';
import gsap from 'gsap';
import { Draggable } from 'gsap/Draggable';
import { InertiaPlugin } from 'gsap/InertiaPlugin';

gsap.registerPlugin(Draggable, InertiaPlugin);

const LogoSlider: React.FC = () => {
    const wrapperRef = useRef<HTMLDivElement | null>(null);
    const itemsRef = useRef<HTMLDivElement[]>([]);
    const [carouselData, setCarouselData] = useState<{
        title:string
        src:string
    }[]>([]);
    const [itemHeight, setItemHeight] = useState<number>(0);
    const [windowWidth, setWindowWidth] = useState<number>(typeof window !== 'undefined' ? window.innerWidth : 0);

    const measuredRef = useCallback((node: HTMLDivElement | null) => {
        if (node !== null) {
            setItemHeight(node.getBoundingClientRect().height);
        }
    }, []);

    const addToRefs = useCallback((el: HTMLDivElement | null) => {
        if (el && !itemsRef.current.includes(el)) {
            itemsRef.current.push(el);
        }
    }, []);

    const createAnimation = (carouselItems: HTMLDivElement[], width: number) => {
        return (
            carouselItems.length > 0 &&
            gsap
                .to(carouselItems, {
                    duration: 1,
                    x: `+=${width}`,
                    paused: true,
                    ease: 'linear',
                    repeat: -1,
                    overwrite: true,
                    modifiers: {
                        x: (x: string) => {
                            const val = parseFloat(x) % width;
                            return `${val}px`;
                        },
                    },
                })
                .progress(1 / carouselItems.length)
        );
    };

    const carouselAnimation = () => {
        const carouselItems = itemsRef.current;
        if (carouselItems.length === 0) return;

        const itemWidth = carouselItems[0].clientWidth;
        const carouselWidth = itemWidth * carouselItems.length;
        const snapBox = gsap.utils.snap(itemWidth);

        carouselItems.forEach((el, i) => {
            gsap.set(el, {
                x: i * itemWidth,
                left: -itemWidth,
            });
        });

        if (wrapperRef.current) {
            gsap.set(wrapperRef.current, { height: itemHeight });
        }

        const timeline = createAnimation(carouselItems, carouselWidth);
        const proxy = document.createElement('div');
        const wrapProgress = gsap.utils.wrap(0, 1);

        Draggable.create(proxy, {
            trigger: '.carousel-display',
            inertia: true,
            type: 'x',
            onDrag: updateProgress,
            onThrowUpdate: updateProgress,
            snap: { x: snapBox },
        });

        function updateProgress() {
            if (timeline) {
                const progress = gsap.getProperty(proxy, 'x') as number;
                timeline.progress(wrapProgress(progress / carouselWidth));
            }
        }
    };

    useEffect(() => {
        setCarouselData([
            {
                title:"",
                src:"s1.jpeg"
            },
            {
                title:"",
                src:"s2.jpeg"
            },
            {
                title:"",
                src:"s3.jpeg"
            },
            {
                title:"",
                src:"s4.png"
            },
        ]);
    }, []);

    useEffect(() => {
        const handleResize = () => {
            setWindowWidth(window.innerWidth);
            carouselAnimation();
        };

        window.addEventListener('resize', handleResize);
        if (carouselData.length > 0) {
            carouselAnimation();
        }

        return () => {
            window.removeEventListener('resize', handleResize);
        };
    }, [carouselData]);

    return (
        <div className="carousel-container flex items-center m-auto h-screen" ref={wrapperRef}>
            <div className="carousel-display  my-auto" ref={measuredRef}>
                {carouselData.map((item, idx) => (
                    <div
                        key={idx}
                        className="carousel-display__item"
                        ref={addToRefs}
                        style={{
                            backgroundImage: `url('/img/${item.src}')`,
                            backgroundSize: 'cover',
                            backgroundPosition: 'center',
                            width: '340px',
                        }}
                    >
                        {item.title}
                    </div>
                ))}
            </div>
        </div>
    );
};

export default LogoSlider;
