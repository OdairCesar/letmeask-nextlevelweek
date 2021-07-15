import { ReactNode } from 'react'

type ItenRoomProps = {
    authorId: string,
    title: string,
    children?: ReactNode
}

export function ItenRoom({authorId, title, children} : ItenRoomProps){
    return(
        <div className='question'>
            <p>{title}</p>
            <footer>
                <div>
                    <span>{authorId}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}