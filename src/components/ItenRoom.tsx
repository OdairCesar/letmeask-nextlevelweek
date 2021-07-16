import { ReactNode } from 'react'
import { useHistory } from 'react-router-dom'
import { Button }from '../components/Button'
import { useAuth } from '../hooks/useAuth'

type ItenRoomProps = {
    authorId: string,
    authorName: string,
    title: string,
    children?: ReactNode
}

export function ItenRoom({authorId, authorName, title, children} : ItenRoomProps){
    const history = useHistory()
    const { user } = useAuth()

    function handleJoinRoom (authorId: string){
        if(authorId === user?.id){
            history.push(`admin/rooms/${authorId}`)
        }else{
            history.push(`/rooms/${authorId}`)
        }
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