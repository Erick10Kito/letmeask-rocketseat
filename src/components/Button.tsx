
//import { useState } from "react"



//const [counter,setCounter] = useState(0)
//usei colchetes para colocar duas informaçoes , o counter é a variavel que foi definida com 0 no useState e o setCounter é uma função
//function increment() {
//setCounter(counter + 1)
//
//console.log(counter)
//}

import { ButtonHTMLAttributes } from 'react'
import '../styles/button.scss'

type ButtonProps = ButtonHTMLAttributes<HTMLButtonElement>;

export function Button(props: ButtonProps) {
  return (
    <button className="button" {...props} />


  )
}

<Button />

