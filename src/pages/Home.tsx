
import { auth, database, firebase } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'
import { FormEvent, useState } from 'react'

//importei a imagem que foi colocada dentro do vscode atraves desse codigo para que ela pudesse ser usada no src da tag img , e o nome q esta entre chaves é o nome que eu dei ao import.
export function Home() {
  const navigate = useNavigate();
  const { user, singInWithGoogle } = useAuth()
  //navigate eu usei para "cadastrar" uma navegação , ou seja para quando clicar em algo ir para outra pag
  const [roomCode, setRoomCode] = useState('');



  async function handleCreateRoom() {
    //função que contem o navigation é a  função acima
    //puxei a função no botão usando o onClick para que ela fosse executada quando eu clicasse no botão
    if (!user) {
      await singInWithGoogle()
    }

    navigate('/rooms/new');




    //aqui eu dei o diretorio do navigate

  }




  async function handleJoinRoom(event: FormEvent) {
    event.preventDefault();

    if (roomCode.trim() === '') {
      return;
    }

    const roomRef = await database.ref(`rooms/${roomCode}`).get();
    //ele entra dentro de database rooms e procura a referencia que foi dada pelo usuario

    if (!roomRef.exists()) {
      alert('Room does not exist.')
      return;
      //aqui ele confere se o codigo que foi dado pelo usuario existe, se não existir ele da um alerta
    }

    if (roomRef.val().endedAt) {
      alert('Sala foi encerrada, fale com o adiministrador caso queira entrar!');
      return;
    }

    navigate(`/rooms/${roomCode}`);


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
          <button onClick={handleCreateRoom} className='create-room'>
            <img src={googleIconImg} alt="logo do google" />
            Crie sua sala com o Google
          </button>
          <div className='separator'>Ou entre em uma sala</div>
          <form onSubmit={handleJoinRoom}>
            <input
              type="text"
              placeholder='Digite o código da sala'
              onChange={event => setRoomCode(event.target.value)}
              value={roomCode}
            />
            <Button type='submit'>
              Entrar na sala
            </Button>
          </form>
        </div>
      </main>
    </div>
  )
}
