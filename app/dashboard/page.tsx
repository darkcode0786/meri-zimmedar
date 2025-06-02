"use client"


import { useEffect } from 'react';
import { gsap } from 'gsap';
import { ScrollTrigger } from 'gsap/ScrollTrigger';

gsap.registerPlugin(ScrollTrigger);

export default function SectionHighlight() {
  useEffect(() => {
    // For each section
    document.querySelectorAll('.section').forEach(section => {
      const id = section.getAttribute('id');
      const anchor = document.querySelector(`a[href="#${id}"]`);

      ScrollTrigger.create({
        trigger: section,
        start: 'top center',
        end: 'bottom center',
        toggleClass: { targets: anchor, className: 'active-anchor' },
      });
    });

    // Cleanup
    return () => ScrollTrigger.getAll().forEach(trigger => trigger.kill());
  }, []);

  return (
    <div>
      <nav className="anchors">
        <a href="#section1" id="anchor1">Section 1</a>
        <a href="#section2" id="anchor2">Section 2</a>
        <a href="#section3" id="anchor3">Section 3</a>
      </nav>
      <section id="section1" className="section h-screen bg-red-300">Section 1</section>
      <section id="section2" className="section h-screen bg-green-300">Section 2</section>
      <section id="section3" className="section h-screen bg-blue-300">Section 3</section>
    </div>
  );
}
