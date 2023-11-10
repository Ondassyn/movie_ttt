'use client';

import { IntersectionData, Movie } from '@/types';
import { ACTORS } from '@/utils/actors';
import { OPTIONS } from '@/utils/fetchOptions';
import React, {
  Dispatch,
  SetStateAction,
  useEffect,
  useState,
} from 'react';
import AsyncSelect from 'react-select/async';
import Modal from './Modal';

const SelectMovieModal = ({
  open,
  setOpen,
  indexes,
  horizontals,
  verticals,
  hIntersections,
  vIntersections,
  setCellStatus,
  setBoard,
  isPlayer1,
  setIsPlayer1,
  hasWinner,
  setWinner,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  setBoard: Dispatch<SetStateAction<number[][]>>;
  setIsPlayer1: Dispatch<SetStateAction<boolean>>;
  setCellStatus: Dispatch<SetStateAction<number[][]>>;
  indexes: number[];
  horizontals: number[];
  verticals: number[];
  hIntersections: IntersectionData[];
  vIntersections: IntersectionData[];
  isPlayer1: boolean;
  hasWinner: () => boolean;
  setWinner: Dispatch<SetStateAction<number>>;
}) => {
  const [selectedValue, setSelectedValue] = useState();
  const [common, setCommon] = useState<number[] | undefined>([]);

  const promiseOptions = (inputValue: string) =>
    new Promise<Movie[]>((resolve) => {
      fetch(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/search/movie?query=${inputValue}&include_adult=false&language=en-US&page=1`,
        OPTIONS
      )
        .then((res) => res?.json())
        .then((json) =>
          resolve(
            json.results.map((film: Movie) => {
              return {
                value: film,
                label: `${film.title} (${
                  film?.release_date &&
                  film.release_date.substring(0, 4)
                })`,
              };
            })
          )
        )
        .catch((err) => console.log(err));
    });

  useEffect(() => {
    console.log('selectedValue', selectedValue);
  }, [selectedValue]);

  useEffect(() => {
    if (open) {
      const temp = hIntersections
        .find((hi) => hi?.person_id === horizontals[indexes[0]])
        ?.intersections?.find(
          (i) => i?.person_id === verticals[indexes[1]]
        )?.common;
      console.log('temp', temp);
      setCommon(temp);
    }
  }, [open]);

  return (
    <Modal open={open} setOpen={setOpen} onSubmit={() => {}}>
      <div className=" w-full flex flex-col gap-8 text-gray-900 items-center p-8">
        <div className="text-center whitespace-pre-line">
          Select a movie with{'\n'}
          <span className="font-bold text-lg">
            {
              ACTORS.find((a) => a?.id === horizontals[indexes[0]])
                ?.name
            }
          </span>{' '}
          and{' '}
          <span className="font-bold text-lg">
            {
              ACTORS.find((a) => a?.id === verticals[indexes[1]])
                ?.name
            }
          </span>
        </div>
        <AsyncSelect
          className="w-full"
          loadOptions={promiseOptions}
          onChange={(e: any) => {
            console.log('e', e);
            if (common?.includes(e?.value?.id)) {
              setCellStatus((prev) => {
                let temp = prev.map((p) => p.slice());
                temp[indexes[0]][indexes[1]] = e?.value?.id;
                return temp;
              });
              setBoard((prev) => {
                let temp = prev.map((p) => p.slice());
                temp[indexes[0]][indexes[1]] = isPlayer1 ? 1 : 2;
                return temp;
              });
              if (hasWinner()) {
                setWinner(isPlayer1 ? 1 : 2);
              }
            } else {
              setCellStatus((prev) => {
                let temp = prev.map((p) => p.slice());
                temp[indexes[0]][indexes[1]] = -2;
                return temp;
              });
            }
            setIsPlayer1((prev) => !prev);
            setOpen(false);
          }}
          placeholder="Start typing..."
          //   isDisabled={result}
          // theme={(theme) => ({
          //   ...theme,
          //   colors: {
          //     ...theme.colors,
          //     primary: '#f97316',
          //     primary75: '#fb923c',
          //     primary50: '#fdba74',
          //     primary25: '#f97316',
          //     neutral0: '#111827',
          //     neutral5: '',
          //     neutral10: '',
          //     neutral20: '',
          //     neutral30: '',
          //     neutral40: '',
          //     neutral50: '',
          //     neutral60: '',
          //     neutral70: '',
          //     neutral80: '',
          //     neutral90: '',
          //   },
          // })}
        />
      </div>
    </Modal>
  );
};

export default SelectMovieModal;
