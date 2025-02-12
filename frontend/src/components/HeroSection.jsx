import React, { useState } from 'react'
import { Button } from './ui/button'
import { Search } from 'lucide-react'
import { useDispatch } from 'react-redux';
import { setSearchedQuery } from '@/redux/jobSlice';
import { useNavigate } from 'react-router-dom';

const HeroSection = () => {
    const [query, setQuery] = useState("");
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const searchJobHandler = () => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="text-center px-4">
            <div className="flex flex-col gap-5 my-10">
                {/* Badge */}
                <span className="mx-auto px-4 py-2 rounded-full bg-gray-100 text-[#F83002] font-medium text-sm sm:text-base">
                    No. 1 Job Hunt Website
                </span>

                {/* Heading */}
                <h1 className="text-3xl sm:text-5xl font-bold leading-tight">
                    Search, Apply & <br /> Get Your <span className="text-[#6A38C2]">Dream Jobs</span>
                </h1>

                {/* Description */}
                <p className="text-sm sm:text-base text-gray-700">
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Aliquid aspernatur temporibus nihil tempora dolor!
                </p>

                {/* Search Bar */}
                <div className="flex w-full max-w-md shadow-lg border border-gray-200 pl-3 rounded-full items-center gap-2 mx-auto">
                    <input
                        type="text"
                        placeholder="Find your dream jobs"
                        onChange={(e) => setQuery(e.target.value)}
                        className="outline-none border-none w-full text-sm sm:text-base px-2 py-2"
                    />
                    <Button onClick={searchJobHandler} className="rounded-r-full bg-[#6A38C2]">
                        <Search className="h-5 w-5" />
                    </Button>
                </div>
            </div>
        </div>

    )
}

export default HeroSection