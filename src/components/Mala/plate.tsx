"use client"
import { getByCategory, getByMultipleFilters, getSubCategories, getAllPlates } from '@/services/products';
import Loader from '@/shared/Loader';
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
  _id: string;
  title: string;
  size: string;
  price: number;
  img: string[];
  faces: string;
  country: string;
  weight: string;
  category: string;
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
  faces?: string;
  country?: string;
}

const Mala = () => {
  // Constants
  const ITEMS_PER_PAGE = 9;

  // State Management
  const [page, setPage] = useState(1);
  const [isSidebarOpen, setIsSidebarOpen] = useState(false);
  const [filters, setFilters] = useState<FilterState>({}); // eslint-disable-line @typescript-eslint/no-unused-vars


  const [selectedSize, setSelectedSize] = useState<string>("");
  const [priceRange, setPriceRange] = useState<[number, number]>([0, 1000]);
  const [searchQuery, setSearchQuery] = useState<string>("");
  const [cart, setCart] = useState<Product[]>([]);

  // Refs
  const pageRef = React.useRef<HTMLDivElement>(null);

  // Queries
  const { data: productsData, isLoading, error } = useQuery<ProductsData>({
    queryKey: ['mala-products', page, ITEMS_PER_PAGE, selectedSize, searchQuery, priceRange],
    queryFn: async () => {
      try {
        const obj: any = {};
        if (selectedSize) {
          obj["size"] = selectedSize;
        }
        if (searchQuery) {
          obj["title"] = searchQuery;
        }

        obj["pricegt"] = priceRange[0];
        obj["pricelt"] = priceRange[1];
        return await getAllPlates(page, ITEMS_PER_PAGE, obj);
      }
      catch (err) {
        console.log(err);
        throw err;
      }
      /** 
     try {
       // Create filters object
       const filters: Record<string, string> = {
         category: 'Mala', // Always filter by Mala category
       };

       // Add optional filters
       if (selectedFace) {
         filters.faces = selectedFace;
       }

       if (selectedCountry) {
         filters.country = selectedCountry;
       }
       if (selectedSubCategory) {
         filters.subCategory = selectedSubCategory;
       }


       // If we only have the category filter, use the simpler getByCategory function
       if (Object.keys(filters).length === 1) {
         return await getByCategory("Mala", page, ITEMS_PER_PAGE);
       }

       // Otherwise use the multiple filters function
       return await getByMultipleFilters(filters, page, ITEMS_PER_PAGE);
     } catch (error) {
       toast.error("Failed to fetch products");
       throw error;
     }
     **/
    },
  });


  /**
  const { data: subCategoryData } = useQuery({
    queryKey: ['subCategory-mug'],
    queryFn: () => getSubCategories()

  })
  if (!subCategoryData) {
    return <Loader />
  }
**/
  const filterOptions = {
    // faces: ['1', '2', '3', '4', '5', '6', '7', '8', '9', '10', '11', '12', '13', '14'],
    sizes: ["small", "medium", "big"],
  };
  // Handlers
  const handlePageChange = (newPage: number): void => {
    setPage(newPage);
    pageRef.current?.scrollIntoView({ behavior: 'smooth', block: 'start' });
  };


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

    
  const handleCart = useCallback((product: Product) => {
    const qProduct = {
      ...product,
      quantity: 1
    }
    if (cart.find(p => p._id === qProduct._id)) {
      qProduct["quantity"] += 1;
    }
    const updatedCart = [...cart.filter(c => c._id !== product._id), qProduct];
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
    setFilters(prevFilters => {
      if (!value) {
        // If value is empty, remove this filter
        const newFilters = { ...prevFilters };
        delete newFilters[category as keyof FilterState];
        return newFilters;
      }

      // Otherwise, add/update this filter
      return {
        ...prevFilters,
        [category]: value
      };
    });

    setPage(1);
  };



  const clearFilters = () => {
    setSelectedSize("");
    // setSelectedCountry("");
    // setSelectedSubCategory("");
    setFilters({});
    setPage(1);
  };

  if (error) return <div className="text-center py-10">Error loading products. Please try again later.</div>;

  return (
    <div ref={pageRef} className="min-h-screen">
      {/* Hero Section */}
      <div className="relative h-[500px] text-white">
        <Image
          src={'/plate2.jpg'}
          alt="Rudraksha Background"
          fill
          className="object-cover object-center"
          priority
        />
        <div className="absolute inset-0 bg-black/60" />
        <div className="relative h-full max-w-7xl mx-auto px-4 flex items-center">
          <div className="max-w-3xl">
            <h1 className={`text-4xl md:text-5xl font-bold mb-6 ${josefin.className}`}>
              Our Plates Collection
            </h1>
            <p className="text-lg md:text-xl text-gray-100 mb-8">
              Browse our beautifully crafted ceramic plates designed to blend functionality with artistic charm, ideal for elevating everyday dining.
            </p>
          </div>
        </div>
      </div>

      {/* Main Content */}
      <div className="max-w-7xl mx-auto px-4 py-12">
        <div className="flex flex-col md:flex-row gap-8">
          {/* Sidebar Filters */}
          <div className={`md:w-1/4 bg-white rounded-xl shadow-md mt-20 p-6 h-fit
            ${isSidebarOpen ? 'fixed inset-0 z-50 md:relative' : 'hidden md:block'}`}>
            <div className="flex justify-between items-center mb-6">
              <h3 className="text-xl font-semibold">Filters</h3>
              <div className="flex gap-2">
                {(selectedSize) && (
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
            {/* <AccordionItem key="faces" title="Size" classNames={{
                title: "!text-black text-sm"
              }}>
                <CheckboxGroup
                  value={selectedSize ? [selectedSize] : []}
                  onChange={(value) => {
                    const newValue = value[0] || "";
                    setSelectedSize(newValue);
                    handleFilterChange('size', newValue);
                  }}
                  classNames={{
                    wrapper: "flex flex-col gap-1"
                  }}
                >
                 
                  {filterOptions.size.map((face) => (
                    <Checkbox key={face} value={face} classNames={{ label: "!text-black" }}>
                      {face}
                    </Checkbox>
                  ))}
            
                </CheckboxGroup>
              </AccordionItem> */}

            {/* <AccordionItem key="sub-categories" title="Sub Categories" classNames={{
                title: "!text-black text-sm"}}>
                <CheckboxGroup
                  value={selectedSubCategory ? [selectedSubCategory] : []}
                  onChange={(value) => {
                    const newValue = value[0] || "";
                    setSelectedSubCategory(newValue);
                    handleFilterChange('sub-categories', newValue);
                  }}
                  classNames={{
                    wrapper: "flex flex-col gap-1"
                  }}
                >
      
                  {filterOptions?.subCategories?.map((sub: any) => ( //eslint-disable-line @typescript-eslint/no-explicit-any
                    <Checkbox key={sub} value={sub} classNames={{ label: "!text-black" }}>
                      {sub}
                    </Checkbox>
                  ))}
         
                </CheckboxGroup>
              </AccordionItem> */}

            {/* Country Filter
              <AccordionItem key="country" title="Origin" classNames={{
                title: "!text-black text-sm"
              }}>
                <CheckboxGroup
                  value={selectedCountry ? [selectedCountry] : []}
                  onChange={(value) => {
                    const newValue = value[0] || "";
                    setSelectedCountry(newValue);
                    handleFilterChange('country', newValue);
                  }}
                  classNames={{
                    wrapper: "flex flex-col gap-1"
                  }}
                >
                  {filterOptions.size.map((s) => (
                    <Checkbox key={s} value={s} classNames={{ label: "!text-black" }}>
                      {s}
                    </Checkbox>
                  ))}
                </CheckboxGroup>
              </AccordionItem> */}
            {/* </Accordion> */}
          </div>

          {/* Products Grid */}
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
                      handleFilterChange('faces', "");
                    }}
                    variant="flat"
                    color="primary"
                  >
                    Size : {selectedSize}
                  </Chip>
                )}
                {/* {selectedCountry && (
                  <Chip
                    onClose={() => {
                      setSelectedCountry("");
                      handleFilterChange('country', "");
                    }}
                    variant="flat"
                    color="primary"
                  >
                    Country: {selectedCountry}
                  </Chip>
                )} */}
              </div>
            )}

            {/* Products Grid */}
            {isLoading && <Loader />}
            <div>
              <h1 className={`text-primary font-bold text-4xl mb-8 ${josefin.className}`}>Plates Collection</h1>
              <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {productsData?.products.map((product) => (
                  <div key={product._id} className="group bg-white rounded-xl shadow-lg overflow-hidden hover:-translate-y-1 transition-all duration-300">
                    <Link
                      href={`/pot/${product._id}`}
                    >
                      <div className="relative h-48 w-full overflow-hidden">
                        <Image
                          src={product.img[0].startsWith("http") ? product.img[0] : `${process.env.NEXT_PUBLIC_BASE_URL}/${product.img[0]}`}
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

                      <div className="flex gap-2 mt-2">
                        <Chip size="sm" variant="flat" color="primary">{product.size}</Chip>
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
    </div>
  );
};

export default Mala;
