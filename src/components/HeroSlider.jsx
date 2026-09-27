import { useState, useEffect } from 'react';

export default function HeroSlider({ slides, onViewDetails }) {
  const [index, setIndex] = useState(0);

  useEffect(() => {
    if (slides.length < 2) return;
    const timer = setInterval(() => {
      setIndex((i) => (i + 1) % slides.length);
    }, 4500);
    return () => clearInterval(timer);
  }, [slides.length]);

  if (slides.length === 0) return null;

  function goTo(i) {
    setIndex((i + slides.length) % slides.length);
  }

  const slide = slides[index];

  return (
    <div className="hero-slider">
      <button
        className="hero-slide"
        onClick={() => onViewDetails(slide)}
        style={{ backgroundImage: `url(${slide.strMealThumb})` }}
      >
        <div className="hero-overlay">
          <span className="hero-eyebrow">Featured Recipe</span>
          <h2>{slide.strMeal}</h2>
        </div>
      </button>

      <button className="hero-arrow hero-arrow-left" onClick={() => goTo(index - 1)} aria-label="Previous">
        ‹
      </button>
      <button className="hero-arrow hero-arrow-right" onClick={() => goTo(index + 1)} aria-label="Next">
        ›
      </button>

      <div className="hero-dots">
        {slides.map((s, i) => (
          <button
            key={s.idMeal}
            className={`hero-dot ${i === index ? 'active' : ''}`}
            onClick={() => goTo(i)}
            aria-label={`Go to slide ${i + 1}`}
          />
        ))}
      </div>
    </div>
  );
}
