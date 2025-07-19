import React, { useState, useRef } from 'react';
import { Button, Input } from "@nextui-org/react";
import { CiSearch } from "react-icons/ci";
import { IoMdClose } from "react-icons/io";
import { useRouter } from 'next/navigation';

interface SearchModalProps {
    isOpen: boolean;
    onOpenChange: (open: boolean) => void;
}

const ExpandableSearch: React.FC<SearchModalProps> = ({ isOpen, onOpenChange }) => {
    const [searchQuery, setSearchQuery] = useState("");
    const router = useRouter();
    const inputRef = useRef<HTMLInputElement>(null);

    const handleSearch = (e: React.FormEvent<HTMLFormElement>) => {
        e.preventDefault();
        if (searchQuery.trim()) {
            router.push(`/search?query=${encodeURIComponent(searchQuery.trim())}`);
            onOpenChange(false);
            setSearchQuery("");
        }
    };

    const handleClose = () => {
        setSearchQuery("");
        onOpenChange(false);
    };

    return (
        <div
            className={`fixed top-24 right-0 z-[9998] transition-all duration-300 ease-in-out 
                ${isOpen ? 'w-1/3 opacity-100' : 'w-0 opacity-0 pointer-events-none'}`}
        >
            <form onSubmit={handleSearch} className="w-full h-full flex items-center justify-end px-4">
                <Input
                    ref={inputRef}
                    startContent={<CiSearch className="text-2xl text-default-400" />}
                    placeholder="Search..."
                    value={searchQuery}
                    radius='sm'
                    variant='underlined'
                    onChange={(e) => setSearchQuery(e.target.value)}
                    className={`transition-all shadow-2xl duration-300 ${isOpen ? 'w-full' : 'w-0'} bg-white px-4 py-2`}
                    autoFocus
                    size="sm"
                    classNames={{
                        input: '!text-black',
                    }}
                />
                {isOpen && (
                    <Button
                        isIconOnly
                        onClick={handleClose}
                        className="ml-2 p-2 bg-primary text-white rounded-full transition-colors"
                    >
                        <IoMdClose className="text-xl" />
                    </Button>
                )}
            </form>
        </div>
    );
};

export default ExpandableSearch;