import { useState } from 'react'

/** ------------------------------------------------------ */
type ButtonTxtProps = {
    txt?: String;
}

export function ButtonTxt(props: ButtonTxtProps){
    return(
        <button>{props.txt || 'Botão Texto'}</button>
    )
}

/** ------------------------------------------------------- */
type ButtonNumProps = {
    num?: Number;
}

export function ButtonNum(props: ButtonNumProps){
    return(
        <button>{props.num || 'Botão'}</button>
    )
}

/** ------------------------------------------------------- */
type ButtonArrayProps = {
    arr?: Array<String>
}

export function ButtonArray(props: ButtonArrayProps){
    return(
        <button>{props.arr || 'Botão'}</button>
    )
}

/** ------------------------------------------------------- */
type ButtonChildrenProps = {
    children?: String;
}

export function ButtonChildren(props: ButtonChildrenProps){
    return(
        <button>{props.children || 'Botão'}</button>
    )
}

/**------------------------------------------------------- */
export function MaisMais(){
    //let counter  = 0
    const [counter, setCounter] = useState(0)

    function increment(){
        setCounter(counter + 1)
    }

    return(
        <button onClick={increment}>{counter}</button>
    )
}