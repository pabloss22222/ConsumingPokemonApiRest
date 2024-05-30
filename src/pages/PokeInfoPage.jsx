import React, { useEffect } from 'react'
import { useParams } from 'react-router-dom'
import useFetch from '../hooks/useFetch'
import './styles/PokeInfoPage.css'

const PokeInfoPage = () => {

  const {name}= useParams()

  const [pokemon, getPokemon]= useFetch()

  useEffect(()=>{
    const url=`https://pokeapi.co/api/v2/pokemon/${name}`
    getPokemon(url)

  },[name]);

  return (
    <div className="container__pokeinfopage">
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
      
      <article className='container__poke__infopage'>
         <header className={`poke__header__infopage bg__${pokemon?.types[0].type.name}`}>
            <img className="img__poke" src={pokemon?.sprites.other['official-artwork'].front_default} alt=""/>
         </header>
         <section className="poke__body">
            <h2 className="poke__id__infopage">#{pokemon?.id}</h2>
            <article className='container__name'>
              <h2 className="poke__name__infopage">{pokemon?.name}</h2>
            </article>
            <article className="container__weight__height">
                 <ul className="poke__weigth__infopage">
                     <li className="poke__weight">Weight</li>
                     <li className="poke__weight__value">{pokemon?.weight}</li>
                 </ul>
                 <ul className="poke__height__infopage">
                     <li className="poke__weight">Height</li>
                     <li className="poke__weight__value">{pokemon?.height}</li>

                 </ul>
            </article>

            <hr className='hr__info'/>
            <article className="container__types__skills">
              <section className="container__types__info">
                <h3 className="title__h3">Type</h3>
                <div className="container__p2">
                  {
                    pokemon?.types.map(types=>(<li className={`first__letter poke__types__info`} key={types.type.url}>{types.type.name}</li>))
                  }
                </div>

              </section>
            
              <section className="container__skills__info">
                <h3 className="title__h3">Abilities</h3>
                <div className="container__p2">
                  {
                    pokemon?.abilities.map(abi=>
                      (<li className="first__letter poke__skills__info" key={abi.ability.url}>
                        {abi.ability.name}
                       </li>
                      )
                    )
                  }
                </div>

              </section>
            </article>
            <hr className='hr__info'/>
            <article className="container__stats">
                <h3 className="title__h3__stats">Stats</h3>
                <article>
                {
                    pokemon?.stats.map(statInfo=> ( 
                     <li className='poke__stats__item' key={statInfo.stat.url}>
                        <article className="container__stats__texts">
                           <div className='first__letter poke__stats__label__info'>{statInfo.stat.name}:</div>
                           <div className='stat__value'>{statInfo.base_stat}/150</div>
                        </article>
                        <progress className='stats__value__pokeinfo' id="file" max="150" value={statInfo.base_stat}></progress>
                     </li>))
                }    
                  
                </article>
  
            </article>
         </section>

      </article>

  
      <article className='container__movements'>
         <h3 className='title__movements'>Movements</h3>
         <div className='container__moves'>
           {
             pokemon?.moves.slice(0,24).map(mov=>(<li className='moves first__letter' key={mov.move.url}>{mov.move.name}</li>))
           }
         </div>
      </article>
      
    </div>
   
  )
}

export default PokeInfoPage