import React, { useState } from 'react';
import './styles/Pagination.css'

const Pagination = ({ cardsPerPage, totalCards, paginate, posInitial, setPosInitial, contBlock, setContBlock}) => {
  const pageNumbers = [];
  const numberOfPages =  Math.ceil(totalCards / cardsPerPage);

  const postFinal=posInitial + 7;
  const numberOfBlocks=Math.ceil(numberOfPages/7);

  for (let i = 1; i <= numberOfPages; i++) {
    pageNumbers.push(i);
  }
  const handleNextPag=()=>{
    if(contBlock<numberOfBlocks) {
      setPosInitial(posInitial+7)
      setContBlock(contBlock+1);
    }
    else{
      setPosInitial(posInitial)
    }
  }
  const handlePrevPag=()=>{
    if(contBlock>1) {
      setPosInitial(posInitial-7)
      setContBlock(contBlock-1);
    }
    else{
      setPosInitial(posInitial)
    }
  }

  return (
    
    <div>
      <br/>
      <nav className="pagination__container">
        <button onClick={handlePrevPag} className='button__next__prev'><i className='bx bx-skip-previous' ></i></button>
        <ul className='pagination'>
          {pageNumbers.slice(posInitial, postFinal).map(number => (
            <li onClick={()=>(paginate(number))} key={number} className='page__item'>
              <a  href='!#/pokedex' className='page__link'>
                {number}
              </a>
            </li>
          ))}
        </ul>
        <button onClick={handleNextPag} className='button__next__prev'> <i className='bx bx-skip-next' ></i> </button>
      
      </nav>
    </div>
  );
};

export default Pagination;