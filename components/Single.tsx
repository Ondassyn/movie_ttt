'use client';

import { Person } from '@/types';
import React, { useEffect, useState } from 'react';
import Board from './Board';
import intersections from '@/utils/intersections.json';
import { getRandom } from '@/utils/methods';

const POPULARS_COUNT = 20;

interface IntersectionData {
  person_id: number;
  intersections: Intersection[];
}
interface Intersection {
  person_id: number;
  common: number[];
}

const Single = () => {
  const [verticals, setVerticals] = useState<number[]>([]);
  const [horizontals, setHorizontals] = useState<number[]>([]);

  useEffect(() => {
    if (!verticals?.length) {
      const intersectionsData: IntersectionData[] = intersections;

      const populars = intersectionsData.slice(0, POPULARS_COUNT);
      const randomHNumbers: number[] = [];
      for (let i = 0; i < 3; i++) {
        let rand: number = getRandom(POPULARS_COUNT - 1);
        while (randomHNumbers.some((rn) => rn === rand)) {
          rand = getRandom(POPULARS_COUNT - 1);
        }
        randomHNumbers.push(rand);
      }

      const possibleVerticals: number[] = [];
      for (let i of populars[randomHNumbers[0]]?.intersections) {
        if (
          populars[randomHNumbers[1]]?.intersections?.some(
            (ii) => ii?.person_id === i?.person_id
          ) &&
          populars[randomHNumbers[2]]?.intersections?.some(
            (ii) => ii?.person_id === i?.person_id
          )
        ) {
          possibleVerticals.push(i?.person_id);
        }
      }
      console.log('possibleVerticals', possibleVerticals);
      const topPossibleVerticals: IntersectionData[] = [];

      for (let i of intersectionsData) {
        if (possibleVerticals.some((pv) => pv === i?.person_id)) {
          topPossibleVerticals.push(i);
        }
        if (topPossibleVerticals?.length === POPULARS_COUNT) {
          break;
        }
      }

      const randomVNumbers: number[] = [];
      for (let i = 0; i < 3; i++) {
        let rand: number = getRandom(POPULARS_COUNT - 1);
        while (randomVNumbers.some((rn) => rn === rand)) {
          rand = getRandom(POPULARS_COUNT - 1);
        }
        randomVNumbers.push(rand);
      }

      setHorizontals([
        populars[randomHNumbers[0]]?.person_id,
        populars[randomHNumbers[1]]?.person_id,
        populars[randomHNumbers[2]]?.person_id,
      ]);
      setVerticals([
        topPossibleVerticals[randomVNumbers[0]]?.person_id,
        topPossibleVerticals[randomVNumbers[1]]?.person_id,
        topPossibleVerticals[randomVNumbers[2]]?.person_id,
      ]);
    }
  }, [verticals]);

  return (
    <div className="h-screen w-full">
      <Board horizontals={horizontals} verticals={verticals} />
    </div>
  );
};

export default Single;
