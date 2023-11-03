'use client';

import { Person } from '@/types';
import React, { useState } from 'react';
import BoardCell from './BoardCell';
import DataCell from './DataCell';
import SelectMovieModal from './SelectMovieModal';

const Board = ({ data }: { data: Person[] }) => {
  const [modalOpen, setModalOpen] = useState(false);
  const [indexes, setIndexes] = useState([0, 0]);
  return (
    <div className="w-full h-full grid grid-rows-4 grid-cols-4">
      <div></div>
      {data.slice(0, 4).map((d) => (
        <DataCell key={d?.id} data={d} />
      ))}
      <BoardCell
        indexes={[0, 3]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <BoardCell
        indexes={[1, 3]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <BoardCell
        indexes={[2, 3]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <DataCell data={data[4]} />
      <BoardCell
        indexes={[0, 4]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <BoardCell
        indexes={[1, 4]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <BoardCell
        indexes={[2, 4]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <DataCell data={data[5]} />
      <BoardCell
        indexes={[0, 5]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <BoardCell
        indexes={[1, 5]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <BoardCell
        indexes={[2, 5]}
        setOpen={setModalOpen}
        setIndexes={setIndexes}
      />
      <SelectMovieModal
        open={modalOpen}
        setOpen={setModalOpen}
        names={[data[indexes[0]]?.name, data[indexes[1]]?.name]}
      />
    </div>
  );
};

export default Board;
