"use client"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import React, { useEffect, useRef } from 'react'
import splitType from 'split-type'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

const SliderComponent = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollSectionRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)


    const data = [
        {
            "title": "Upload Assets & Link Nominees",
            "para": "Users upload their asset details, will, and any special notes, and link these assets or documents with designated nominees. This ensures a seamless transfer of information and clarity in asset allocation.",
            "image-png": "upload.png",
            "bg-color": "bg-[#87E5FD]",
            "head-text": "text-[#026179]",
            "para-text": "text-[#026179]/90"
        },
        {
            "title": "Submit Quick Life Declaration",
            "para": "Users confirm their well-being by simply blinking eyes into the camera, activated via the 'Submit Life Declaration' tab. This keeps their asset details secure and confidential throughout their lifetime.",
            "image-png": "face-reco.png",
            "bg-color": "bg-[#BFA49C]",
            "head-text": "text-[#3E2D28]",
            "para-text": "text-[#3E2D28]/90"
        },
        {
            "title": "Confirmation of User Demise",
            "para": "If life declaration is not received for a defined period, the system initiates follow-up with listed nominees. The user's demise is confirmed by verifying the authenticity of the death certificate submitted by a nominee.",
            "image-png": "confirmation.png",
            "bg-color": "bg-[#EAAEE1]",
            "head-text": "text-[#922682]",
            "para-text": "text-[#922682]/90"
        },
        {
            "title": "Post Demise Asset Sharing with Nominees",
            "para": "The system finally shares personalized documents with each nominee. These documents contain the relevant asset details, will, and special notes intended specifically for respected nominee. ",
            "image-png": "sharing.png",
            "bg-color": "bg-[#C6EBBE]",
            "head-text": "text-[#3D8C2B]",
            "para-text": "text-[#3D8C2B]/90"
        },
    ]

    const data1 = [
        {
            "title": "Upload Assets & Link Nominees",
            "para": "Users upload their asset details, will, and any special notes, and link these assets or documents with designated nominees. This ensures a seamless transfer of information and clarity in asset allocation.",
            "image-png": "upload.png",
            "bg-color": "bg-[#8A6552]",
            "head-text": "text-[#EEE0CB]",
            "para-text": "text-[#EEE0CB]/90"
        },
        {
            "title": "Submit Quick Life Declaration",
            "para": "Users confirm their well-being by simply blinking eyes into the camera, activated via the 'Submit Life Declaration' tab. This keeps their asset details secure and confidential throughout their lifetime.",
            "image-png": "face-reco.png",
            "bg-color": "bg-[#280003]/80",
            "head-text": "text-[#C2847A]",
            "para-text": "text-[#C2847A]/90"
        },
        {
            "title": "Confirmation of User Demise",
            "para": "If life declaration is not received for a defined period, the system initiates follow-up with listed nominees. The user's demise is confirmed by verifying the authenticity of the death certificate submitted by a nominee.",
            "image-png": "confirmation.png",
            "bg-color": "bg-[#473BF0]",
            "head-text": "text-[#9B9ECE]",
            "para-text": "text-[#9B9ECE]/90"
        },
        {
            "title": "Post Demise Asset Sharing with Nominees",
            "para": "The system finally shares personalized documents with each nominee. These documents contain the relevant asset details, will, and special notes intended specifically for respected nominee. ",
            "image-png": "sharing.png",
            "bg-color": "bg-[#3E5622]",
            "head-text": "text-[#95B46A]",
            "para-text": "text-[#95B46A]/90"
        },
    ]


    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        const scrollSection = scrollSectionRef.current
        const container = containerRef.current
        const wrapper = wrapperRef.current
        // const checkForMobile: string = window.innerWidth <= 768 ? "top 25%" : "top 10%"
        if (!container || !wrapper || !scrollSection) return

        const horizontalScrollLength = wrapper.scrollWidth - container.offsetWidth



        // ✅ Set exact vertical height to match scroll distance
        gsap.set(scrollSection, {
            height: horizontalScrollLength + window.innerHeight,
        })

        // ✅ Horizontal scroll
        gsap.to(wrapper, {
            x: () => -horizontalScrollLength,
            y: 0,
            ease: "none",

            scrollTrigger: {
                trigger: container,
                start: window.innerWidth <= 768 ? "top 25%" : "top 10%",
                end: () => `+=${horizontalScrollLength}`,
                pin: true,
                scrub: 1, anticipatePin: 1,
                invalidateOnRefresh: true,
            },
        })
        gsap.registerPlugin(splitType)

        data.forEach((item, index) => {

            let cardsHead = new splitType(`#cardsHead-${index}`, { types: 'lines' })

            gsap.from(`#png-upload-${index}`, {
                opacity: 0,
                x: 100,
                y: 100,
                duration: 0.7,
                ease: "power4.out",
                scrollTrigger: {
                    trigger: `#png-upload-${index}`,
                    start: "top 90%",
                    end: "top 60%",
                    scrub: 1,
                    // markers: true,
                    toggleActions: "play none none reverse",
                },
            });




            gsap.from(cardsHead.lines, {
                duration: 1,
                opacity: 0,
                y: 150,
                stagger: 0.1,
                ease: 'power4.out',
                scrollTrigger: {
                    trigger: `#parent-${index}`, // us parent container ko trigger bana do
                    start: "top 80%",
                    toggleActions: "play none none none", // only play once
                    // markers: true, // debugging ke liye
                },
            });


        });
    })


    return (
        <>
            <section ref={scrollSectionRef} id='section-how' className={`relative w-full  md:max-h-[1160px] max-h-[1700px]   bg-gray-100`}>
                <div ref={containerRef} className="absolute top-0 w-full max-h-screen  overflow-hidden  z-10">
                    <div className='flex flex-col w-screen md:pt-20 pt-10 md:pb-10 items-center justify-center'>
                        <div className="overflow-hidden ">
                            <h2 id="heading-how" className='text-3xl md:text-4xl text-center font-bold  capitalize'>How We Do</h2>
                        </div>
                        <div className="w-24 h-1 my-6 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                    </div>
                    <div ref={wrapperRef} className="flex md:min-w-[140%] w-min-[400%]">
                        {data.map((item, index) => (
                            <div key={index} className="w-full slider-div md:w-1/4 p-6 pb-10   md:pb-15  flex items-center  justify-center">
                                <div id={`parent-${index}`} className={`${item["bg-color"]} h-72   md:w-full w-screen rounded-xl flex items-start justify-center relative`}>
                                    <div className="w-full p-6  flex flex-col items-start justify-center relative z-20">
                                        <h3 id={`cardsHead-${index}`} className={`overflow-hidden  font-bold text-2xl md:text-3xl mb-6 ${item["head-text"]}`}>{item.title}</h3>
                                        <p className={`text-sm ${item["head-text"]} pr-15 py-1 `}>{item.para}</p>
                                        <div className=" w-42 md:w-[12vw] absolute top-50 left-58  md:top-[10rem] md:left-[19rem] z-10">
                                            <Image id={`png-upload-${index}`} src={`/img/${item["image-png"]}`} className='w-full' width={250} height={250} alt="upload png" />
                                        </div>
                                    </div>
                                </div>
                            </div>
                        ))}
                    </div>
                </div>
            </section>

        </>
    )
}

export default SliderComponent
