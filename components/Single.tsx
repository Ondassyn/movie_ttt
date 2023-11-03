'use client';

import { Person } from '@/types';
import { ACTORS } from '@/utils/actors';
import { OPTIONS } from '@/utils/fetchOptions';
import React, { useEffect, useState } from 'react';
import Board from './Board';

const Single = () => {
  const [data, setData] = useState<Person[]>([]);

  useEffect(() => {
    const fetchMovies = async () => {
      const jsons = await Promise.all(
        ACTORS.slice(200, ACTORS.length).map(async (page) => {
          const response = await fetch(
            `${process.env.NEXT_PUBLIC_TMDB_URL}/person/${page?.id}/movie_credits`,
            OPTIONS
          );
          const json = await response.json();
          return {
            person_id: page?.id,
            movies: json?.cast.map((c: any) => ({
              id: c?.id,
              poster_path: c?.poster_path,
              title: c?.title,
              release_date: c?.release_date,
            })),
          };
        })
      );

      // const response = await fetch(
      //   `${process.env.NEXT_PUBLIC_TMDB_URL}/person/64/movie_credits`,
      //   OPTIONS
      // );
      // const json = await response.json();
      // console.log('json', json);

      console.log('movies', jsons);
    };

    fetchMovies();

    const fetchData = async () => {
      const jsons = await Promise.all<Person[]>(
        Array.from({ length: 100 }, (_, i) => i + 1).map(
          async (page) => {
            const response = await fetch(
              `${process.env.NEXT_PUBLIC_TMDB_URL}/person/popular?page=${page}`,
              OPTIONS
            );
            const json = await response.json();
            return json?.results?.filter(
              (res: Person) => res.known_for[0].vote_count > 5000
            );
          }
        )
      );

      console.log('actors', jsons.flat(1));

      // setData(
      //   jsons
      //     .flat(1)
      //     .sort(() => 0.5 - Math.random())
      //     .slice(0, 6)
      // );
    };

    // fetchData().catch(console.error);
  }, []);

  return (
    <div className="h-screen w-full">
      {/* <Board data={data} /> */}
    </div>
  );
};

export default Single;
