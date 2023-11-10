'use client';

import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import clapper from '@/public/colored_clapper.png';
import Image from 'next/image';
import { OPTIONS } from '@/utils/fetchOptions';
import { IntersectionData, Movie } from '@/types';
import {
  QuestionMarkCircleIcon,
  XCircleIcon,
} from '@heroicons/react/24/outline';

const BoardCell = ({
  setOpen,
  cellIndexes,
  setIndexes,
  cellStatus,
  winner,
  horizontals,
  verticals,
  hIntersections,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIndexes: Dispatch<SetStateAction<number[]>>;
  cellIndexes: number[];
  cellStatus: number[][];
  winner: number;
  horizontals: number[];
  verticals: number[];
  hIntersections: IntersectionData[];
}) => {
  const [movie, setMovie] = useState<Movie>();
  const [loaded, setLoaded] = useState(false);
  const [common, setCommon] = useState<Movie[]>();

  useEffect(() => {
    if (cellStatus[cellIndexes[0]][cellIndexes[1]] >= 0) {
      fetch(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${
          cellStatus[cellIndexes[0]][cellIndexes[1]]
        }`,
        OPTIONS
      )
        .then((res) => res?.json())
        .then((json: Movie) => setMovie(json))
        .catch((err) => console.log(err));
    }

    const getCommon = async (ids: number[] | undefined) => {
      if (ids) {
        const jsons = await Promise.all<Movie>(
          ids.map(async (id) => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_TMDB_URL}/movie/${id}`,
              OPTIONS
            );
            const json = await response.json();
            return json;
          })
        );

        console.log('common', jsons);
        setCommon(jsons);
      }
    };

    if (cellStatus[cellIndexes[0]][cellIndexes[1]] === -3) {
      const temp = hIntersections
        .find((hi) => hi?.person_id === horizontals[cellIndexes[0]])
        ?.intersections?.find(
          (i) => i?.person_id === verticals[cellIndexes[1]]
        )?.common;

      getCommon(temp);
    }
  }, [cellStatus]);

  useEffect(() => {
    console.log('movie', movie);
  }, [movie]);

  return (
    <div
      className="flex flex-col justify-center cursor-pointer"
      onClick={() => {
        if (
          winner ||
          cellStatus[cellIndexes[0]][cellIndexes[1]] >= 0
        ) {
          return;
        }
        setIndexes(cellIndexes);
        setOpen(true);
      }}
    >
      {cellStatus[cellIndexes[0]][cellIndexes[1]] === -1 ? (
        <div className="flex flex-col justify-center items-center">
          {/* <Image
            src={clapper}
            alt="clapper"
            fill
            style={{ objectFit: 'contain', opacity: 0.6 }}
          /> */}
          <QuestionMarkCircleIcon className="h-1/3 text-slate-500" />
        </div>
      ) : cellStatus[cellIndexes[0]][cellIndexes[1]] === -2 ? (
        <div className="flex flex-col items-center justify-center">
          <XCircleIcon className="h-1/3 text-red-500" />
        </div>
      ) : cellStatus[cellIndexes[0]][cellIndexes[1]] === -3 ? (
        <div className="flex flex-col items-center justify-center">
          {common?.map((c) => (
            <div key={c?.id} className="text-center">
              {`${c?.title} (${c?.release_date?.substring(0, 4)})`}
            </div>
          ))}
        </div>
      ) : (
        <div className="h-full">
          {movie && (
            <div className="flex flex-col gap-2 items-center h-full">
              <div className="relative h-full w-1/2">
                <Image
                  src={`${process.env.NEXT_PUBLIC_TMDB_IMAGES_URL}/w400${movie?.poster_path}`}
                  alt="image"
                  fill
                  style={{ objectFit: 'cover' }}
                  onLoadingComplete={() => setLoaded(true)}
                  className="rounded-xl"
                />
              </div>

              <div className="text-center text-xl">
                {movie?.title}
              </div>
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default BoardCell;
