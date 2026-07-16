import React, { useState, useEffect, useRef } from "react";
import { createClient } from "@sanity/client";

const client = createClient({
  projectId: "xcirvmf4",
  dataset: "production",
  useCdn: false, 
  apiVersion: "2022-03-07", 
});

export default function Gallery() {
  const [shoots, setShoots] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [activeShoot, setActiveShoot] = useState(null);
  const [zoomedIndex, setZoomedIndex] = useState(null);

  const modalRef = useRef(null);
  const trackRef = useRef(null);
  const zoomContainerRef = useRef(null);

  useEffect(() => {
    // The coalesce function ensures unnumbered projects default to 999 so nothing crashes
    const query = `*[_type == "shoot"] | order(coalesce(displayOrder, 999) asc) {
      _id,
      title,
      description,
      positionClass,
      "coverImage": {
        "asset": coverImage.asset->,
        "hotspot": coverImage.hotspot
      },
      "coverImageUrl": coverImage.asset->url,
      "galleryImages": allImages[].asset->url
    }`;

    client
      .fetch(query)
      .then((data) => {
        setShoots(data || []);
        setLoading(false);
      })
      .catch((err) => {
        console.error("Sanity connection error:", err);
        setError(err.message);
        setLoading(false);
      });
  }, []);

  useEffect(() => {
    if (activeShoot && modalRef.current && zoomedIndex === null) {
      modalRef.current.focus();
    }
  }, [activeShoot, zoomedIndex]);

  useEffect(() => {
    if (zoomedIndex !== null && zoomContainerRef.current) {
      zoomContainerRef.current.focus();
    }
  }, [zoomedIndex]);

  const navigateZoomNext = () => {
    if (!activeShoot?.galleryImages) return;
    if (zoomedIndex < activeShoot.galleryImages.length - 1) {
      setZoomedIndex(zoomedIndex + 1);
    }
  };

  const navigateZoomPrev = () => {
    if (zoomedIndex > 0) {
      setZoomedIndex(zoomedIndex - 1);
    }
  };

  const handleKeyDown = (e) => {
    if (zoomedIndex !== null) {
      if (e.key === "ArrowRight") {
        e.preventDefault();
        navigateZoomNext();
      } else if (e.key === "ArrowLeft") {
        e.preventDefault();
        navigateZoomPrev();
      } else if (e.key === "Escape") {
        e.preventDefault();
        setZoomedIndex(null);
      }
      return; 
    }

    if (!trackRef.current) return;
    const scrollAmount = 400; 
    if (e.key === "ArrowRight") {
      trackRef.current.scrollBy({ left: scrollAmount, behavior: "smooth" });
    } else if (e.key === "ArrowLeft") {
      trackRef.current.scrollBy({ left: -scrollAmount, behavior: "smooth" });
    } else if (e.key === "Escape") {
      setActiveShoot(null);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center text-neutral-400 bg-black w-full min-h-screen">
        <p className="animate-pulse tracking-widest text-sm">LOADING ASSETS...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex flex-col justify-center items-center text-red-400 gap-2 bg-black w-full min-h-screen p-4 text-center">
        <p className="tracking-widest text-sm font-semibold">CONNECTION ERROR</p>
        <p className="text-xs text-neutral-400 max-w-md">{error}</p>
      </div>
    );
  }

  if (shoots.length === 0) {
    return (
      <div className="flex flex-col justify-center items-center text-neutral-400 gap-2 bg-black w-full min-h-screen">
        <p className="tracking-widest text-sm font-light">NO PUBLISHED SHOOTS FOUND</p>
      </div>
    );
  }

  return (
    <div className="w-full min-h-screen bg-black text-white px-4 md:px-12 py-12">
      <div className="max-w-7xl mx-auto grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 gap-4">
        {shoots.map((shoot) => (
          <div 
            key={shoot._id} 
            onClick={() => setActiveShoot(shoot)}
            className="group relative aspect-square bg-neutral-900 overflow-hidden cursor-pointer"
          >
            {shoot.coverImageUrl && (
              <img 
                src={shoot.coverImageUrl} 
                alt={shoot.title}
                style={{
                  objectPosition: (shoot.coverImage && shoot.coverImage.hotspot) 
                    ? `${shoot.coverImage.hotspot.x * 100}% ${shoot.coverImage.hotspot.y * 100}%` 
                    : "center"
                }}
                className={`w-full h-full object-cover transition-transform duration-500 group-hover:scale-105 ${shoot.positionClass || "object-center"}`}
              />
            )}
            <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity duration-300 flex items-center justify-center p-4">
              <div className="text-center">
                <h3 className="text-sm font-light tracking-wider uppercase border-b border-white/40 pb-1 inline-block">
                  {shoot.title}
                </h3>
              </div>
            </div>
          </div>
        ))}
      </div>

      {activeShoot && (
        <div 
          ref={modalRef}
          tabIndex={0} 
          onKeyDown={handleKeyDown} 
          onClick={() => setActiveShoot(null)} 
          className="fixed inset-0 bg-black/95 z-50 flex flex-col justify-between py-6 backdrop-blur-sm outline-none animate-fade-in"
        >
          <div className="w-full max-w-4xl mx-auto px-6 flex justify-between items-start z-10">
            <div className="text-left max-w-xl">
              <h2 className="text-lg font-light tracking-widest uppercase text-neutral-200">{activeShoot.title}</h2>
              {activeShoot.description && (
                <p className="text-xs text-neutral-400 font-light tracking-wide leading-relaxed mt-2 max-h-16 overflow-y-auto pr-2"
                  style={{ whiteSpace: "pre-line" }}
                  >
                  {activeShoot.description}
                </p>
              )}
            </div>
            <button 
              onClick={() => setActiveShoot(null)} 
              className="text-neutral-400 hover:text-white text-4xl font-extralight transition-colors leading-none ml-4"
            >
              &times;
            </button>
          </div>

          <div 
            ref={trackRef}
            className="w-full my-auto overflow-x-auto no-scrollbar flex items-center snap-x snap-mandatory px-[10vw] md:px-[25vw] gap-8 py-4"
          >
            {activeShoot.galleryImages?.map((url, index) => (
              url && (
                <div 
                  key={index} 
                  onClick={(e) => {
                    e.stopPropagation(); 
                    setZoomedIndex(index); 
                  }}
                  className="flex-shrink-0 h-[60vh] md:h-[65vh] aspect-[2/3] sm:aspect-auto flex justify-center items-center snap-center bg-neutral-950/40 rounded shadow-2xl overflow-hidden cursor-zoom-in transition-transform duration-300 hover:scale-[1.01]"
                >
                  <img 
                    src={url} 
                    alt={`Gallery asset ${index + 1}`} 
                    className="h-full w-full object-contain select-none pointer-events-none" 
                  />
                </div>
              )
            ))}
          </div>

          <div className="text-center text-[10px] tracking-widest text-neutral-500 uppercase select-none pb-2">
            ← Use ← / → arrow keys to navigate • Click an image to zoom →
          </div>
        </div>
      )}

      {zoomedIndex !== null && activeShoot?.galleryImages?.[zoomedIndex] && (
        <div 
          ref={zoomContainerRef}
          tabIndex={0}
          onKeyDown={handleKeyDown}
          onClick={() => setZoomedIndex(null)}
          className="fixed inset-0 bg-black z-[60] flex items-center justify-center p-4 cursor-zoom-out outline-none animate-fade-in"
        >
          <button 
            onClick={() => setZoomedIndex(null)}
            className="absolute top-6 right-8 text-neutral-400 hover:text-white text-4xl font-extralight transition-colors z-30"
          >
            &times;
          </button>
          
          {zoomedIndex > 0 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateZoomPrev();
              }}
              className="absolute left-6 top-1/2 -translate-y-1/2 bg-neutral-900/40 hover:bg-neutral-800/70 text-white border border-neutral-700/30 text-2xl font-light w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer z-20 select-none"
            >
              &#8249;
            </button>
          )}

          <img 
            src={activeShoot.galleryImages[zoomedIndex]} 
            alt="Zoomed detailed gallery view" 
            className="max-w-full max-h-screen object-contain select-none shadow-2xl pointer-events-none"
          />

          {zoomedIndex < activeShoot.galleryImages.length - 1 && (
            <button
              onClick={(e) => {
                e.stopPropagation();
                navigateZoomNext();
              }}
              className="absolute right-6 top-1/2 -translate-y-1/2 bg-neutral-900/40 hover:bg-neutral-800/70 text-white border border-neutral-700/30 text-2xl font-light w-12 h-12 rounded-full flex items-center justify-center backdrop-blur-md transition-all cursor-pointer z-20 select-none"
            >
              &#8250;
            </button>
          )}
        </div>
      )}
    </div>
  );
}