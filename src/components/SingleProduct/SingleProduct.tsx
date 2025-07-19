"use client"
import { getSingleProduct } from '@/services/products';
import Loader from '@/shared/Loader';
import Login from '@/shared/Login/Login';
import { RootState } from '@/store';
import { addToCart, removeFromCart } from '@/store/slices/cartSlice';
import { josefin } from '@/utils/font';
import { getValidImageUrl } from '@/utils/imageUtils';
import {
  BreadcrumbItem,
  Breadcrumbs,
  Button,
  Chip,
  ScrollShadow,
  Tab,
  Tabs
} from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import { motion } from 'framer-motion';
import { useSession } from 'next-auth/react';
import Image from 'next/image';
import Link from 'next/link';
import { useParams } from 'next/navigation';
import React, { useEffect, useRef, useState } from 'react';
import { FaChevronLeft, FaChevronRight, FaShippingFast, FaTrash } from 'react-icons/fa';
import { IoMdCall } from 'react-icons/io';
import { IoBagAddOutline } from 'react-icons/io5';
import { MdSecurity, MdVerified } from 'react-icons/md';
import { RiCustomerService2Fill } from 'react-icons/ri';
import { useDispatch, useSelector } from 'react-redux';
import Slider from 'react-slick';
import "slick-carousel/slick/slick-theme.css";
import "slick-carousel/slick/slick.css";
import RelatedProducts from './RelatedProducts';

interface BenefitCardProps {
  icon: React.ElementType;
  title: string;
  description: string;
}

interface CustomArrowProps {
  onClick?: () => void;
}

const CustomPrevArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <Button
    isIconOnly
    onClick={onClick}
    className="absolute left-2 top-1/2 text-white -translate-y-1/2 z-10 bg-primary/40 hover:bg-opacity-100 rounded-full p-2 transition-all duration-300"
  >
    <FaChevronLeft />
  </Button>
);

const CustomNextArrow: React.FC<CustomArrowProps> = ({ onClick }) => (
  <Button
    isIconOnly
    onClick={onClick}
    className="absolute right-2 top-1/2 text-white -translate-y-1/2 z-10 bg-primary/40 hover:bg-opacity-100 rounded-full p-2 transition-all duration-300"
  >
    <FaChevronRight />
  </Button>
);

const BenefitCard: React.FC<BenefitCardProps> = ({ icon: Icon, title, description }) => (
  <div className="bg-white rounded-lg shadow-sm p-4">
    <div className="flex items-start gap-4">
      <div className="p-2 bg-primary/10 rounded-lg">
        <Icon size={24} className="text-primary" />
      </div>
      <div>
        <h3 className="text-lg font-semibold mb-2">{title}</h3>
        <p className="text-sm text-gray-600">{description}</p>
      </div>
    </div>
  </div>
);

const SingleProduct: React.FC = () => {
  const [nav1, setNav1] = useState<Slider | null>(null);
  const [nav2, setNav2] = useState<Slider | null>(null);
  const [selectedTab, setSelectedTab] = useState<string>("details");
  const sliderRef1 = useRef<Slider | null>(null);
  const sliderRef2 = useRef<Slider | null>(null);
  const [login, setLogin] = useState(false)
  const { status } = useSession()

  const handleLogin = () => {
    setLogin(true)
  }

  const { id } = useParams();
  const dispatch = useDispatch();
  const cartItems = useSelector((state: RootState) => state.cart.items);
  const isInCart = cartItems.find(item => item._id === id);

  const { data: singleProduct, isLoading } = useQuery({
    queryKey: ['singleProduct', id],
    queryFn: () => getSingleProduct(id as string),
    enabled: !!id
  });

  const handleCart = () => {
    if (status === "unauthenticated") {
      handleLogin()
      return
    }
    if (!singleProduct?.product) return;

    if (isInCart) {
      dispatch(removeFromCart({ _id: singleProduct.product._id }));
    } else {
      dispatch(addToCart({
        _id: singleProduct.product._id,
        title: singleProduct.product.title,
        price: singleProduct.product.price,
        img: singleProduct.product.img[0],
        quantity: 1,
        description: singleProduct.product.description,
        faces: singleProduct.product.faces,
        country: singleProduct.product.country,
        size: singleProduct.product.size
      }));
    }
  };

  const sliderSettings = {
    infinite: true,
    speed: 500,
    prevArrow: <CustomPrevArrow />,
    nextArrow: <CustomNextArrow />,
    autoplay: true,
    pauseOnHover: true,
    autoplaySpeed: 4000,
  };

  const thumbnailSettings = {
    ...sliderSettings,
    slidesToShow: 4,
    arrows: false,
    focusOnSelect: true,
  };

  const benefits: BenefitCardProps[] = [
    {
      icon: MdVerified,
      title: "100% Authentic",
      description: "Every Rudraksha is verified and certified by experts"
    },
    {
      icon: FaShippingFast,
      title: "Fast Shipping",
      description: "Worldwide shipping with tracking available"
    },
    {
      icon: MdSecurity,
      title: "Secure Payment",
      description: "Multiple secure payment options available"
    },
    {
      icon: RiCustomerService2Fill,
      title: "Expert Support",
      description: "24/7 customer support for all your queries"
    }
  ];

  useEffect(() => {
    if (sliderRef1.current && sliderRef2.current) {
      setNav1(sliderRef1.current);
      setNav2(sliderRef2.current);
    }
  }, []);

  const handleTabChange = (key: React.Key) => {
    setSelectedTab(String(key));
  };

  if (isLoading) return <Loader />;
  if (!singleProduct?.product) return null;

  return (
    <>
      <Login isOpen={login} onOpenChange={setLogin} />
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className=""
      >
        <div className="max-w-7xl mx-auto px-4 py-8">
          <Breadcrumbs className="mb-8">
            <BreadcrumbItem href="/">Home</BreadcrumbItem>
            <BreadcrumbItem href="/pot">Products</BreadcrumbItem>
            <BreadcrumbItem className="!text-black">{singleProduct.product.title}</BreadcrumbItem>
          </Breadcrumbs>

          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12">

            {singleProduct.product.img.length > 1 ? (
              <div className="space-y-4">
                <div className="overflow-hidden">
                  <Slider
                    {...sliderSettings}
                    asNavFor={nav2 || undefined}
                    ref={(slider) => {
                      sliderRef1.current = slider;
                    }}
                  >
                    {singleProduct?.product?.img.map((image: string, index: number) => (
                      <div className='px-0' key={index}>
                        <div className='h-[400px]'>
                          <Image
                            src={getValidImageUrl(image)}
                            alt={`${singleProduct.product.title} - Image ${index + 1}`}
                            height={1000}
                            width={1000}
                            className='object-cover w-full h-full'
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-image.jpg';
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>

                <div className="overflow-hidden">
                  <Slider
                    asNavFor={nav1 || undefined}
                    ref={(slider) => {
                      sliderRef2.current = slider;
                    }}
                    {...thumbnailSettings}
                    slidesToShow={4}
                    swipeToSlide={true}
                    focusOnSelect={true}
                  >
                    {singleProduct?.product?.img.map((image: string, index: number) => (
                      <div className='px-1' key={index}>
                        <div className='h-[120px]'>
                          <Image
                            src={getValidImageUrl(image)}
                            alt={`${singleProduct.product.title} - Thumbnail ${index + 1}`}
                            height={1000}
                            width={1000}
                            className='object-cover w-full h-full'
                            onError={(e) => {
                              const target = e.target as HTMLImageElement;
                              target.src = '/placeholder-image.jpg';
                            }}
                          />
                        </div>
                      </div>
                    ))}
                  </Slider>
                </div>
              </div>
            ) :
              (
                <div className="h-[400px]">
                  <Image
                    src={getValidImageUrl(singleProduct?.product?.img[0])}
                    alt={singleProduct.product.title}
                    height={1000}
                    width={1000}
                    className='object-cover w-full h-full rounded-md'
                  />
                </div>
              )}

            {/* Product Info */}
            <div className="space-y-6">
              <div>
                <h1 className={`${josefin.className} text-4xl font-bold mb-4`}>
                  {singleProduct.product.title}
                </h1>
                <div className="flex items-center gap-4 mb-4">
                  <span className="text-3xl font-bold text-primary">
                    ${singleProduct.product.price}
                  </span>
                  {singleProduct?.product?.stock > 0 ?
                    <Chip color="success" variant="flat">
                      In Stock
                    </Chip>
                    :
                    <Chip color="danger" variant="flat">
                      Not in Stock
                    </Chip>
                  }

                </div>
              </div>

              <Tabs
                selectedKey={selectedTab}
                onSelectionChange={handleTabChange}
                className="mb-6"
                color='primary'
                variant='underlined'
                size='lg'
              >
                <Tab key="details" title="Details">
                  <ScrollShadow className="h-40">
                    <p className="text-gray-600 leading-relaxed">
                      {singleProduct.product.description}
                    </p>
                  </ScrollShadow>
                </Tab>
                <Tab key="specifications" title="Specifications">
                  <div className="grid grid-cols-2 gap-4">
                    {Object.entries({
                      Size: singleProduct.product.size,
                      Weight: singleProduct.product.weight,
                      Country: singleProduct.product.country,
                      Faces: `${singleProduct.product.faces} faces`,
                    }).map(([key, value]) => (
                      <div key={key} className="flex justify-between p-2 bg-gray-50 rounded">
                        <span className="font-medium">{key}</span>
                        <span>{value}</span>
                      </div>
                    ))}
                  </div>
                </Tab>
                <Tab key="benefits" title="Benefits">
                  <ScrollShadow className="h-40">
                    <ul className="list-disc pl-4 space-y-2">
                      <li>Enhances spiritual growth and meditation</li>
                      <li>Brings peace and harmony</li>
                      <li>Promotes positive energy</li>
                      <li>Helps in stress relief</li>
                    </ul>
                  </ScrollShadow>
                </Tab>
              </Tabs>

              <div className="space-y-4">
                <Button
                  className={`w-full rounded-sm ${isInCart ? 'bg-red-600' : 'bg-primary'} text-white`}
                  startContent={isInCart ? <FaTrash /> : <IoBagAddOutline />}
                  size="lg"
                  onClick={handleCart}
                >
                  {isInCart ? 'Remove from cart' : 'Add to cart'}
                </Button>

                <Button
                  className="w-full rounded-sm bg-primary/10 text-primary"
                  startContent={<IoMdCall />}
                  size="lg"
                >
                  Consult with Expert
                </Button>
              </div>
            </div>
          </div>

          {/* Benefits Section */}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6 my-12">
            {benefits.map((benefit, index) => (
              <BenefitCard key={index} {...benefit} />
            ))}
          </div>

          {/* Related Products Section */}
          <div className="my-12">
            <h2 className={`${josefin.className} text-2xl font-bold mb-6 text-primary`}>
              Related Products
            </h2>
            <RelatedProducts id={id} />
            <Link href={'/pot'} className='w-full flex items-center justify-center my-12'>
              <Button
                className="w-fit px-8 rounded-sm bg-primary text-white">View Products
              </Button>
            </Link>
          </div>

        </div>
      </motion.div>
    </>
  );
};

export default SingleProduct;