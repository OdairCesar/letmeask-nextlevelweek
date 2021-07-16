import { ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { Button }from '../components/Button'

type ItenRoomProps = {
    authorId: string,
    authorName: string,
    title: string,
    children?: ReactNode
}

export function ItenRoom({authorId, authorName, title, children} : ItenRoomProps){
    const history = useHistory()

    function handleJoinRoom (authorId: string){
        history.push(`/rooms/${authorId}`)
    }

    return(
        <div className='question'>
            <p>{title}</p>
            <footer>
                <div>
                    <span>{authorName}</span>
                </div>
                <div>
                    <Button className='like-button' onClick={() => handleJoinRoom(authorId)}>Entrar na sala</Button>
                    {children}
                </div>
            </footer>
        </div>
    )
}