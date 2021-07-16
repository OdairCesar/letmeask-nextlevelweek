import { ReactNode } from 'react'

type ItenRoomProps = {
    authorName: string,
    title: string,
    children?: ReactNode
}

export function ItenRoom({authorName, title, children} : ItenRoomProps){
    return(
        <div className='question'>
            <p>{title}</p>
            <footer>
                <div>
                    <span>{authorName}</span>
                </div>
                <div>
                    {children}
                </div>
            </footer>
        </div>
    )
}