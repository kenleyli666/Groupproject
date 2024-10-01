import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const pics = [
  { src: '/images/dog.jpeg', alt: 'Dog', name: 'dog' },
  { src: '/images/girl.jpeg', alt: 'Girl', name: 'girl' },
  { src: '/images/pig.jpeg', alt: 'Pig', name: 'pig' }
];

const Product1 = () => {
  const [currentIndex, setCurrentIndex] = useState(0);

  useEffect(() => {
    const interval = setInterval(() => {
      setCurrentIndex((prevIndex) => (prevIndex + 1) % pics.length);
    }, 800);

    return () => clearInterval(interval);
  }, [pics.length]);

  return (
    <div>
      <Image
        src={pics[currentIndex].src}
        alt={pics[currentIndex].alt}
        width={500}
        height={500}
        style={{width:'100%', height:'100vh'}}
      />
    </div>
  );
};

export default Product1;
