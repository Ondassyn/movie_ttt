'use client';

import { IntersectionData, Person } from '@/types';
import React, { useEffect, useState } from 'react';
import Board from './Board';
import intersections from '@/utils/intersections.json';
import { getRandom } from '@/utils/methods';
import { OPTIONS } from '@/utils/fetchOptions';
import Button from './Button';

const POPULARS_COUNT = 20;

const Single = () => {
  const [verticals, setVerticals] = useState<number[]>([]);
  const [horizontals, setHorizontals] = useState<number[]>([]);

  const [isPlayer1, setIsPlayer1] = useState(true);
  const [winner, setWinner] = useState<number>(0);

  const [vIntersections, setVIntersections] = useState<
    IntersectionData[]
  >([]);
  const [hIntersections, setHIntersections] = useState<
    IntersectionData[]
  >([]);

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

      setVIntersections(topPossibleVerticals);
      setHIntersections(populars);
    }
  }, [verticals]);

  return (
    <div className="h-screen w-full">
      <Button
        onClick={() => {
          setWinner(3);
        }}
      >
        Finish the game
      </Button>
      <Board
        horizontals={horizontals}
        verticals={verticals}
        hIntersections={hIntersections}
        vIntersections={vIntersections}
        isPlayer1={isPlayer1}
        setIsPlayer1={setIsPlayer1}
        winner={winner}
        setWinner={setWinner}
      />
    </div>
  );
};

export default Single;
