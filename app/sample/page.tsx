import Image from 'next/image'
import React from 'react'

const page = () => {
    return (
        <section data-scroll-section className="scroll-mt-24 py-20 bg-blue-500 flex items-center">
            <div className="container w-full h-full grid lg:grid-cols-2 lg:gap-16 items-center">
                <div className="w-full h-full">
                    <Image
                    
                        width={400}
                        height={400}
                        alt="Family member image"
                        src="/img/.png" // ✅ Correct path
                        className="w-full z-50 h-auto object-cover" // optional for responsiveness
                    /></div>
                <div>
                    <h1 className="text-4xl font-bold text-white leading-snug">
                        Lorem ipsum dolor sit, amet consectetur adipisicing elit. Doloribus, architecto?
                    </h1>
                    <ul>
                        <li>Many assets go unclaimed.</li>
                        <li>Nominees often unaware or uninformed.</li>
                        <li>Traditional methods are unreliable.</li>
                    </ul>
                </div>
            </div>
        </section>
    )
}

export default page
