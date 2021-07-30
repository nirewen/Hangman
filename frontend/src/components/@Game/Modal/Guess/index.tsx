import React from 'react'
import Modal from 'react-modal'

import { useUser } from 'providers/User'
import { useGame } from 'providers/Game'
import { useSocket } from 'providers/Socket'
import { useGameState } from 'providers/GameState'

import NewGame from 'routes/NewGame'

import { CloseButton } from './styles'

Modal.setAppElement('#root')

const GuessModal: React.FC = () => {
    const { code } = useGame()
    const { state, setState } = useGameState()
    const user = useUser()
    const socket = useSocket()

    return (
        <Modal className="Modal" overlayClassName="Overlay" isOpen={state.guessing!} shouldCloseOnOverlayClick={true}>
            <CloseButton onClick={() => setState!({ guessing: false })}>&times;</CloseButton>
            <NewGame
                headerContent={() => <>What's the phrase?</>}
                submitText="Guess"
                onSubmit={(phrase: string) => {
                    socket.emit('guess', code, { user, phrase })
                    setState!({ guessing: false })
                }}
            />
        </Modal>
    )
}

export default GuessModal
