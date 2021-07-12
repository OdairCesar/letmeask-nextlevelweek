/** IMPORTAÇÕES */
import { useState } from 'react'
import { useParams } from 'react-router-dom'

import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import '../styles/room.scss'
import logoImg from '../assets/images/logo.svg'
import { database } from '../services/firebase'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'


/** TIPAGENS */
type RoomParams = {
    id: string
}

/** PAGINA */
export function AdminRoom(){
    /** ATRIBUTOS */
    const { user } = useAuth()
    const [ newQuestion, setNewQuestion ] = useState('')
    const params = useParams<RoomParams>()
    const roomId = params.id
    const { title, questions} = useRoom(roomId)

    /** FUNÇÕES */

    async function handleSendQuestion(){

        if(newQuestion.trim() === '') return

        if(!user) {
            throw new Error("You must be logged in") 
        }

        const question = {
            content: newQuestion,
            author:{
                name: user.name,
                avatar: user.avatar
            },
            isHighlighted: false,
            isAnswered: false
        }

        await database.ref(`rooms/${roomId}/questions`).push(question)

        setNewQuestion('')
    }
    handleSendQuestion()

    /** COMPONENTE */
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined>Encerrar Sala</Button>
                    </div>
                </div>
            </header>

            <main>
                <div className="room-title">
                    <h1>Sala: <span>{title}</span></h1>
                    { questions.length > 0 && <span>{questions.length} Pergunta(s)</span>}
                </div>
                
                <div>
                    {questions.map(question =>{
                        return(
                            <Question 
                                key={question.id}
                                content={question.content}
                                author={question.author}
                            />
                        )
                    })}
                </div>
            </main>
        </div>
    )
}