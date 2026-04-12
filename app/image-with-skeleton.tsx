"use client";

import Image from "next/image";
import { useState } from "react";
import { Skeleton } from "./skeleton";

export function ImageWithSkeleton({ 
  src, 
  alt, 
  sizes, 
  className = "",
  aspectRatio = "aspect-square",
  priority = false
}: { 
  src: string; 
  alt: string; 
  sizes?: string; 
  className?: string;
  aspectRatio?: string;
  priority?: boolean;
}) {
  const [isLoading, setIsLoading] = useState(true);

  return (
    <div className={`relative w-full h-full overflow-hidden ${aspectRatio}`}>
      {isLoading && <Skeleton className="absolute inset-0 z-10" />}
      <Image
        src={src}
        alt={alt}
        fill
        className={`${className} ${isLoading ? 'opacity-0' : 'opacity-100'} transition-opacity duration-500`}
        sizes={sizes}
        priority={priority}
        onLoad={() => setIsLoading(false)}
      />
    </div>
  );
}
