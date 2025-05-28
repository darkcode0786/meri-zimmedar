// import { gsap } from "gsap"

// // Hero section animations
// export const animateHeroElements = () => {
//   const tl = gsap.timeline()

//   tl.from(".hero-title", {
//     opacity: 0,
//     y: 50,
//     duration: 0.8,
//     ease: "power3.out",
//   })
//     .from(
//       ".hero-description",
//       {
//         opacity: 0,
//         y: 30,
//         duration: 0.6,
//         ease: "power3.out",
//       },
//       "-=0.4",
//     )
//     .from(
//       ".hero-buttons",
//       {
//         opacity: 0,
//         y: 20,
//         duration: 0.5,
//         ease: "power3.out",
//       },
//       "-=0.3",
//     )
//     .from(
//       ".hero-features",
//       {
//         opacity: 0,
//         y: 20,
//         duration: 0.5,
//         ease: "power3.out",
//       },
//       "-=0.2",
//     )
//     .from(
//       ".login-card",
//       {
//         opacity: 0,
//         x: 30,
//         duration: 0.7,
//         ease: "power2.out",
//       },
//       "-=0.5",
//     )

//   return tl
// }

// // Staggered card animations
// export const animateCards = (selector: string, delay = 0) => {
//   gsap.from(selector, {
//     opacity: 0,
//     y: 40,
//     stagger: 0.1,
//     duration: 0.6,
//     delay,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: selector,
//       start: "top 80%",
//     },
//   })
// }

// // Section title animations
// export const animateSectionTitle = (selector: string) => {
//   gsap.from(selector, {
//     opacity: 0,
//     y: 30,
//     duration: 0.7,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: selector,
//       start: "top 85%",
//     },
//   })
// }

// // FAQ accordion animations
// export const animateAccordion = () => {
//   gsap.from(".faq-item", {
//     opacity: 0,
//     y: 20,
//     stagger: 0.1,
//     duration: 0.5,
//     ease: "power2.out",
//     scrollTrigger: {
//       trigger: ".faq-item",
//       start: "top 85%",
//     },
//   })
// }
