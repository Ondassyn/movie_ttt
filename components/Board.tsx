'use client';

import { IntersectionData } from '@/types';
import { ACTORS } from '@/utils/actors';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import BoardCell from './BoardCell';
import DataCell from './DataCell';
import SelectMovieModal from './SelectMovieModal';

const Board = ({
  horizontals,
  verticals,
  hIntersections,
  vIntersections,
  isPlayer1,
  setIsPlayer1,
  winner,
  setWinner,
}: {
  horizontals: number[];
  verticals: number[];
  hIntersections: IntersectionData[];
  vIntersections: IntersectionData[];
  isPlayer1: boolean;
  setIsPlayer1: Dispatch<SetStateAction<boolean>>;
  winner: number;
  setWinner: Dispatch<SetStateAction<number>>;
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [indexes, setIndexes] = useState([0, 0]);
  const [cellStatus, setCellStatus] = useState<number[][]>([
    [-1, -1, -1],
    [-1, -1, -1],
    [-1, -1, -1],
  ]);

  const [board, setBoard] = useState([
    [0, 0, 0],
    [0, 0, 0],
    [0, 0, 0],
  ]);

  const hasWinner = (): boolean => {
    for (let row of board) {
      if (!row.includes(0)) {
        if (row[0] === row[1] && row[1] === row[2]) {
          return true;
        }
      }
    }
    for (let i = 0; i < 3; i++) {
      if (
        board[0][i] === board[1][i] &&
        board[1][i] === board[2][i] &&
        board[0][i] !== 0
      ) {
        return true;
      }
    }
    if (
      board[0][0] !== 0 &&
      board[0][0] === board[1][1] &&
      board[2][2] === board[2][2]
    ) {
      return true;
    }
    if (
      board[0][2] !== 0 &&
      board[0][2] === board[1][1] &&
      board[1][1] === board[2][0]
    ) {
      return true;
    }
    return false;
  };

  useEffect(() => {
    if (winner === 3) {
      setCellStatus((prev) => {
        let temp = prev.map((p) => p.slice());
        for (let i = 0; i < 3; i++) {
          for (let j = 0; j < 3; j++) {
            if (temp[i][j] < 0) {
              temp[i][j] = -3;
            }
          }
        }
        return temp;
      });
    }
  }, [winner]);

  return (
    <div className="w-full h-full">
      {horizontals?.length ? (
        <div className="w-full h-full grid grid-rows-4 grid-cols-4">
          <div></div>
          {horizontals.map((h) => (
            <DataCell
              key={h}
              data={ACTORS.find((a) => a?.id === h)}
            />
          ))}
          <DataCell
            data={ACTORS.find((a) => a?.id === verticals[0])}
          />
          <BoardCell
            cellIndexes={[0, 0]}
            setOpen={setModalOpen}
            setIndexes={setIndexes}
            cellStatus={cellStatus}
            winner={winner}
            hIntersections={hIntersections}
            verticals={verticals}
            horizontals={horizontals}
          />
          <BoardCell
            cellIndexes={[1, 0]}
            setOpen={setModalOpen}
            setIndexes={setIndexes}
            cellStatus={cellStatus}
            winner={winner}
            hIntersections={hIntersections}
            verticals={verticals}
            horizontals={horizontals}
          />
          <BoardCell
            cellIndexes={[2, 0]}
            setOpen={setModalOpen}
            setIndexes={setIndexes}
            cellStatus={cellStatus}
            winner={winner}
            hIntersections={hIntersections}
            verticals={verticals}
            horizontals={horizontals}
          />
          <DataCell
            data={ACTORS.find((a) => a?.id === verticals[1])}
          />
          <BoardCell
            cellIndexes={[0, 1]}
            setOpen={setModalOpen}
            setIndexes={setIndexes}
            cellStatus={cellStatus}
            winner={winner}
            hIntersections={hIntersections}
            verticals={verticals}
            horizontals={horizontals}
          />
          <BoardCell
            cellIndexes={[1, 1]}
            setOpen={setModalOpen}
            setIndexes={setIndexes}
            cellStatus={cellStatus}
            winner={winner}
            hIntersections={hIntersections}
            verticals={verticals}
            horizontals={horizontals}
          />
          <BoardCell
            cellIndexes={[2, 1]}
            setOpen={setModalOpen}
            setIndexes={setIndexes}
            cellStatus={cellStatus}
            winner={winner}
            hIntersections={hIntersections}
            verticals={verticals}
            horizontals={horizontals}
          />
          <DataCell
            data={ACTORS.find((a) => a?.id === verticals[2])}
          />
          <BoardCell
            cellIndexes={[0, 2]}
            setOpen={setModalOpen}
            setIndexes={setIndexes}
            cellStatus={cellStatus}
            winner={winner}
            hIntersections={hIntersections}
            verticals={verticals}
            horizontals={horizontals}
          />
          <BoardCell
            cellIndexes={[1, 2]}
            setOpen={setModalOpen}
            setIndexes={setIndexes}
            cellStatus={cellStatus}
            winner={winner}
            hIntersections={hIntersections}
            verticals={verticals}
            horizontals={horizontals}
          />
          <BoardCell
            cellIndexes={[2, 2]}
            setOpen={setModalOpen}
            setIndexes={setIndexes}
            cellStatus={cellStatus}
            winner={winner}
            hIntersections={hIntersections}
            verticals={verticals}
            horizontals={horizontals}
          />
          <SelectMovieModal
            open={modalOpen}
            setOpen={setModalOpen}
            indexes={indexes}
            horizontals={horizontals}
            verticals={verticals}
            hIntersections={hIntersections}
            vIntersections={vIntersections}
            setCellStatus={setCellStatus}
            setBoard={setBoard}
            isPlayer1={isPlayer1}
            setIsPlayer1={setIsPlayer1}
            hasWinner={hasWinner}
            setWinner={setWinner}
          />
        </div>
      ) : (
        <div></div>
      )}
    </div>
  );
};

export default Board;
