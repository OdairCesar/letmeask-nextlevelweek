import React from 'react'
import {ButtonTxt, ButtonNum, ButtonArray, ButtonChildren, MaisMais} from './components/button'

function App() {
  return (
    <div>
      <h1>Olá Mundo</h1>
      <ButtonTxt txt="Botão 1"/>
      <ButtonNum num={5}/>
      <ButtonArray arr={['Paulo', 'Maria']} />
      <MaisMais />
      <ButtonChildren>Usando o Children</ButtonChildren>
    </div>
  );
}

export default App;
