import { Dispatch, SetStateAction } from 'react'

function setWithTimeout(value: any, update: Dispatch<SetStateAction<any>>, initialValue?: any, ms = 3000) {
    update(value)

    setTimeout(() => update(initialValue), ms)
}

export default setWithTimeout
