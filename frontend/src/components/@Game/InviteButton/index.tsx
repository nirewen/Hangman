import React from 'react'

import { Button, useClipboard } from '@chakra-ui/react'
import { FaClipboardCheck, FaClipboard } from 'react-icons/fa'

interface Props {
    link: string
    hideText?: boolean
}

const InviteButton: React.FC<Props> = ({ link, hideText }) => {
    const { hasCopied, onCopy } = useClipboard(link)

    return (
        <Button
            colorScheme={'blue'}
            size="sm"
            leftIcon={hideText ? undefined : hasCopied ? <FaClipboardCheck /> : <FaClipboard />}
            onClick={onCopy}
        >
            {hideText ? hasCopied ? <FaClipboardCheck /> : <FaClipboard /> : 'Copy invite'}
        </Button>
    )
}

export default InviteButton
