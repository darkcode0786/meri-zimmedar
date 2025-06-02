"use client"

import { useEffect, useRef } from "react"
import { gsap } from "gsap"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import { Shield, Users, Eye, CheckCircle, ArrowRight, Lock, Heart, FileText, FileCheck, AlertCircle, LockKeyhole } from "lucide-react"
import Image from "next/image"

import { Card, CardContent } from "./ui/card"
import Link from "next/link"
import { useGSAP } from "@gsap/react"

if (typeof window !== "undefined") {
    gsap.registerPlugin(ScrollTrigger)
}

export default function WhatWeDoSection() {
    const sectionRef = useRef<HTMLElement>(null)
    const titleRef = useRef<HTMLHeadingElement>(null)
    const problemRef = useRef<HTMLDivElement>(null)
    const solutionRef = useRef<HTMLDivElement>(null)
    const featuresRef = useRef<HTMLDivElement>(null)
    const benefitsRef = useRef<HTMLDivElement>(null)

    useEffect(() => {

        const ctx = gsap.context(() => {
            // Main timeline
            const tl = gsap.timeline({
                scrollTrigger: {
                    trigger: sectionRef.current,
                    start: "top 80%",
                    end: "bottom 20%",
                    toggleActions: "play none none reverse",
                },
            })

            // Title animation
            tl.fromTo(titleRef.current, { opacity: 0, y: 50 }, { opacity: 1, y: 0, duration: 1, ease: "power3.out" })

            // Problem section animation
            tl.fromTo(
                problemRef.current?.children || [],
                { opacity: 0, y: 80 },
                { opacity: 1, y: 0, duration: 0.8, stagger: 0.2, ease: "power4out" },
                "-=0.5",
            )

            // Solution section animation
            tl.fromTo(
                solutionRef.current?.children || [],
                { opacity: 0, x: -50 },
                { opacity: 1, x: 0, duration: 0.8, stagger: 0.15, ease: "power4out" },
                "-=0.3",
            )

            // Features animation
            tl.fromTo(
                featuresRef.current?.querySelectorAll(".feature-card") || [],
                { opacity: 0, y: 40, scale: 0.9 },
                { opacity: 1, y: 0, scale: 1, duration: 0.6, stagger: 0.1, ease: "back.out(1.7)" },
                "-=0.4",
            )

            // Benefits animation
            tl.fromTo(
                benefitsRef.current?.children || [],
                { opacity: 0, y: 20 },
                { opacity: 1, y: 0, duration: 0.6, stagger: 0.1, ease: "power4out" },
                "-=0.2",
            )
        }, sectionRef)

        return () => ctx.revert()
    }, [])


    // useGSAP(() => {
    //     let tl1 = gsap.timeline({
    //         scrollTrigger: {
    //             trigger: sectionRef.current,
    //             scroller: "body",
    //             start: "top 50%",
    //             markers: true,
    //             scrub: 2,

    //         }
    //     })


    //     tl1.from(titleRef.current,{
    //         y:150,
    //         duration:1,
    //        ease: "power4.out",
    //     })
    // }, [])

    return (
        <section id="what-we-do"
            ref={sectionRef}
            className="py-10 md:py-20 section  bg-white overflow-hidden"
        >

            {/* Title */}
            <div className="text-center  overflow-hidden">
                <h2 ref={titleRef} className="text-4xl md:text-4xl font-bold text-black ">
                    What We Do
                </h2>
            </div>
            <div className="w-24 h-1 bg-gradient-to-r mt-6 from-blue-600 to-indigo-600 mx-auto rounded-full"></div>

            {/* Problem Statement */}

            <div className="container mx-auto px-4 max-w-6xl">
                <div className="grid lg:grid-cols-2 gap-5 md:gap-12 pb-10 items-center">
                    <div className="order-2 lg:order-1">
                        <div className="relative">
                            <div className="absolute -top-10 -left-10 w-24 h-24 animate-bounce bg-blue-100 rounded-full opacity-70" />
                            <div className="absolute -bottom-8 -right-8 w-16 h-16 z-20 animate-bounce bg-blue-100 rounded-full opacity-70" />
                            <div className="relative z-10 bg-white rounded-2xl shadow-xl overflow-hidden">
                                <Image
                                    src="/img/how-we-do.png"
                                    alt="Financial Legacy Planning"
                                    width={500}
                                    height={500}
                                    className="w-full h-auto"
                                />
                                <div className="absolute inset-0 bg-gradient-to-t from-gray-900/70 to-transparent flex flex-col justify-end p-6">
                                    <div className="flex items-center gap-2 text-white mb-2">
                                        <AlertCircle className="w-6 h-6 text-white" />
                                        <span className="text-sm font-medium">Problem faced by multiples families</span>
                                    </div>
                                </div>





                            </div>
                        </div>
                    </div>

                    <div className="order-1 lg:order-2  py-10 md:py-25">
                        <h2 className="text-3xl md:text-4xl font-bold tracking-tight text-gray-900 mb-6">
                            <span className="relative">
                                Securing Your Legacy
                                {/* <span className="absolute -bottom-2 left-0 w-1/3 h-1 bg-blue-500"></span> */}
                            </span>
                            <span className="block text-blue-600 mt-2">For Those Who Matter Most</span>
                        </h2>

                        <p className="text-gray-700  mb-8 leading-relaxed">
                            Over a lifetime, individuals accumulate various financial assets like mutual funds, insurance policies,
                            bank accounts, fixed deposits, pension funds, real estate, and more.
                        </p>

                        <Card className="border-4 border-red-500/50 bg-red-50/80  mb-8">
                            <CardContent className="p-6">
                                <div className="flex items-start gap-4">

                                    <div>
                                        <h3 className="font-semibold text-xl text-gray-900 mb-2">The Problem</h3>
                                        <p className="text-gray-700">
                                            Many of these assets go unclaimed because nominees are often unaware of their existence or don't have
                                            enough information when it's really required.
                                        </p>
                                    </div>
                                </div>
                            </CardContent>
                        </Card>

                        <div className="flex flex-col sm:flex-row gap-4 items-start md:items-center space-x-2">
                            <Link href={"#promise"} className="flex  space-x-2 border p-3 m-1 rounded-xl border-blue-500 items-center  hover:underline" >
                                Secure Your Legacy
                                <ArrowRight className="ml-2 h-4 w-4" />
                            </Link>


                            <Link href={"#section-how"} className="flex border p-3 m-1 border-blue-500 rounded-xl space-x-2 items-center  hover:underline" ><FileCheck className="mr-2 h-4 w-4" /> How It Works</Link>

                        </div>
                    </div>
                </div>
            </div>


            {/* Solution */}
            <div ref={solutionRef} className="  py-10 md:py-20  w-screen mx-auto  bg-gray-100">
                <div className="max-w-6xl  mx-auto">
                    <div className="text-center mb-12">
                        <h3 className="text-3xl md:text-4xl font-semibold text-gray-900 mb-4">
                            Merizimmedari Changes Everything
                        </h3>
                        <p className=" text-gray-900">
                            Our intelligent platform revolutionizes how you secure your legacy
                        </p>
                    </div>

                    <div className="grid md:grid-cols-2 gap-8 items-center px-3">
                        <div className="space-y-6">
                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Shield className="w-6 h-6 text-blue-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-black mb-2">Secure Storage</h4>
                                    <p className="text-gray-900">
                                        Safely store all your financial asset information in one intelligent platform
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Users className="w-6 h-6 text-green-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-black mb-2">Smart Linking</h4>
                                    <p className="text-gray-900">
                                        Link assets with designated nominees without needing to inform them
                                    </p>
                                </div>
                            </div>

                            <div className="flex items-start space-x-4">
                                <div className="w-12 h-12 bg-purple-100 rounded-lg flex items-center justify-center flex-shrink-0">
                                    <Eye className="w-6 h-6 text-purple-600" />
                                </div>
                                <div>
                                    <h4 className="text-xl font-semibold text-black mb-2">Life Monitoring</h4>
                                    <p className="text-gray-900">
                                        Discreet life-monitoring system that respects your privacy completely
                                    </p>
                                </div>
                            </div>
                        </div>

                        <div className="bg-blue-500 rounded-2xl p-8 text-white">
                            <div className="text-center">
                                <div className="w-20 h-20 bg-white/20 rounded-full flex items-center justify-center mx-auto mb-6">
                                    <LockKeyhole className="w-10 h-10 text-white" />
                                </div>
                                <h4 className="text-2xl font-bold mb-4">Complete Confidentiality</h4>
                                <p className="text-blue-100 mb-6">
                                    While you're alive, all data remains completely confidential. After demise, the system automatically
                                    shares asset details.
                                </p>
                                <div className="bg-white/10 rounded-lg p-4">
                                    <p className="text-sm text-blue-100">
                                        Each nominee receives only the information intended for them
                                    </p>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>


            {/* Benefits */}
            <div id="promise" ref={benefitsRef} className="pt-10 md:pt-20 text-center">
                <div className="max-w-5xl mx-auto px-3 ">
                    <h3 className="text-3xl md:text-4xl font-semibold  text-gray-900 mb-8">The Merizimmedari Promise</h3>
                    <div className="grid md:grid-cols-3 gap-6 mb-12  ">
                        <div className="flex items-center justify-start md:justify-center space-x-3">
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                            <span className="text-lg text-gray-900">No Paperwork</span>
                        </div>
                        <div className="flex items-center justify-start md:justify-center space-x-3">
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                            <span className="text-lg text-gray-900">No Confusion</span>
                        </div>
                        <div className="flex items-center justify-start md:justify-center space-x-3">
                            <CheckCircle className="w-6 h-6 text-green-600 flex-shrink-0" />
                            <span className="text-lg text-gray-900">Complete Peace of Mind</span>
                        </div>
                    </div>
                    <Card className="bg-blue-500 rounded-2xl  text-white">
                       
                            <div className="flex flex-col md:flex-row items-center gap-2 px-3">

                                <div className="text-left  p-6 rounded-2xl">
                                    <h4 className="text-xl md:text-3xl font-bold mb-4">Your Assets Will Reach the Right Hands</h4>
                                    <p className="text-lg text-blue-100">Securely, automatically, and exactly as you intended</p>
                                </div>

                                <div className=" rounded-full">
                                    {/* <AlertCircle className="w-6 h-6 text-red-500" /> */}
                                    <Image src="/img/white-logo.png" width={400} className="p-6" height={300} alt="The Problem" />
                                </div>
                            </div>
                 
                    </Card>
                 
                </div>
            </div>

        </section>
    )
}
