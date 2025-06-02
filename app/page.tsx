"use client"
import { Header } from "@/components/header"
import { Footer } from "@/components/footer"
import { Button } from "@/components/ui/button"
import { Card, CardContent } from "@/components/ui/card"
import { Accordion, AccordionContent, AccordionItem, AccordionTrigger } from "@/components/ui/accordion"
import {

  CheckCircle,
  MessageCircleQuestion,

} from "lucide-react"
import { useRef, useEffect } from "react"
import { gsap } from "gsap"
import { useGSAP } from '@gsap/react'
import splitType from "split-type"
import SignInForm from "@/components/sign-in-form"
import SliderComponent from "@/components/slider-section"
import { ScrollTrigger } from "gsap/ScrollTrigger"
import WhatWeDoSection from "@/components/what-we-do-section"
import Image from "next/image"
import { TextPlugin } from "gsap/TextPlugin";
import TypewriterEffect from "@/components/typewriter-effect"
import ContactForm from "@/components/contact-form"
import Link from "next/link"





export default function HomePage() {



  useGSAP(() => {
    gsap.registerPlugin(TextPlugin);
    gsap.registerPlugin(splitType)
    gsap.registerPlugin(ScrollTrigger)
    let splittedText = new splitType(".text-main", { types: 'lines' })
    let howWE = new splitType("#how-wedo-para", { types: 'lines' })

    gsap.from(splittedText.lines, {
      duration: 1,
      opacity: 0,
      y: 150,
      stagger: 0.1,
      ease: 'power4.out',

    })
    gsap.from(howWE.lines, {
      duration: 1,
      opacity: 0,
      y: 150,
      stagger: 0.3,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: "#how-wedo-para",
        start: "top 100%",

      }
    })


    gsap.from(`#hero-png`, {
      opacity: 0,
      x: 100,
      y: 100,
      duration: 0.7,
      ease: "power4.out",
      scrollTrigger: {
        trigger: `hero-png`,
        start: "top 80%",
        end: "top 60%",
        scrub: 1,
        // markers: true,

      },
    });


    gsap.from("#heading-how", {
      y: 200,
      duration: 0.9,

      ease: 'power4.out',
      scrollTrigger: {
        trigger: "#section-how",
        start: "top 80%",
        toggleActions: "play none none none",

      }
    })
    gsap.from("#faq-text", {
      x: -600,
      duration: 1.2,
      ease: 'power4.out',
      scrollTrigger: {
        trigger: "#faq",
        start: "top 100%",
        toggleActions: "play none none none",

      }
    })



    // ancor links
    document.querySelectorAll('.section').forEach(section => {
      const id = section.getAttribute('id');
      // Find the Link <a> by its href
      const anchor = document.querySelector(`a[href="#${id}"]`);

      if (anchor) {
        ScrollTrigger.create({
          trigger: section,
          start: 'top center',
          end: 'bottom center',
          toggleClass: { targets: anchor, className: 'active-anchor' },
        });
      }
    });

    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());



  })



  return (
    <div className=" relative z-10 pt-24 flex min-h-screen flex-col w-full max-w-screen overflow-x-hidden" >
      <Header />
      <main className="flex-1 "   >
        {/* Hero Section */}
        <section className="section relative md:h-[580px] w-full  py-8 md:py-12 ">
          <div
            className="absolute inset-0 bg-cover bg-center z-0"
            style={{ backgroundImage: "url('/img/hero-banner.jpg')" }}
          ></div>
          <div className="absolute inset-0 bg-gradient-to-r from-black/50 to-black/30 z-[1]"></div>
          <div className="container py-10 relative z-10 flex  ">
            <div className=" justify-between p-2 gap-4  flex flex-col md:flex-row mx-auto w-full items-center ">
              <div className="flex flex-col space-y-6  w-full  md:min-w-1/2" >
                <div className="space-y-4 relative min:min-h-full">
                  {/* <h1 className="text-6xl font-bold text-white">Meri Zimmedari</h1> */}

                  <h1 className="overflow-hidden text-main text-4xl font-bold text-white min-w-full h-42  sm:text-5xl md:text-4xl">
                    {/* Are you sure your <br /> */}
                    <TypewriterEffect
                      text="Are you sure your nominee can claim all your assets when the time comes?"
                      speed={80}
                      delayBeforeReverse={700}
                    />
                    {/* <br /> all your <span className="text-blue-500">assets</span>. when the time comes? */}
                  </h1>
                  <Image id="hero-png" src="/img/hero2.webp" className="absolute animate-bounce z-20 top-49 w-34 md:w-42 left-50  md:top-30 md:left-100 " width={200} height={200} alt="sequirity image" />

                </div>


                <div className="flex flex-col md:flex-row space-y-2 md:space-y-0 md:space-x-4  bg-transparent backdrop-blur-2xl md:backdrop-blur-none  rounded-2xl md:rounded-none p-5  text-sm text-muted">
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    <span>Secure & Encrypted</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    <span>Easy to Use</span>
                  </div>
                  <div className="flex items-center">
                    <CheckCircle className="mr-1 h-4 w-4" />
                    <span>24/7 Support</span>
                  </div>
                </div>


              </div>

              {/* Login/Signup Card */}
              <div className="min-w-1/2">
                <SignInForm />

              </div>

            </div>
          </div>
          <div className="absolute bottom-0 left-0 right-0 h-24 bg-gradient-to-t from-background to-transparent"></div>
        </section>

        {/* what we do Section */}
        <WhatWeDoSection />



        <SliderComponent />





        {/* FAQ Section */}
        <section id="faq" className="section py-10 md:py-20  bg-background px-3 md:px-0">
          <div className="container md:px-52">

            <div className="grid lg:grid-cols-2 border-6 border-gray-100 p-6   rounded-2xl shadow-2xl">


              <div className="text-center mb-16 md:p-10 overflow-hidden">
                <h2 id="faq-text" className="text-2xl font-bold tracking-tighter sm:text-4xl md:text-6xl text-left section-title">
                  Frequently Asked Questions
                </h2>
                <div className="w-24 h-1 bg-gradient-to-r from-blue-600 to-indigo-600 my-6 rounded-full"></div>

                <p className="mt-4 text-2xl text-muted-foreground text-left">Find answers to common questions about our platform</p>
                {/* <Link href="#" className="hover:underline  p-2 my-4">more faq's</Link> */}
                <Link href={"/"} className="flex my-3 space-x-2 w-fit border p-3 m-1 rounded-xl border-blue-500 items-center  hover:underline" >
                  More Faq's
                   
                  <MessageCircleQuestion className="ml-2 h-4 w-4" />
                </Link>

              </div>

              <div className="max-w3xl ">
                <Accordion defaultValue="item-1" type="single" collapsible className="w-full">
                  <AccordionItem value="item-1">
                    <AccordionTrigger className="text-left">How secure is my data on your platform?</AccordionTrigger>
                    <AccordionContent>
                      Your data is protected with AES-256 encryption, the industry standard for secure data storage. We
                      also implement multi-factor authentication, regular security audits, and follow best practices for
                      data protection. Our servers are hosted in secure facilities with 24/7 monitoring.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-2">
                    <AccordionTrigger className="text-left">
                      What happens if I miss a monthly life declaration?
                    </AccordionTrigger>
                    <AccordionContent>
                      If you miss a monthly life declaration, you'll receive multiple reminders via email and SMS. After a
                      grace period, if still unverified, your nominees will be notified. Your account remains secure, but
                      certain features may be temporarily restricted until verification is completed.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-3">
                    <AccordionTrigger className="text-left">How do I add or change nominees?</AccordionTrigger>
                    <AccordionContent>
                      You can add or change nominees through your account dashboard. Navigate to the "Nominees" section,
                      where you can add new nominees by providing their contact information and setting their access
                      levels. You can modify or remove existing nominees at any time. All changes to nominees require
                      additional verification for security purposes.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-4">
                    <AccordionTrigger className="text-left">
                      What types of assets can I upload to the platform?
                    </AccordionTrigger>
                    <AccordionContent>
                      You can upload various types of assets including financial documents (bank statements, investment
                      portfolios), legal documents (wills, trusts, power of attorney), property deeds, insurance policies,
                      digital asset information, and personal identification documents. All files are encrypted and
                      securely stored.
                    </AccordionContent>
                  </AccordionItem>

                  <AccordionItem value="item-5">
                    <AccordionTrigger className="text-left">What subscription plans do you offer?</AccordionTrigger>
                    <AccordionContent>
                      We offer several subscription tiers to meet different needs. Our Basic plan includes essential
                      features for individual users. The Premium plan adds additional storage and nominee options. Our
                      Family plan allows for multiple user profiles under one account. Business plans are also available
                      for organizations. All plans include our core security features and monthly verification system.
                    </AccordionContent>
                  </AccordionItem>
                </Accordion>

              </div>
            </div>
          </div>
        </section>

        <ContactForm />



        <Footer />
      </main>

    </div>
  )
}
