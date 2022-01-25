
import { FormEvent } from 'react'
import { Link, Navigate, useNavigate } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { useState } from 'react'
import { database } from '../services/firebase'

//importei a imagem que foi colocada dentro do vscode atraves desse codigo para que ela pudesse ser usada no src da tag img , e o nome q esta entre chaves é o nome que eu dei ao import.
export function NewRoom() {
    const navigate = useNavigate();
    const { user } = useAuth();

    const [newRoom, setNewRoom] = useState('');

    async function handleCreateRoom(event: FormEvent) {
        event.preventDefault();

        if (newRoom.trim() === '') {
            //esse "trim faz com ele tire os epaços a direita e a esquerda do texto"
            return;
        }


        const roomRef = database.ref('rooms');
        //criei uma referencia no banco de dados chamada rooms

        const firebaseRoom = await roomRef.push({
            tittle: newRoom,

        })

        navigate(`/rooms/${firebaseRoom.key}`)
    }

    return (
        <div id="page-auth">
            <aside>
                <img src={illustrationImg} alt="ilusração simbolizando perguntas e respostas" />
                <strong>Crie salas de Q&amp;A ao vivo</strong>
                <p>Tire as dúvidas da sua audiência em tempo real</p>
            </aside>
            <main>

                <div className="main-content">
                    <img className='logo-letmeask' src={logoImg} alt="Logo letmeask" />
                    <h1>{user?.name}</h1>
                    <h2>Criar uma nova sala</h2>
                    <form onSubmit={handleCreateRoom}>
                        <input
                            type="text"
                            placeholder='Nome da sala'
                            onChange={event => setNewRoom(event.target.value)}
                            value={newRoom}
                        />
                        <Button type='submit'>
                            Criar sala
                        </Button>
                    </form>
                    <p>Quer entrar em uma sala existente? <Link to="/">Clique aqui</Link></p>
                </div>
            </main>
        </div>
    )
}