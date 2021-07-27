import React from 'react'

import { Button, useClipboard } from '@chakra-ui/react'
import { FaClipboardCheck, FaClipboard } from 'react-icons/fa'

interface Props {
    link: string
}

const InviteButton: React.FC<Props> = ({ link }) => {
    const { hasCopied, onCopy } = useClipboard(link)

    return (
        <Button
            colorScheme={hasCopied ? 'white' : 'blue'}
            size="sm"
            leftIcon={hasCopied ? <FaClipboardCheck /> : <FaClipboard />}
            onClick={onCopy}
        >
            Copy invite
        </Button>
    )
}

export default InviteButton
