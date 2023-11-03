import React, { Dispatch, SetStateAction } from 'react';
import clapper from '@/public/colored_clapper.png';
import Image from 'next/image';

const BoardCell = ({
  setOpen,
  indexes,
  setIndexes,
}: {
  setOpen: Dispatch<SetStateAction<boolean>>;
  setIndexes: Dispatch<SetStateAction<number[]>>;
  indexes: number[];
}) => {
  return (
    <div
      className="flex flex-col justify-center cursor-pointer"
      onClick={() => {
        setIndexes(indexes);
        setOpen(true);
      }}
    >
      <div className="relative h-1/2">
        <Image
          src={clapper}
          alt="clapper"
          fill
          style={{ objectFit: 'contain', opacity: 0.6 }}
        />
      </div>
    </div>
  );
};

export default BoardCell;
