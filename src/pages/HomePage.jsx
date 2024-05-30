import {useRef} from 'react'
import { setTrainer } from '../store/slices/trainer.slice'
import {useDispatch, useSelector} from 'react-redux'
import { useNavigate } from 'react-router-dom'
import './styles/HomePage.css'

const HomePage = () => {

    const inputTrainer = useRef()

    const dispatch = useDispatch()

    const navigate = useNavigate() 

    const handleSubmit = e => {
        e.preventDefault()
        dispatch(setTrainer(inputTrainer.current.value.trim()))
        navigate('/pokedex')
    }
   
  return (
    <div className='container__homepage'>
        <article className=" container__img__logo">
           <img className="img__logo" src="./images/imgLogo.png" alt="img" />
        </article>
        <h1 className="title__welcome">¡ Hi Trainer!</h1>
        <p className="description">To start give me your name</p>
        <article className="container__form">
           <form className="homepage__form" onSubmit={handleSubmit}>
               <input className='homepage__input__name' ref={inputTrainer} type="text" placeholder='Your name...'/>
               <button className='homepage__button__name'>Start</button>
           </form>
        </article>
        <article className='container__img__picachu'>
           <img className="img__picachu" src="./images/imgPicachu01.png" alt="img" />
        </article>
        
        <article className='container__poke__rectangular'>
          <section className="rectangulo__black">
             <section className="rectangulo__red"></section>
             <div className="container__cicles">
               <div className="circle__white"> 
                 <div className="circle__gray"></div>
               </div>
             </div>
          </section>
        </article>
    </div>

  )
}
export default HomePage