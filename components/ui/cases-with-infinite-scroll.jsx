"use client";

import { useEffect, useState } from "react";
import {
  Carousel,
  CarouselContent,
  CarouselItem,
} from "@/components/ui/carousel";

const DEFAULT_CLIENTS = [
  { name: "PCS", src: "/client-pcs.png" },
  { name: "Jilaba Software", src: "/client-jilaba.png" },
  { name: "Malladi", src: "/client-malladi.png" },
  { name: "Muthukumaran Medical College", src: "/client-muthukumaran.png" },
  { name: "Meenakshi Academy", src: "/client-meenakshi.jpg" },
  { name: "Vani Vidyalaya", src: "/client-vani.png" },
  { name: "SVS", src: "/client-svs.png" },
  { name: "MMCH", src: "/client-mmch.png" },
  { name: "MAHER", src: "/client-maher.png" },
];

function Case({ content }) {
  const [api, setApi] = useState(undefined);
  const [current, setCurrent] = useState(0);

  const clientList = content?.clients && content.clients.length > 0
    ? content.clients.map((c) => (typeof c === "string" ? { name: "", src: c.trim() } : { name: c.name || "", src: c.src.trim() }))
    : DEFAULT_CLIENTS;

  useEffect(() => {
    if (!api) {
      return;
    }

    const timer = setTimeout(() => {
      if (api.selectedScrollSnap() + 1 === api.scrollSnapList().length) {
        setCurrent(0);
        api.scrollTo(0);
      } else {
        api.scrollNext();
        setCurrent(current + 1);
      }
    }, 2000);

    return () => clearTimeout(timer);
  }, [api, current]);

  return (
    <div className="w-full py-12 sm:py-16 lg:py-24 bg-white border-t border-neutral-100">
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col gap-6 sm:gap-8">
          <div className="flex flex-col gap-2.5 sm:gap-3">
            <span className="text-xs uppercase tracking-widest text-[#D71920] font-semibold">
              Trusted Partners
            </span>
            <h2 className="text-2xl sm:text-3xl md:text-4xl lg:text-5xl tracking-tight font-bold text-neutral-900 text-left">
              Trusted by leading businesses &amp; institutions
            </h2>
            <p className="text-xs sm:text-sm md:text-base text-neutral-500 max-w-xl text-left">
              Powering diverse sectors with high-efficiency turnkey solar installations.
            </p>
          </div>
          <Carousel
            setApi={setApi}
            className="w-full"
            opts={{ loop: true, align: "start" }}
          >
            {/* Display 3 logos on mobile view (basis-1/3), perfectly square */}
            <CarouselContent className="-ml-2 sm:-ml-3 md:-ml-4 py-4 sm:py-6 px-1 items-center">
              {clientList.map((client, index) => (
                <CarouselItem
                  className="pl-2 sm:pl-3 md:pl-4 basis-1/3 sm:basis-1/4 md:basis-1/5 lg:basis-1/6 py-1 self-center"
                  key={index}
                >
                  <div className="w-full aspect-square rounded-xl sm:rounded-2xl bg-white border border-neutral-200/80 p-3 sm:p-4 md:p-5 flex items-center justify-center transition-all duration-300 hover:border-red-400 hover:shadow-[0_10px_30px_rgba(215,25,32,0.12)] hover:-translate-y-1 group cursor-pointer overflow-hidden">
                    <div className="w-full h-full flex items-center justify-center p-1">
                      <img
                        src={client.src}
                        alt={client.name || "Client Logo"}
                        className="max-h-full max-w-full w-auto h-auto object-contain transition-transform duration-300 group-hover:scale-105 pointer-events-none select-none"
                        draggable="false"
                      />
                    </div>
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
          </Carousel>
        </div>
      </div>
    </div>
  );
}

export { Case };
