import { auth, firebase } from '../services/firebase'
import { useNavigate } from 'react-router-dom'
import illustrationImg from '../assets/images/illustration.svg'
import logoImg from '../assets/images/logo.svg'
import googleIconImg from '../assets/images/google-icon.svg'
import '../styles/auth.scss'
import { Button } from '../components/Button'
//importei a imagem que foi colocada dentro do vscode atraves desse codigo para que ela pudesse ser usada no src da tag img , e o nome q esta entre chaves é o nome que eu dei ao import.
export function Home() {
  const navigate = useNavigate();
  //navigate eu usei para "cadastrar" uma navegação , ou seja para quando clicar em algo ir para outra pag



  function handleCreateRoom() {
    //função que contem o navigation e a authenticação por google é a  função acima
    //puxei a função no botão usando o onClick para que ela fosse executada quando eu clicasse no botão


    const provider = new firebase.auth.GoogleAuthProvider();
    //texto acima serve para fazer a authenticação com o google , no caso aqui , eu importei tanto o firebase como o auth , só observar acima

    auth.signInWithPopup(provider).then(result => {
      //resultado da authenticação é oque mostra abaixou , ou seja quando for feito o login ele vai para a pagina especificada
      console.log(result);

      navigate('/rooms/new');

    })


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