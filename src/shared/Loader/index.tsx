import React from 'react';
import {Spinner} from "@nextui-org/spinner";

const Loader = () => {
  return (
    <div className='flex h-screen items-center justify-center'>
      <Spinner size='lg' className='text-primary'/>
    </div>
  );
}

export default Loader;
