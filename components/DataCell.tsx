'use client';

import { Person } from '@/types';
import { COLORS } from '@/utils/colors';
import Image from 'next/image';
import React, { useEffect, useState } from 'react';

const DataCell = ({ data }: { data: Person }) => {
  const [loaded, setLoaded] = useState(false);

  useEffect(() => {
    console.log('data', data);
  }, [data]);

  return (
    <div className="flex flex-col items-center justify-center py-2">
      <div
        className={`relative w-1/2 h-full`}
        style={{
          perspective: '1000px',
          cursor: 'pointer',
          opacity: loaded ? 1 : 0,
          transition: 'opacity 1s',
        }}
      >
        <div
          style={{
            width: '100%',
            height: '100%',
            transformStyle: 'preserve-3d',
            transition: 'transform 2s',
            transform: loaded ? 'rotateY(180deg)' : 'rotateY(0deg)',
          }}
        >
          <div
            className="absolute w-full h-full rounded-lg"
            style={{
              backfaceVisibility: 'hidden',
              transform: 'rotateY(180deg)',
            }}
          >
            <Image
              src={`${process.env.NEXT_PUBLIC_TMDB_IMAGES_URL}/w400${data?.profile_path}`}
              alt="image"
              fill
              style={{ objectFit: 'cover' }}
              onLoadingComplete={() => setLoaded(true)}
              className="rounded-xl"
            />
          </div>

          <div
            className="absolute w-full h-full rounded-lg"
            style={{
              backfaceVisibility: 'hidden',
              backgroundColor:
                COLORS[Math.floor(Math.random() * COLORS.length)],
            }}
          >
            <div className="w-full h-full">
              {/* Place your content for the back side here */}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default DataCell;
