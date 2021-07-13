/** IMPORTAÇÕES */
import { useParams } from 'react-router-dom'

//import { useAuth } from '../hooks/useAuth'
import { Button } from '../components/Button'
import { RoomCode } from '../components/RoomCode'

import '../styles/room.scss'
import logoImg from '../assets/images/logo.svg'
import { Question } from '../components/Question'
import { useRoom } from '../hooks/useRoom'


/** TIPAGENS */
type RoomParams = {
    id: string
}

/** PAGINA */
export function AdminRoom(){
    /** ATRIBUTOS */
    //const { user } = useAuth()
    const params = useParams<RoomParams>()
    const roomId = params.id
    const { title, questions} = useRoom(roomId)

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