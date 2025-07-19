import React from 'react'
import { FaStar, FaStarHalfAlt, FaRegStar } from 'react-icons/fa'

export const generateStars = (numOfStars:number):any => { //eslint-disable-line @typescript-eslint/no-explicit-any
  const stars:any[]= []; //eslint-disable-line @typescript-eslint/no-explicit-any
  for (let i = 0; i < Math.floor(numOfStars); i++) {
    stars.push(<FaStar key={i}/>);
  }
  if (numOfStars % 1 !== 0) {
    stars.push(<FaStarHalfAlt key="half" />);
  }
  while (stars.length < 5) {
    stars.push(<FaRegStar key={`empty-${stars.length}`} />);
  }
  return stars;
};