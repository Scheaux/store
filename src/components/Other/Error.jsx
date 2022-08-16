import React from 'react';

function Error({ text = 'Ошибка', action = () => {} }) {
  return (
    <div className='row error-container'>
      <div style={{ color: 'red', fontSize: '2rem' }}>{text}</div>
      <button className='btn btn-outline-primary' onClick={action}>
        Повторить?
      </button>
    </div>
  );
}

export default Error;
