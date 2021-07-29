import React from 'react'
import Modal from 'react-modal'

import { useUser } from 'providers/User'
import { useGame } from 'providers/Game'
import { useSocket } from 'providers/Socket'
import { useGameState } from 'providers/GameState'

import NewGame from 'routes/NewGame'

import { CloseButton } from './styles'

Modal.setAppElement('#root')

const DefineModal: React.FC = () => {
    const { code, game } = useGame()
    const { state, setState } = useGameState()
    const user = useUser()
    const socket = useSocket()

    return (
        <Modal className="Modal" overlayClassName="Overlay" isOpen={state.defining!} shouldCloseOnOverlayClick={true}>
            <CloseButton onClick={() => setState({ defining: false })}>&times;</CloseButton>
            <NewGame
                currentPhrase={game.word.word}
                headerContent={() => <>Type the new phrase</>}
                submitText="Set"
                onSubmit={(phrase: string) => {
                    socket.emit('set-phrase', code, user, phrase)
                    setState({ defining: false })
                }}
            />
        </Modal>
    )
}

export default DefineModal
