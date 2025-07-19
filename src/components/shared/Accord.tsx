import { Accordion, AccordionItem, Checkbox, CheckboxGroup } from "@nextui-org/react";


const Accord = ({filterOptions,handleFilterChange,selectedSize,setSelectedSize,priceRange,setPriceRange,searchQuery,setSearchQuery} : any) => {
    const handlePriceChange = (newRange: [number, number]) => {
        setPriceRange(newRange);
        handleFilterChange('price', `${newRange[0]}-${newRange[1]}`);
    };
    return <Accordion>
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

        <AccordionItem key="title" title="Title" classNames={{ title: "!text-black" }}>
            <div className="flex items-center justify-between mb-8 w-full">
                <input
                    type="text"
                    placeholder="Search products..."
                    value={searchQuery}
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className="w-full px-4 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-primary"
                />
            </div>
        </AccordionItem>

        {/* Size Filter */}
        <AccordionItem key="size" title="Size" classNames={{
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
                {filterOptions.sizes.map((size : any) => (
                    <Checkbox key={size} value={size} classNames={{ label: "!text-black" }}>
                        {size}
                    </Checkbox>
                ))}
            </CheckboxGroup>
        </AccordionItem>

        <AccordionItem key="price" title="Price Range" classNames={{ title: "!text-black" }}>
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
        </AccordionItem>



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
    </Accordion>
}

export default Accord;