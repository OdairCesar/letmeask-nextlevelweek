/** IMPORTAÇÕES */
import { useHistory, useParams } from 'react-router-dom'

//import { useAuth } from '../hooks/useAuth'
import { useRoom } from '../hooks/useRoom'
import { database } from '../services/firebase'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'
import { Question } from '../components/Question'

import '../styles/room.scss'
import logoImg from '../assets/images/logo.svg'
import deleteImg from '../assets/images/delete.svg'
import answerImg from '../assets/images/answer.svg'
import checkImg from '../assets/images/check.svg'
import React from 'react'


/** TIPAGENS */
type RoomParams = {
    id: string
}

/** PAGINA */
export function AdminRoom(){
    /** ATRIBUTOS */
    //const { user } = useAuth()
    const history = useHistory()
    const params = useParams<RoomParams>()
    const roomId = params.id
    const { title, questions} = useRoom(roomId)

    async function handleEndRoom() {
        await database.ref(`rooms/${roomId}`).update({
          endedAt: new Date(),
        })
    
        history.push('/');
    }
    
    async function handleDeleteQuestion(questionId : string) {
        if (window.confirm('Tem certeza que você deseja excluir esta pergunta?')) {
            await database.ref(`rooms/${roomId}/questions/${questionId}`).remove();
        }
    }

    async function handleCheckQuestionAsAnswer(questionId : string) {
        await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
            isAnswered: true,
        });
    }

    async function handleHighlightQuestion(questionId : string, questionIsHighlighted : boolean){
        if (questionIsHighlighted){
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isHighlighted: false,
            });
        }else{
            await database.ref(`rooms/${roomId}/questions/${questionId}`).update({
                isHighlighted: true,
            });
        }
    }

    /** COMPONENTE */
    return(
        <div id="page-room">
            <header>
                <div className="content">
                    <img src={logoImg} alt="Letmeask" />
                    <div>
                        <RoomCode code={roomId}/>
                        <Button isOutlined onClick={handleEndRoom}>Encerrar Sala</Button>
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
                            <Question key={question.id} content={question.content} author={question.author} isAnswered={question.isAnswered} isHighlighted={question.isHighlighted}>
                                
                                {!question.isAnswered && (
                                    <React.Fragment>
                                        <button type="button" onClick={() =>handleHighlightQuestion(question.id, question.isHighlighted)}>
                                            <img src={checkImg} alt="Marcar como lida" />
                                        </button>

                                        <button type="button" onClick={() => handleCheckQuestionAsAnswer(question.id)}>
                                            <img src={answerImg} alt="Destacar a pergunta" />
                                        </button>
                                    </React.Fragment>
                                )}

                                <button type="button" onClick={() => handleDeleteQuestion(question.id)} >
                                    <img src={deleteImg} alt="Remover pergunta" />
                                </button>

                            </Question>
                        )
                    })}
                </div>
            </main>
        </div>
    )
}