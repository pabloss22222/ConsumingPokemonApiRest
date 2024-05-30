import { useEffect } from "react";
import useFetch from "../../hooks/useFetch";
import './styles/SelectType.css'

const SelectType = ({setTypeSelected, setPosInitial, setContBlock, paginate}) => {

  const [types, getTypes]= useFetch()
    
  useEffect(()=>{

    const url='https://pokeapi.co/api/v2/type?offset=0&limit=100'

    getTypes(url)

  },[]);

  const handleChange =e => {
    setTypeSelected(e.target.value)
    setPosInitial(0)
    setContBlock(1)
    paginate(1)
  }
  const uppercase = (str) => str.charAt(0).toUpperCase() + str.slice(1);
  return (
    <select onChange={handleChange} className="select__type">
        <option  value='allPokemons'>All pokemons</option>
        {
            types?.results.map(typeInfo=>(
                <option className="select__type__options" key={typeInfo.url} value={typeInfo.url} >{uppercase(typeInfo.name)}</option>
            ))
        }
    </select>
    
  )
}

export default SelectType