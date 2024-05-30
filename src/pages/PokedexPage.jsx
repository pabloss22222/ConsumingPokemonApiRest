import { useEffect, useRef, useState } from 'react'
import { useSelector } from 'react-redux'
import  useFetch from "../hooks/useFetch"
import PokeCard from '../components/PokedexPage/PokeCard'
import SelectType from '../components/PokedexPage/SelectType'
import './styles/PokedexPage.css'
import Pagination from '../components/PokedexPage/Pagination'

const PokedexPage = () => {

  const [searchedName, setSearchedName] = useState('')

  const [typeSelected, setTypeSelected] = useState('allPokemons')

  const trainer= useSelector(states=>states.trainer)

  const [pokemons, getPokemons, getTypePokemon]=useFetch()

  const [currentPage, setCurrentPage] = useState(1)

  const [cardsPerPage, setCardsPerPage] = useState(6)

  const [bandForm, setBandForm] = useState(true)

  const [posInitial, setPosInitial] = useState(0);

  const [contBlock, setContBlock] = useState(1);

  useEffect(()=>{

    if(typeSelected==='allPokemons'){
   
      const url='https://pokeapi.co/api/v2/pokemon?limit=500&offset=0'
      getPokemons(url)
    }else{
      getTypePokemon(typeSelected)
    }
  },[typeSelected])

  const inputName=useRef()

  const handleSearch=e=>{
    e.preventDefault()
    setSearchedName(inputName.current.value.trim().toLowerCase())
  }

  const callbackFilter = poke=>{
     const filterName = poke.name.includes(searchedName)
     return filterName
  }

  const index0fLastCard = currentPage*cardsPerPage;
  const index0fFirstCard = index0fLastCard - cardsPerPage;
  const currentCards = pokemons?.results.filter(callbackFilter).slice(index0fFirstCard, index0fLastCard);
  
  const paginate = (pageNumber) => setCurrentPage(pageNumber)
  
  useEffect(() => {
    if (pokemons && pokemons.results.filter(callbackFilter).length === 0) {
        setBandForm(false);
    } else {
        setBandForm(true); 
    }
  }, [pokemons, callbackFilter, setBandForm]);

  const inputCardPerPage=useRef()
  const handleSubmitNum=e=>{
    e.preventDefault()
    console.log(inputCardPerPage.current.value)
    setCardsPerPage(inputCardPerPage.current.value === '' ? 1 : inputCardPerPage.current.value)
    setPosInitial(0)
  }

  return (
    <div className='container__pokedexpage'>
        <article className='container__poke__rectangular__pk'>
             <section className="rectangulo__red__pk"></section>
             <section className="rectangulo__black__pk"></section>
             <div className='container__circles'>
               <div className="circle__white__pk">
                 <div className="circle__gray__pk"></div>
               </div>
             </div>
             <img className="img__logo__pk" src="./images/imgLogo.png" alt="img" />
        </article>

        <p className="welcome__container">
          <span className="welcome__text1">Welcome {trainer}</span><span className="welcome__text2">, here you will find your favorite pokemon</span> 
        </p>

        <article className="container__form__select-type">
          <form className="form__pk" onSubmit={handleSearch}>
            <input className='input__pk' ref={inputName} type="text" placeholder='Search a pokemon..'/>
            <button className="button__pk" >Search</button>
          </form>
          < SelectType setTypeSelected={setTypeSelected} setPosInitial={setPosInitial} setContBlock={setContBlock} paginate={paginate}/>

          <form onChange={handleSubmitNum} className="form__inputcardperpage">
              <input className="input__cardperpage" ref={inputCardPerPage} max={48} min={1} type='number' placeholder="Card per page"/>
          </form>

        </article> 

        <article className="pagination__container_principal__1">
          {
           bandForm &&<Pagination cardsPerPage={cardsPerPage} 
           totalCards={pokemons?.results.filter(callbackFilter).length} 
           paginate={paginate} posInitial={posInitial} setPosInitial={setPosInitial} 
           contBlock={contBlock} setContBlock={setContBlock}
           />
          }
        </article>

        <article className="pokeCard__container">
            {
              pokemons && pokemons.results.filter(callbackFilter).length ===0
              ? (<h2 className="error_msj">There are no pokemon that meet the filter</h2>)
              : (
                currentCards?.map(poke=> ( <PokeCard poke={poke} key={poke.url}/> ))
              )
            }
        </article>

        <article className="pagination__container__principal">
         {
           bandForm &&<Pagination cardsPerPage={cardsPerPage} 
           totalCards={pokemons?.results.filter(callbackFilter).length} 
           paginate={paginate} posInitial={posInitial} setPosInitial={setPosInitial} 
           contBlock={contBlock} setContBlock={setContBlock}
           />
         }
        </article>
    </div>
  )
}
export default PokedexPage














            {/* {
              pokemons && pokemons.results.filter(callbackFilter).length ===0
              ? <h2>there are no pokemon that meet the filter</h2>
              : (
                pokemons?.results.filter(callbackFilter).map(poke=> ( <PokeCard poke={poke} key={poke.url}/> ))
              )
            } */}