"use client"
import { josefin } from '@/utils/font'
import { Button, Input } from '@nextui-org/react'
import Image from 'next/image'
import { useRouter } from 'next/navigation'
import React from 'react'
import { CiSearch } from 'react-icons/ci'
// import WhyUs from './Benefits'
import Categories from './Categories'
// import ChooseUs from './ChooseUs'
// import CountryBeads from './CountryBeads'
import ProductsHome from './ProductsHome'
import Reviews from './Reviews'

const MainHome = () => {
    const [searchQuery, setSearchQuery] = React.useState<string>("");
    const router = useRouter();
    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            setSearchQuery("");
        }
    };

    const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
        setSearchQuery(e.target.value);
    };
    return (
        <>
            <div className='w-full lg:h-[90vh] h-[60vh] flex items-center justify-center relative'>
                <div className='h-full flex items-center justify-left w-full relative lg:px-24 px-4'>
                    <div className='h-full absolute inset-0 w-full'>
                        <Image
                            src={'/other.jpg'}
                            alt='Rudraksha beads background'
                            height={1000}
                            width={1000}
                            className='w-full h-full object-cover opacity-[75]'
                        />
                    </div>
                    <div className='relative text-left lg:w-4/5 w-full'>
                        <h1 className={`${josefin.className} font-medium text-black lg:text-5xl text-2xl lg:w-2/3 w-full`}>
                            <span style={{ color: '#F3D5B5' }}>Vitraya</span>
                        </h1>

                        <p className='text-base text-white lg:w-1/2 w-full my-4'>
                            Handcrafted with tradition.Personalized by you. <br />Explore our timeless ceramic collection and bring your creativity to life one design at a time.
                        </p>

                        <form action="" onSubmit={handleSearch}>
                            <Input
                                classNames={{
                                    input: "placeholder:text-gray-500 !text-black",
                                    inputWrapper: "!text-black",
                                    base: "border-b-[.5px] border-white"
                                }}
                                type="text"
                                size='lg'
                                value={searchQuery}
                                onChange={handleInputChange}
                                placeholder="Search what you are looking for..."
                                className='rounded-sm mt-10 lg:w-1/2 w-full'
                                radius='sm'
                                startContent={<CiSearch size={32} className='text-black mr-2' />}
                                endContent={
                                    <Button
                                        className='bg-primary rounded-sm px-8 py-0 text-white'
                                        size='sm'
                                        type='submit'
                                        isDisabled={!searchQuery.trim()}
                                    >
                                        Search
                                    </Button>
                                }
                            />
                        </form>
                    </div>
                </div>
            </div>
            <div className="space-y-12">
                <ProductsHome />
                <Categories />
                {/* <CountryBeads /> */}
                {/* <WhyUs /> */}
                <Reviews />
                {/* <ChooseUs /> */}
            </div>
        </>
    )
}

export default MainHome