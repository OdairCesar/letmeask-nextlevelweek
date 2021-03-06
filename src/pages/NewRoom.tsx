import { Link, useHistory } from 'react-router-dom'
import { FormEvent } from 'react'
import { useState } from 'react'

import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import '../styles/auth.scss'

import { Button } from '../components/Button'
import { database } from '../services/firebase'
import { useAuth } from '../hooks/useAuth'

export function NewRoom(){
    const {user} = useAuth()
    const history = useHistory()
    const [newRoom, setNewRoom] = useState('')

    async function HandleCreateRoom(event: FormEvent){
        event.preventDefault()

        if (newRoom.trim() === '') return
        
        const roomRef = database.ref('rooms')

        const firebaseRoom = await roomRef.push({
            title: newRoom,
            authorId: user?.id,
            authorName: user?.name,
            roomIsOpen: true
        })

        history.push(`/rooms/${firebaseRoom.key}`)
    }

    return(
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="Ilustração simbolizando perguntas e respostas"/>
                <strong>Toda pergunta tem uma resposta.</strong>
                <p>Aprenda e compartilhe conhecimento com outras pessoas</p>
            </aside>
            <main>
                <div className="main-content">
                    <img src={logoImg} alt="LetMeAsk"/>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={HandleCreateRoom}>
                        <input 
                            type="text" 
                            placeholder="Nome da sala" 
                            onChange={ event => setNewRoom(event.target.value)} 
                            value={newRoom}
                        />
                        <Button type="submit">Criar sala</Button>
                    </form>
                    <p>Quer entrar em uma sala existente <Link to="/">clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}