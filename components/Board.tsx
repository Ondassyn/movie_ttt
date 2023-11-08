'use client';

import { Person } from '@/types';
import { ACTORS } from '@/utils/actors';
import React, { useEffect, useState } from 'react';
import BoardCell from './BoardCell';
import DataCell from './DataCell';
import SelectMovieModal from './SelectMovieModal';

const Board = ({
  horizontals,
  verticals,
}: {
  horizontals: number[];
  verticals: number[];
}) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [indexes, setIndexes] = useState([0, 0]);
  useEffect(() => {
    console.log('horizontals', horizontals);
  }, []);
  return (
    <div className="w-full h-full grid grid-rows-4 grid-cols-4">
      <div></div>
      {horizontals.map((h) => (
        <DataCell key={h} data={ACTORS.find((a) => a?.id === h)} />
      ))}
      <DataCell data={ACTORS.find((a) => a?.id === verticals[0])} />
      <BoardCell
        indexes={[0, 0]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <BoardCell
        indexes={[1, 0]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <BoardCell
        indexes={[2, 0]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <DataCell data={ACTORS.find((a) => a?.id === verticals[1])} />
      <BoardCell
        indexes={[0, 1]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <BoardCell
        indexes={[1, 1]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <BoardCell
        indexes={[2, 1]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <DataCell data={ACTORS.find((a) => a?.id === verticals[2])} />
      <BoardCell
        indexes={[0, 2]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <BoardCell
        indexes={[1, 2]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <BoardCell
        indexes={[2, 2]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <SelectMovieModal
        open={modalOpen}
        setOpen={setModalOpen}
        names={[
          ACTORS.find((a) => a?.id === horizontals[indexes[0]])?.name,
          ACTORS.find((a) => a?.id === verticals[indexes[1]])?.name,
        ]}
      />
    </div>
  );
};

export default Board;
