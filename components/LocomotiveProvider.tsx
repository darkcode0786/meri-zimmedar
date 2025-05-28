// 'use client';

// import { useEffect, useRef, useState } from 'react';
// import type { ReactNode } from 'react';
// import 'locomotive-scroll/dist/locomotive-scroll.css';

// // type LocomotiveScrollOptions = {
// //     el: HTMLElement;
// //     smooth?: boolean;
// //     multiplier?: number;
// //     lerp?: number;
// //     smartphone?: { smooth?: boolean; breakpoint?: number };
// //     tablet?: { smooth?: boolean; breakpoint?: number };
// // };

// interface Props {
//     children: ReactNode;
//     options?: Partial<Omit<any, 'el'>>;
// }

// export default function LocomotiveProvider({ children, options = {} }: Props) {
//     const scrollRef = useRef<HTMLDivElement>(null);
//     const locoScrollInstance = useRef<any>(null);

//     useEffect(() => {
//         let isMounted = true;

//         (async () => {
//             const LocomotiveScroll = (await import('locomotive-scroll')).default;

//             if (scrollRef.current && isMounted) {
//                 const scroll = new LocomotiveScroll({
//                     el: scrollRef.current,
//                     smooth: true,
//                     lerp: 0.04,
//                     multiplier: 1,
//                     smartphone: {
//                         smooth: true, // ✅ Enable smooth scroll on mobile
//                     },
//                     tablet: {
//                         smooth: true, // ✅ Enable smooth scroll on tablets
//                         breakpoint: 1024,
//                     },

//                 });

//                 locoScrollInstance.current = scroll;

//                 // Scroll to anchor if present
//                 if (typeof window !== 'undefined' && window.location.hash) {
//                     const id = window.location.hash.slice(1);
//                     const target = document.getElementById(id);
//                     if (target) {
//                         setTimeout(() => scroll.scrollTo(target), 500);
//                     }
//                 }
//             }
//         })();

//         return () => {
//             isMounted = false;
//             if (locoScrollInstance.current) {
//                 locoScrollInstance.current.destroy();
//             }
//         };
//     }, [options]);

//     useEffect(() => {
//         if (locoScrollInstance.current) {
//             locoScrollInstance.current.update();
//         }
//     });

//     return (
//         <div data-scroll-container ref={scrollRef}>
//             {children}
//         </div>
//     );
// }
