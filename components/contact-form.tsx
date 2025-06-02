"use client"

import type React from "react"

import { Button } from "@/components/ui/button"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Textarea } from "@/components/ui/textarea"
import { Send } from "lucide-react"
import { useGSAP } from "@gsap/react"
import gsap from "gsap"
import ScrollTrigger from 'gsap/dist/ScrollTrigger'

export default function ContactForm() {
    const handleSubmit = (e: React.FormEvent) => {
        e.preventDefault()
        // Handle form submission here
        console.log("Form submitted")
    }

    // useGSAP(() => {
    //     gsap.registerPlugin(ScrollTrigger)
    //     gsap.from(`#contactPng`, {
    //         opacity: 0,
            
    //         duration: 0.5,
    //         ease: "power4.out",
    //         scrollTrigger: {
    //             trigger: `#contact`,
    //             start: "top 60%",
    //             end:"top 70",

    //             scrub: 1,
    //             markers: true,
    //             toggleActions: "play none none reverse",
    //         },
    //     });
    // })

    return (
        <section id="contact" className="section md:py-20 py-10  px-4 bg-gray-100 ">

            <div className="max-w-7xl mx-auto">
                <div className='flex flex-col w-screen  items-center justify-center'>
                    <div className="overflow-hidden ">
                        <h2 id="heading-how" className='text-3xl md:text-4xl text-center font-bold  capitalize'>Contact Us</h2>
                    </div>
                    <div className="w-24 h-1 my-6 bg-gradient-to-r from-blue-600 to-indigo-600 mx-auto rounded-full"></div>
                </div>
                <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 items-center">
                    {/* Left side - Image with text overlay */}
                    <div className="relative h-full rounded-xl overflow-hidden">
                        <div className=" md:hidden absolute inset-0 bg-gradient-to-r from-blue-500/90 to-blue-400/60 z-10"></div>
                        <img 
                        id="contactPng"
                            src="/img/contact.png"
                            alt="Contact us"
                            className="absolute inset-0 w-full h-full object-cover"
                        />
                        <div className="relative z-20 p-8 h-full flex flex-col justify-center">
                            <h2 className="text-3xl font-bold text-white md:text-gray-800 mb-4">Get in Touch</h2>
                            <p className="text-lg text-white md:text-gray-800/90 mb-6 max-w-md">
                                Have questions about securing your legacy? Our team is here to help you protect what matters most.
                            </p>
                            <div className="space-y-3 text-white md:text-gray-800/90">
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-sm">contact@merizimmedari.com</span>
                                </div>
                                <div className="flex items-center">
                                    <div className="w-8 h-8 rounded-full bg-white/20 flex items-center justify-center mr-3">
                                        <svg
                                            xmlns="http://www.w3.org/2000/svg"
                                            className="h-4 w-4"
                                            fill="none"
                                            viewBox="0 0 24 24"
                                            stroke="currentColor"
                                        >
                                            <path
                                                strokeLinecap="round"
                                                strokeLinejoin="round"
                                                strokeWidth={2}
                                                d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z"
                                            />
                                        </svg>
                                    </div>
                                    <span className="text-sm">+1 (555) 123-4567</span>
                                </div>
                            </div>
                        </div>
                    </div>

                    {/* Right side - Contact form */}
                    <div className="bg-white rounded-xl shadow-lg p-6 border-6 border-gray-300/50 ">
                        <div className="mb-6">
                            <h3 className="text-xl font-bold text-gray-900 mb-2">Send us a Message</h3>
                            <p className="text-gray-600 text-sm">
                                Fill out the form below and our team will get back to you within 24 hours.
                            </p>
                        </div>

                        <form onSubmit={handleSubmit} className="space-y-4">
                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="firstName" className="text-sm font-medium text-gray-700">
                                        First Name *
                                    </Label>
                                    <Input
                                        id="firstName"
                                        name="firstName"
                                        placeholder="Enter your first name"
                                        className="h-10 placeholder:opacity-50"
                                        required
                                    />
                                </div>
                                <div className="space-y-1">
                                    <Label htmlFor="lastName" className="text-sm font-medium text-gray-700">
                                        Last Name *
                                    </Label>
                                    <Input id="lastName" name="lastName" placeholder="Enter your last name" className="h-10 placeholder:opacity-50" required />
                                </div>
                            </div>

                            <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                                <div className="space-y-1">
                                    <Label htmlFor="email" className="text-sm font-medium text-gray-700">
                                        Email Address *
                                    </Label>
                                    <Input
                                        id="email"
                                        name="email"
                                        type="email"
                                        placeholder="Enter your email address"
                                        className="h-10 placeholder:opacity-50"
                                        required
                                    />
                                </div>

                                <div className="space-y-1">
                                    <Label htmlFor="phone" className="text-sm font-medium text-gray-700">
                                        Phone Number
                                    </Label>
                                    <Input id="phone" name="phone" type="tel" placeholder="Enter your phone number" className="h-10 placeholder:opacity-50" />
                                </div>
                            </div>



                            <div className="space-y-1">
                                <Label htmlFor="subject" className="text-sm font-medium text-gray-700">
                                    Subject *
                                </Label>
                                <Input id="subject" name="subject" placeholder="What can we help you with?" className="h-10 placeholder:opacity-50" required />
                            </div>

                            <div className="space-y-1">
                                <Label htmlFor="message" className="text-sm font-medium text-gray-700">
                                    Message *
                                </Label>
                                <Textarea
                                    id="message"
                                    name="message"
                                    placeholder="Tell us more about your needs..."
                                    className="min-h-[80px] resize-none placeholder:opacity-50"
                                    required
                                />
                            </div>

                            <div className="pt-2">
                                <Button
                                    type="submit"
                                    className="w-full h-10 bg-blue-500  hover:bg-blue-700 text-white font-medium text-sm"
                                >
                                    <Send className="w-4 h-4 mr-2" />
                                    Send Message
                                </Button>
                            </div>

                            <p className="text-xs text-gray-500 text-center">
                                By submitting this form, you agree to our privacy policy and terms of service.
                            </p>
                        </form>
                    </div>
                </div>
            </div>
        </section>
    )
}
