import { Button, Divider } from '@nextui-org/react'
import Link from 'next/link'
import { BsArrowRight } from 'react-icons/bs'
import { FaInstagram } from 'react-icons/fa'
import { FaXTwitter } from 'react-icons/fa6'
import { FiFacebook } from 'react-icons/fi'

const FooterLink = ({ href, children }: { href: string, children: string }) => (
    <Link href={href} className="text-sm font-semibold flex items-center gap-2 group cursor-pointer text-zinc-800 hover:text-black">
        <span className="group-hover:translate-x-1 group-hover:underline transition-all duration-300">
            {children}
        </span>
        <BsArrowRight className="opacity-0 group-hover:opacity-100 transition-opacity duration-300" size={12} />
    </Link>
)

const Footer = () => {
    const date = new Date().getFullYear()
    return (
        <>
            <main className='bg-primary/20 px-4 sm:px-8 md:px-16 lg:px-32 mt-12 py-8 pt-16 flex flex-col gap-8'>
                <main className='flex flex-col md:flex-row items-start justify-between gap-12 md:gap-8'>
                    <section className='text-black flex flex-col gap-6 w-full md:w-auto'>
                        <div className='text-black flex flex-col gap-2'>
                            <h1 className='font-semibold text-lg'>Need Help ?</h1>
                            <div className='w-24 bg-black h-[1px]'></div>
                        </div>
                        <div className='text-black'>
                            <p className='font-medium text-lg'>Call Us</p>
                            <p className='font-semibold text-sm'>Phone: 00000000</p>
                            <p className='font-semibold text-sm'>Mobile: 9800000000</p>
                        </div>
                        <div className='text-black'>
                            <p className='font-medium text-lg'>Email Us</p>
                            <p className='font-semibold text-sm'>vitraya264@gmail.com</p>
                        </div>
                        <div className='text-black'>
                            <p className='font-medium text-lg'>Follow Us On</p>
                            <div className='flex gap-4 mt-2'>
                                <Button isIconOnly size='sm' className='bg-blue-500 text-white'>
                                    <FiFacebook size={22} className='transition duration-300' />
                                </Button>
                                <Button isIconOnly size='sm' className='bg-pink-400 text-white'>
                                    <FaInstagram size={20} className='transition duration-300' />
                                </Button>
                                <Button isIconOnly size='sm' className='bg-black text-white'>
                                    <FaXTwitter size={20} className='transition duration-300' />
                                </Button>
                            </div>
                        </div>
                    </section>
                    <section className='text-black flex flex-col gap-6 w-full md:w-auto'>
                        {/* <div className='text-black flex flex-col gap-2'>
                            <h1 className='font-semibold text-lg'>Quick Links</h1>
                            <div className='w-24 bg-black h-[1px]'></div>
                        </div> */}
                        {/* <div className='flex flex-col gap-2'>
                            <FooterLink href="/">Home</FooterLink>
                            <FooterLink href="/rudraksha">Rudraksha</FooterLink>
                            <FooterLink href="/mala">Mala</FooterLink>
                            <FooterLink href="/bracelet">Bracelet</FooterLink>
                            <FooterLink href="/exclusive">Exclusive</FooterLink>
                            <FooterLink href="/consultation">Consultation</FooterLink>
                        </div> */}
                    </section>

                    <section className='text-black flex flex-col gap-6 w-full md:w-auto'>
                        {/* <div className='text-black flex flex-col gap-2'>
                            <h1 className='font-semibold text-lg'>Extra Links</h1>
                            <div className='w-24 bg-black h-[1px]'></div>
                        </div> */}
                        {/* <div className='flex flex-col gap-2'>
                            <FooterLink href="/privacy-policy">Privacy Policy</FooterLink>
                            <FooterLink href="/about">About Us</FooterLink>
                            <FooterLink href="/faqs">FAQs</FooterLink>
                            <FooterLink href="/terms-and-conditions">Terms and Conditions</FooterLink>
                        </div> */}
                    </section>

                    <section className='text-black flex flex-col gap-6 w-full md:w-auto'>
                        <div className='text-black flex flex-col gap-2'>
                            <h1 className='font-semibold text-lg'>Our Services</h1>
                            <div className='w-24 bg-black h-[1px]'></div>
                        </div>
                        <div className='flex flex-col gap-2'>
                            <FooterLink href="/consultation">Customized Products</FooterLink>
                            {/* <FooterLink href="/consultation">Free Consultation</FooterLink> */}
                            <FooterLink href="/reviews">View Reviews</FooterLink>
                        </div>
                    </section>
                </main>
                <main className='flex flex-col w-full gap-4 mt-4 items-center justify-center'>
                    <Divider className='bg-gray-600' />
                    {/* <div className='flex flex-col sm:flex-row items-center w-full justify-between text-gray-700 gap-2 text-center sm:text-left'>
                        <p>Copyright © {date} by Khadbari Rudraskha Suppliers</p>
                        <p>© Developed by <Link href='https://nischal-neupane.com.np' className='underline underline-offset-2' target='_blank'>Nischal Neupane</Link> and Rabin Bhattarai</p>
                    </div> */}
                </main>
            </main>
        </>
    )
}

export default Footer
