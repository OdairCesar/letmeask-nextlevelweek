import { useHistory } from 'react-router-dom'
import { useEffect, useState } from 'react'

import { Button } from '../components/Button'

import logoImg from '../assets/images/logo.svg'
import { database } from '../services/firebase'

type RoomType = {
  roomId:string;
  title: string;
  roomIsOpen?: boolean;
}[]

export function RoomList() {
  const history = useHistory();
  const [listRooms, setListRooms] = useState<RoomType>([])

  useEffect(() => {
    const databaseRef = database.ref(`rooms`);
    databaseRef.once('value', rooms => {
      const dbRoom: object = rooms.val() ?? {}
      const parsedRooms = Object.entries(dbRoom).map(([key,value]) => {
        return {
          roomId: key,
          title: value.title,
          roomIsOpen: value.roomIsOpen
        }
      })

      setListRooms(parsedRooms)
    })

  }, [])

  function handleGoHome() {
    return history.push('/')
  }

  return(
    <div id="page-room">
      <header>
        <div className="content">
          <img src={logoImg} alt="Let Me Ark"/>
          <div>
            <Button isOutlined onClick={handleGoHome}> Voltar ao Inicio</Button>
          </div>
        </div>
      </header>
      <main>
        <div className="room-title">
          <h1>Lista de Salas</h1>
          {listRooms.length > 0 && <span>{listRooms.length} Salas</span>}
        </div>

      </main>

    </div>
  )
}