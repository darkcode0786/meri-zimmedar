"use client"
import gsap from 'gsap'
import { useGSAP } from '@gsap/react'
import Image from 'next/image'
import React, { useRef } from 'react'
import splitType from 'split-type'
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

const SliderComponent = () => {
    const containerRef = useRef<HTMLDivElement>(null)
    const scrollSectionRef = useRef<HTMLDivElement>(null)
    const wrapperRef = useRef<HTMLDivElement>(null)


    const data = [
        {
            "title": "Upload Assets & Link Nominees",
            "para": "User’s upload their asset details, will & any special notes and Link these asset or document with designated nominees.",
            "image-png": "upload.png",
            "bg-color": "bg-green-950"
        },
        {
            "title": "Submit Quick Life Declaration",
            "para": "Users confirm their well-being by simply blinking eyes into the camera, activated via the 'Submit Life Declaration' tab. This keeps their asset details secure and confidential throughout their lifetime.",
            "image-png": "face-reco.png",
            "bg-color": "bg-blue-800"
        },
        {
            "title": "Confirmation of User Demise",
            "para": "If life declaration is not received for a defined period, the system initiates follow-up with listed nominees. The user's demise is confirmed by verifying the authenticity of the death certificate submitted by a nominee.",
            "image-png": "confirmation.png",
            "bg-color": "bg-black"
        },
        {
            "title": "Post Demise Asset Sharing with Nominees",
            "para": "The system finally shares personalized documents with each nominee. These documents contain the relevant asset details, will, and special notes intended specifically for respected nominee. ",
            "image-png": "sharing.png",
            "bg-color": "bg-teal-600"
        },
    ]

    useGSAP(() => {
        gsap.registerPlugin(ScrollTrigger)
        const scrollSection = scrollSectionRef.current
        const container = containerRef.current
        const wrapper = wrapperRef.current

        if (!container || !wrapper || !scrollSection) return

        const horizontalScrollLength = wrapper.scrollWidth - container.offsetWidth



        // ✅ Set exact vertical height to match scroll distance
        gsap.set(scrollSection, {
            height: horizontalScrollLength + window.innerHeight,
        })

        // ✅ Horizontal scroll
        gsap.to(wrapper, {
            x: () => -horizontalScrollLength,
            ease: 'none',
            scrollTrigger: {
                trigger: container,
                start: 'top 0%',
                end: () => `+=${horizontalScrollLength}`,
                pin: true,
                pinSpacing: true,
                scrub: 2,
                // markers: true,
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
                    start: "top 80%",
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


            <section ref={scrollSectionRef} className="relative w-full h-[340px] bg-gray-100 ">

                <div ref={containerRef} className="absolute top-24 left-0 h-480px w-full overflow-hidden bg-gray-100 z-10">
                    <div className='flex flex-col w-screen'>
                        <div className="overflow-hidden "><h2 id="heading-how" className=' text-3xl md:text-4xl text-center font-bold mb-4 capitalize '>HOW WE DO</h2>
                        </div>
                        <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                    </div>
                    <div ref={wrapperRef} className="flex min-w-[140%] h-full">

                        {data.map((item, index) => (
                            <div key={index} className="w-1/4 p-4 flex items-center pb-10 pt-5 justify-center">
                                <div id={`parent-${index}`} className={`${item["bg-color"]} h-67 w-full rounded-xl flex items-center justify-center   relative`}>
                                    <div className="w-full  p-6 ">
                                        <h3 id={`cardsHead-${index}`} className="overflow-hidden  text-3xl mb-6 text-white">
                                            {item.title}
                                        </h3>
                                        <p className="text-sm text-white pr-25">{item.para}</p>
                                        <div className="w-[10vw] absolute top-[8rem] left-[19rem] z-10">
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
