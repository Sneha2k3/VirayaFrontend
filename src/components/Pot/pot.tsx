"use client"
import { getByCategory, getByMultipleFilters, getSpecialProduct, getAllPots } from '@/services/products';
import Loader from '@/shared/Loader';
import SharedTitle from '@/shared/SharedTitle/SharedTitle';
import { josefin } from '@/utils/font';
import { Accordion, AccordionItem, Button, Checkbox, CheckboxGroup, Chip, Pagination } from '@nextui-org/react';
import { useQuery } from '@tanstack/react-query';
import Image from 'next/image';
import Link from 'next/link';
import React, { useCallback, useEffect, useState } from 'react';
import { FiArrowRight, FiDollarSign, FiFilter, FiShoppingCart, FiX } from 'react-icons/fi';
import { toast } from 'sonner';
import Accord from '../shared/Accord';

export interface Product {
  productId: string;
  _id: string;
  title: string;
  size: string;
  price: number;
  img: string[];
  faces: string;
  country: string;
  weight: string;
  category: string;
  description?: string;
}

export interface ProductsData {
  products: Product[];
  pagination: {
    currentPage: number;
    totalPages: number;
    totalCount: number;
  };
}

interface FilterState {
  category: string;
  value: string;
}

const Products = () => {
  // Constants
  const ITEMS_PER_PAGE = 9;

  // State Management
  const [page, setPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [selectedFace, setSelectedFace] = useState<string>("");
  const [selectedCountry, setSelectedCountry] = useState<string>("");
  const [activeFilter, setActiveFilter] = useState<FilterState | null>(null);
  const [cart, setCart] = useState<Product[]>([]);
  const [selectedSize, setSelectedSize] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState<string>("");



  // Refs
  const pageRef = React.useRef<HTMLDivElement>(null);

  // Queries
  // const { data: productsData, isLoading, error } = useQuery<ProductsData>({
  //   queryKey: ['products', page, ITEMS_PER_PAGE, activeFilter],
  //   queryFn: async () => {
  //     try {
  //       // Create filters object
  //       const filters: Record<string, string> = {
  //         category: 'Beads', // Always filter by Bracelet category
  //       };

  //       // Add optional filters
  //       if (selectedFace) {
  //         filters.faces = selectedFace;
  //       }

  //       if (selectedCountry) {
  //         filters.country = selectedCountry;
  //       }
  //       if (selectedSize) {
  //         filters.size = selectedSize;
  //       }

  //       if (Object.keys(filters).length === 1) {
  //         return await getByCategory("Beads", page, ITEMS_PER_PAGE);
  //       }

  //       return await getByMultipleFilters(filters, page, ITEMS_PER_PAGE);
  //     } catch (error) {
  //       toast.error("Failed to fetch products");
  //       throw error;
  //     }
  //   },
  // });


  const { data: productsData, isLoading, error } = useQuery<ProductsData>({
    queryKey: [
      'mug-products',
      page,
      ITEMS_PER_PAGE,
      selectedSize,
      searchQuery,
      priceRange
      // selectedSubCategory
    ],
    queryFn: async () => {
      try {
        // const filters: Record<string, string> = {
        //   category: 'Mug',
        // };
        const obj: any = {};
        if (selectedSize) {
          obj["size"] = selectedSize;
        }
        if (searchQuery) {
          obj["title"] = searchQuery;
        }

        obj["pricegt"] = priceRange[0];
        obj["pricelt"] = priceRange[1];

        const data = await getAllPots(page, ITEMS_PER_PAGE, obj);
        console.log("edited function being called");
        console.log(data);
        return data;
      } catch (err) {
        console.log(err);
        throw err;
      }


      /**
        try {
          const filters: Record<string, string> = {
            category: 'Mug',
          };
  
          if (selectedFace) filters.faces = selectedFace;
          if (selectedCountry) filters.country = selectedCountry;
          // if (selectedSubCategory) filters.subCategory = selectedSubCategory;
  
          const hasExtraFilters =
            selectedFace !== '' || selectedCountry !== '';//|| selectedSubCategory !== ''
  
          if (hasExtraFilters) {
            return await getByMultipleFilters(filters, page, ITEMS_PER_PAGE);
          } else {
            return await getByCategory('Mug', page, ITEMS_PER_PAGE);
          }
        } catch (error) {
          toast.error('Failed to fetch products');
          throw error;
        }
          **/
    },

  });

  /** 
   const { data: specialProducts, isLoading: specialLoading } = useQuery<ProductsData>({
     queryKey: ['special-products'],
     queryFn: async () => {
       try {
         return await getSpecialProduct();
       } catch (error) {
         toast.error("Failed to fetch special products");
         throw error;
       }
     },
   });
 **/

  // Add this state for search functionality

  // Filter products based on the search query

  useEffect(()=> {
    //[LOOK] 
    try {
      const lCart = JSON.parse(localStorage.getItem("cart") || "[]");
      if(lCart)
        setCart(lCart);
    }catch(err) {
      console.error("Error parsing cart from localStorage:", err);
      setCart([]);
      toast.error("Error loading cart from localStorage. Please try again.");
    }
  },[])


  // useEffect(()=> {
  //   const filteredProducts = productsData?.products.filter((product) =>
  //     product.title.toLowerCase().includes(searchQuery.toLowerCase())
  //   );
  //   setFilteredProducts(filteredProducts || []);
  // },[searchQuery])

  // Filter Options
  const filterOptions = {
    // faces: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
    sizes: ['small', 'medium', 'large'],
    // countries: ['Nepal', 'Indonesia']
  };


  // Handlers
  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
    pageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };



  const handleCart = useCallback((product: Product) => {
    const qProduct = {
        ...product,
        quantity:1
    }
    if(cart.find(p  => p._id === qProduct._id)) {
      qProduct["quantity"] +=1;
    }
    const updatedCart = [...cart.filter(c=>c._id!==product._id), qProduct];
    setCart(updatedCart);
    localStorage.setItem('cart', JSON.stringify(updatedCart));
  }, [cart]);

  const addToCart = useCallback((product: Product) => {
    handleCart(product);
    toast.success(`${product.title} added to cart!`);
  }, [handleCart]);

  const addAndGoToCart = useCallback((product: Product) => {
    handleCart(product);
    window.location.href = '/checkout';
  }, [handleCart]);

  const handleFilterChange = (category: string, value: string) => {
    if (!value) {
      setActiveFilter(null);
      return;
    }

    setActiveFilter({
      category,
      value
    });
    setPage(1);
  };

  const clearFilters = () => {
    setSelectedFace("");
    setSelectedSize("");
    setSelectedCountry("");
    setActiveFilter(null);
    setPage(1);
  };

  if (error) {
    console.log(error);
    return <div className="text-center py-10">Error loading products. Please try again later.</div>;
  }

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] text-white">
        <Image
          src={'/pot2.jpg'}
          alt="Pot Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-3xl">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${josefin.className}`}>
              Our Pot Collection
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              Explore our handcrafted collection of ceramic pots, thoughtfully designed and fired with care—perfect for bringing warmth and artistry into any space.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`md:w-1/4 bg-white rounded-xl shadow-md p-6 mt-20 h-fit
            ${isSidebarOpen ? 'fixed inset-0 z-50 md:relative' : 'hidden md:block'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Filters</h3>
              <div className="flex gap-2">
                {activeFilter && (
                  <Button
                    size="sm"
                    variant="light"
                    color="danger"
                    onPress={clearFilters}
                  >
                    Clear All
                  </Button>
                )}
                <Button
                  isIconOnly
                  variant="light"
                  className="md:hidden"
                  onPress={() => setIsSidebarOpen(false)}
                >
                  <FiX />
                </Button>
              </div>
            </div>
            <Accord 
              filterOptions={filterOptions}
              handleFilterChange={handleFilterChange}
              selectedSize={selectedSize}
              setSelectedSize={setSelectedSize}
              priceRange={priceRange}
              setPriceRange={setPriceRange}
              searchQuery={searchQuery}
              setSearchQuery={setSearchQuery} 
              />

            {/* <Accordion> */}
            {/* Faces Filter */}
            {/* <AccordionItem key="faces" title="Faces" classNames={{
                title: "!text-black"
              }}>
                <CheckboxGroup
                  value={selectedFace ? [selectedFace] : []}
                  onChange={(value) => {
                    const newValue = value[0] || "";
                    setSelectedFace(newValue);
                    handleFilterChange('faces', newValue);
                  }}
                >
                {filterOptions.faces.map((face) => (
                    <Checkbox key={face} value={face} classNames={{ label: "!text-black" }}>
                      {face} Face
                    </Checkbox>
                  ))} 
                </CheckboxGroup>
              </AccordionItem> */}

            {/* <AccordionItem key="title" title="Title" classNames={{ title: "!text-black" }}>
                <div className="flex items-center justify-between mb-8 w-full">
                  <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                  />
                </div>
              </AccordionItem> */}

            {/* Size Filter */}
            {/* <AccordionItem key="size" title="Size" classNames={{
                title: "!text-black"
              }}>
                <CheckboxGroup
                  value={selectedSize ? [selectedSize] : []}
                  onChange={(value) => {
                    const newValue = value[0] || "";
                    setSelectedSize(newValue);
                    handleFilterChange('size', newValue);
                  }}
                >
                  {filterOptions.sizes.map((size) => (
                    <Checkbox key={size} value={size} classNames={{ label: "!text-black" }}>
                      {size}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </AccordionItem> */}

            {/* <AccordionItem key="price" title="Price Range" classNames={{ title: "!text-black" }}>
                <div className="flex flex-col gap-4">
                  <div className="flex justify-between text-sm text-gray-600">
                    <span>${priceRange[0]}</span>
                    <span>${priceRange[1]}</span>
                  </div>
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[0]}
                    onChange={(e) => handlePriceChange([+e.target.value, priceRange[1]])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                  <input
                    type="range"
                    min="0"
                    max="1000"
                    step="10"
                    value={priceRange[1]}
                    onChange={(e) => handlePriceChange([priceRange[0], +e.target.value])}
                    className="w-full h-2 bg-gray-200 rounded-lg appearance-none cursor-pointer"
                  />
                </div>
              </AccordionItem> */}



            {/* Country Filter */}
            {/* <AccordionItem key="country" title="Origin" classNames={{
                title: "!text-black"
              }}>
                <CheckboxGroup
                  value={selectedCountry ? [selectedCountry] : []}
                  onChange={(value) => {
                    const newValue = value[0] || "";
                    setSelectedCountry(newValue);
                    handleFilterChange('country', newValue);
                  }}
                >
                 {filterOptions.countries.map((country) => (
                    <Checkbox key={country} value={country} classNames={{ label: "!text-black" }}>
                      {country}
                    </Checkbox>
                  ))} 
                </CheckboxGroup>
              </AccordionItem> */}
            {/* </Accordion>  */}


          </div>

          {/* Products Grid */}
          {isLoading && <Loader />}
          <div className="md:w-3/4">
            <div className="flex flex-wrap items-center justify-between gap-4 mb-8">
              <Button
                variant="flat"
                className="md:hidden"
                onPress={() => setIsSidebarOpen(true)}
                startContent={<FiFilter />}
              >
                Filters
              </Button>
            </div>


            {/* Active Filters Display */}
            {(selectedSize) && (
              <div className="flex flex-wrap gap-2 mb-4">
                {selectedSize && (
                  <Chip
                    onClose={() => {
                      setSelectedSize("");
                      handleFilterChange('size', "");
                    }}
                    variant="flat"
                    color="primary"
                  >
                    Size: {selectedSize}
                  </Chip>
                )}
              </div>
            )}
            <div>
              <h1 className={`text-primary font-bold text-4xl mb-8 ${josefin.className}`}>Pot Collection</h1>
              {productsData?.products.length === 0 && (
                <div className='w-full h-[300px] bg-gray-50 rounded-sm flex items-center justify-center'>
                  <h1 className='text-2xl font-semibold text-gray-400 tracking-wider'>No Product Found.</h1>
                </div>
              )}

              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productsData?.products.map((product) => (
                  <div key={product._id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                    <Link
                      href={`/pot/${product._id}`}
                    >

                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={product.img[0].startsWith('http') ? product.img[0] : `${process.env.NEXT_PUBLIC_BASE_URL}/${product.img[0]}`}
                          alt={product.title}
                          fill
                          className="object-cover group-hover:scale-110 transition-transform duration-700"
                        />
                      </div>
                    </Link>
                    <div className="px-6 py-2">
                      <div className='flex items-center justify-between gap-2'>
                        <h4 className="text-xl font-semibold mb-2">{product.title}</h4>
                        <div className="text-xl font-bold text-primary">Nrs. {product.price}</div>
                      </div>

                      <div className="flex gap-2 mt-2 ">
                        <Chip size="sm" variant="flat" color='primary'>{product.size}</Chip>
                        {/* <Chip size="sm" variant="flat" color="secondary">{product.faces} Face</Chip> */}
                        {/* <Chip size="sm" variant="flat" color="success">{product.country}</Chip> */}
                      </div>
                      <div className="flex justify-between mt-3">
                        <Button
                          variant="light"
                          className="text-primary border border-primary rounded-md w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px] xl:w-[90px]"
                          onPress={() => addToCart(product)}
                        >
                          <FiShoppingCart className="mr-2" />
                        </Button>
                        <Button
                          onPress={() => addAndGoToCart(product)}
                          className="text-white bg-primary border border-primary rounded-md w-[50px] sm:w-[60px] md:w-[70px] lg:w-[80px] xl:w-[90px]"

                        >
                          <FiDollarSign className="mr-2" />
                        </Button>
                      </div>
                    </div>
                  </div>
                ))}
              </div>
            </div>

            {/* Pagination */}
            {productsData?.pagination && productsData.pagination.totalPages > 1 && (
              <div className="flex justify-center mt-12">
                <Pagination
                  total={productsData.pagination.totalPages}
                  page={page}
                  onChange={handlePageChange}
                  showControls
                  color="primary"
                  className="gap-2"
                />
              </div>
            )}
          </div>
        </div>
      </div>

      {/* Special Products Section */}
      {/**
      {specialProducts?.products && specialProducts.products.length > 0 && (
        <div className="w-full px-4 md:px-16 mt-12 mb-16">
          <div className="mx-auto text-center mb-12">
            <SharedTitle title="Our Special Collection" />
            <p className="text-gray-600 max-w-3xl mx-auto mt-4">
              Discover our carefully curated selection of premium Rudraksha beads,
              handpicked for their exceptional quality and spiritual significance.
              Each piece in this collection represents the finest examples of sacred craftsmanship.
            </p>
          </div>
          {specialLoading && <Loader />}
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
            {specialProducts.products.map((product) => (
              <div
                key={product._id}
                className="bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300"
              >
                <div className="relative">
                  <div className="absolute top-4 right-4 z-10">
                    <Chip
                      color="primary"
                      variant="solid"
                      size="sm"
                      className="font-medium"
                    >
                      Special
                    </Chip>
                  </div>
                  <Link
                    href={`/pot/${product._id}`}
                  >
                    <div className="relative h-48 w-full overflow-hidden">
                      <Image
                        src={product.img[0]}
                        alt={product.title}
                        fill
                        className="object-cover hover:scale-110 transition-transform duration-700"
                      />
                    </div>
                  </Link>
                </div>

                <div className="p-6 text-center">
                  <h4 className="text-xl font-semibold mb-4">{product.title}</h4>
                  <div className="flex justify-center gap-2 mb-4">
                    <Chip size="sm" variant="flat" color="primary">{product.size}</Chip>
                    <Chip size="sm" variant="flat" color="secondary">{product.faces} Face</Chip>
                  </div>
                  <div className="text-2xl font-bold text-primary mb-4">
                    ${product.price}
                  </div>
                  <Link
                    href={`/pot/${product._id}`}
                    className="text-primary hover:text-primary/80 font-medium inline-flex items-center"
                  >
                    View Details
                    <FiArrowRight className="ml-2" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      )}
      **/}
    </div>
  );
};

export default Products;
