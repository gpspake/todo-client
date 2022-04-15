import React from 'react';
import { faCircleNotch } from '@fortawesome/free-solid-svg-icons';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

export const Loading = () => (
  <div className='block flex align-items-center mt-5'>
    <span className='fa-fw fa-3x block m-auto group'>
      <FontAwesomeIcon
        icon={faCircleNotch}
        spin
        className='text-teal-500 transition-all duration-200 ease-in-out group-hover:text-teal-600'
      />
    </span>
  </div>
);
