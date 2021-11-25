import React, { useState, useEffect } from 'react';
import ReactDom from 'react-dom';
import './index.css';
import { data } from './data';
import { AiOutlineArrowRight, AiOutlineArrowLeft } from 'react-icons/ai';

const App = () => {
  const [showImages, setShowImages] = useState(data);
  const [index, setIndex] = useState(1);

  useEffect(() => {
    const lastPosition = showImages.length - 1;
    if (index < 0) {
      return setIndex(lastPosition);
    }
    if (index > lastPosition) {
      return setIndex(0);
    }
  }, [showImages, index]);

  // autoplay
  useEffect(() => {
    const slide = setInterval(() => {
      setIndex(index + 1);
    }, 3000);
    return () => {
      clearInterval(slide);
    };
  });
  return (
    <section className='section'>
      <div className='title'>
        <h2>Gallery</h2>
      </div>
      <div className='section-center'>
        {showImages.map((images, imageIndex) => {
          const { id, name, img } = images;

          // checkPosition
          let position = 'nextSlide';

          if (imageIndex === index) {
            position = 'activeSlide';
          }
          if (
            imageIndex === index - 1 ||
            (index === 0 && imageIndex === showImages.length - 1)
          ) {
            position = 'lastSlide';
          }
          return (
            <article key={id} className={position}>
              <a href={img}>
                <img src={img} alt='' className='img-photo' />
                <p>{name}</p>
              </a>
            </article>
          );
        })}
        <button className='prev' onClick={() => setIndex(index - 1)}>
          <AiOutlineArrowLeft />
        </button>
        <button className='next' onClick={() => setIndex(index + 1)}>
          <AiOutlineArrowRight />
        </button>
      </div>
    </section>
  );
};

ReactDom.render(<App />, document.getElementById('root'));
