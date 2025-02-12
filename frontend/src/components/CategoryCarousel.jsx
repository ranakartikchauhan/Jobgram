import React from 'react';
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from './ui/carousel';
import { Button } from './ui/button';
import { useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { setSearchedQuery } from '@/redux/jobSlice';

const category = [
    "Frontend Developer",
    "Backend Developer",
    "Data Science",
    "Graphic Designer",
    "FullStack Developer"
]

const CategoryCarousel = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const searchJobHandler = (query) => {
        dispatch(setSearchedQuery(query));
        navigate("/browse");
    }

    return (
        <div className="px-4">
        <Carousel className="w-full max-w-xl mx-auto my-10">
          <CarouselContent className="flex flex-wrap justify-center gap-4">
            {category.map((cat, index) => (
              <CarouselItem key={index} className="flex-none w-full sm:w-1/2 md:w-1/3">
                <Button
                  onClick={() => searchJobHandler(cat)}
                  variant="outline"
                  className="w-full text-sm md:text-base rounded-full"
                >
                  {cat}
                </Button>
              </CarouselItem>
            ))}
          </CarouselContent>
          <CarouselPrevious className="absolute left-0 top-1/2 transform -translate-y-1/2" />
          <CarouselNext className="absolute right-0 top-1/2 transform -translate-y-1/2" />
        </Carousel>
      </div>
      
    )
}

export default CategoryCarousel