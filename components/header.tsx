"use client"


import Link from "next/link"
import { Button } from "@/components/ui/button"
import { Shield, X, MapPin, Menu, Mail, Phone } from "lucide-react"
import Image from "next/image"
import {
  Sheet,
  SheetContent,
  SheetTrigger,
} from "@/components/ui/sheet"


export function Header() {

  return (
    <header

      className="fixed  w-full top-0 h-25 z-40 border-b bg-white/80 backdrop-blur-md px-6">
      <div className="container flex h-full items-center justify-between py-4 mx-auto">
        {/* Left side: Logo */}
        <div className="flex items-center justify-between w-full md:w-auto">
          <div className="flex items-center gap-2 w-40 overflow-hidden">
            <Link href="/" className="w-full h-full">
              <Image src="/img/logo2.png" alt="app logo" width={150} height={50} priority className="object-cover " />
            </Link>
          </div>

          {/* Mobile Menu Trigger -   aligned right in mobile */}
          <Sheet>
            <SheetTrigger className="md:hidden ml-auto p-2 rounded-lg border border-gray-200 hover:bg-gray-100">
              <Menu className="h-6 w-6" />
            </SheetTrigger>

            <SheetContent side="right" className="w-72 bg-white">
              <div className="flex items-center gap-2 w-50 overflow-hidden">
                <Image src="/img/logo.png" alt="Modern apartment building" width={300} height={120} priority
                  className="object-cover pl-3 pt-3" />
              </div>




              <div className="flex flex-col space-y-6 p-5">
                <Link id="anchor1" href="#what-we-do" className="text-lg font-medium hover:text-primary">
                  What We Do?
                </Link>
                <Link id="anchor2" href="#section-how" className="text-lg font-medium hover:text-primary">
                  How We Do?
                </Link>
                <Link id="anchor3" href="#faq" className="text-lg font-medium hover:text-primary">
                  FAQ
                </Link>
                <Link id="anchor4" href="#contact" className="text-lg font-medium hover:text-primary">
                  Contact Us
                </Link>

              </div>
          
            </SheetContent>
          </Sheet>
        </div>

        {/* Desktop Navigation */}
        <nav className="hidden md:flex items-center gap-8 hover-group">
          <Link id="anchor1" href="#what-we-do" className="hover-item text-lg font-medium transition-colors hover:text-primary">
            What We Do?
          </Link>
          <Link id="anchor2" href="#section-how" className="hover-item text-lg font-medium transition-colors hover:text-primary">
            How We Do?
          </Link>
          {/* <Link  id="anchor1" href="#why-us" className="hover-item text-lg font-medium transition-colors hover:text-primary">
            Why Choose Us
          </Link> */}
          <Link id="anchor3" href="#faq" className="hover-item text-lg font-medium transition-colors hover:text-primary">
            FAQ
          </Link>
          <Link id="anchor4" href="#contact" className="hover-item text-lg font-medium transition-colors hover:text-primary">
            Contact Us
          </Link>
        </nav>

        {/* Desktop Contact Button */}

        <div className="hidden md:flex items-center gap-4">

          <Button variant="outline" size="sm">
            Log In
          </Button>
          <Button size="sm">Sign Up</Button>

        </div>
      </div>
    </header>
  )
}
