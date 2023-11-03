'use client';

import { Movie } from '@/types';
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
  names,
}: {
  open: boolean;
  setOpen: Dispatch<SetStateAction<boolean>>;
  names: string[];
}) => {
  const [selectedValue, setSelectedValue] = useState();

  const promiseOptions = (inputValue: string) =>
    new Promise<Movie[]>((resolve) => {
      fetch(
        `${process.env.NEXT_PUBLIC_TMDB_URL}/search/movie?query=${inputValue}&include_adult=false`,
        OPTIONS
      )
        .then((res) => res?.json())
        .then((json) =>
          resolve(
            json.results.map((film: Movie) => {
              return {
                value: film,
                label: `${film.title} (${film.release_date.substring(
                  0,
                  4
                )})`,
              };
            })
          )
        )
        .catch((err) => console.log(err));
    });

  useEffect(() => {
    console.log('selectedValue', selectedValue);
  }, [selectedValue]);

  return (
    <Modal open={open} setOpen={setOpen} onSubmit={() => {}}>
      <div className="w-full flex flex-col gap-8 text-gray-900 items-center p-8">
        <div className="text-center whitespace-pre-line">
          Select a movie with{'\n'}
          <span className="font-bold text-lg">
            {names[0]}
          </span> and{' '}
          <span className="font-bold text-lg">{names[1]}</span>
        </div>
        <AsyncSelect
          className="w-full"
          loadOptions={promiseOptions}
          onChange={(e: any) => {}}
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
