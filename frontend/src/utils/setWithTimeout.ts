import { Dispatch, SetStateAction } from 'react'

function setWithTimeout(value: any, update: Dispatch<SetStateAction<any>>, ms = 3000) {
    update(value)

    setTimeout(() => update(null), ms)
}

export default setWithTimeout
