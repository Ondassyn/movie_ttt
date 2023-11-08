'use client';

import { Person } from '@/types';
import { ACTORS } from '@/utils/actors';
import { OPTIONS } from '@/utils/fetchOptions';
import React from 'react';
import movies from '../utils/movies.json';

const DataCenter = () => {
  const getActors = async () => {
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
  };

  const getMovies = async () => {
    const jsons = await Promise.all(
      ACTORS.map(async (page) => {
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
    console.log('movies', jsons);
  };

  const generateIntersections = () => {
    const final = [];
    for (let sd of movies) {
      const table = new Map();
      const arr = [];
      for (let ssd of movies) {
        if (ssd === sd) continue;

        let commonMovies = [];
        for (let m of sd?.movies) {
          for (let mm of ssd?.movies) {
            if (m?.id === mm?.id) {
              commonMovies.push(m?.id);
            }
          }
        }
        if (commonMovies?.length)
          arr.push({
            person_id: ssd?.person_id,
            common: commonMovies,
          });
      }
      arr.sort((a, b) => b?.common?.length - a?.common?.length);
      final.push({ person_id: sd?.person_id, intersections: arr });
    }

    final.sort(
      (a, b) => b?.intersections?.length - a?.intersections?.length
    );

    console.log('final', final);
  };
  return (
    <div className="flex flex-col gap-2 items-center py-4">
      <button
        onClick={getActors}
        className="bg-red-500 rounded-lg p-2"
      >
        GENERATE ACTORS
      </button>
      <button
        onClick={getMovies}
        className="bg-red-500 rounded-lg p-2"
      >
        GENERATE MOVIES
      </button>

      <button
        onClick={generateIntersections}
        className="bg-red-500 rounded-lg p-2"
      >
        GENERATE INTERSECTIONS
      </button>
    </div>
  );
};

export default DataCenter;
