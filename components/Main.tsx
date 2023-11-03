import Link from 'next/link';
import React from 'react';

const Main = () => {
  return (
    <div className="h-screen w-full bg-slate-200">
      <Link href={'/single'}>Single Player</Link>
    </div>
  );
};

export default Main;
