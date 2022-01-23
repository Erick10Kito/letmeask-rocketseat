
import { useState } from "react"

export function Button(){
  //let counter =0;
  const [counter,setCounter] = useState(0)//usei colchetes para colocar duas informaçoes , o counter é a variavel que foi definida com 0 no useState e o setCounter é uma função
  
  
  function increment() {
    setCounter(counter + 1)
    //counter ++
    console.log(counter)
  }
  return <button onClick={increment}>{counter}</button> }

