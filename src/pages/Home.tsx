
import { auth, firebase } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
import { useAuth } from '../hooks/useAuth'

//importei a imagem que foi colocada dentro do vscode atraves desse codigo para que ela pudesse ser usada no src da tag img , e o nome q esta entre chaves é o nome que eu dei ao import.
export function Home() {
  const navigate = useNavigate();
  const { user, singInWithGoogle } = useAuth()
  //navigate eu usei para "cadastrar" uma navegação , ou seja para quando clicar em algo ir para outra pag



  async function handleCreateRoom() {
    //função que contem o navigation é a  função acima
    //puxei a função no botão usando o onClick para que ela fosse executada quando eu clicasse no botão
    if (!user) {
      await singInWithGoogle()
    }

    navigate('/rooms/new');




    //aqui eu dei o diretorio do navigate

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
          <form>
            <input
              type="text"
              placeholder='Digite o código da sala'
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
