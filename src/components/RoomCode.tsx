import { type } from 'os'
import copyImg from '../assets/images/copy.svg'
import '../styles/room-code.scss'


type RoomCodeProps = {
    code: string;
}

export function RoomCode(props: RoomCodeProps) {
    function copyRoomCodeToClipboard() {
        navigator.clipboard.writeText(props.code)
        //uso para copiar o código
    }
    return (
        <button className="room-code" onClick={copyRoomCodeToClipboard}>
            <div>
                <img src={copyImg} alt="copy room code" />
            </div>
            <span>Sala #{props.code}</span>

        </button>
    )
}