import React, {useContext} from 'react'
import {Torque} from '@torquecloud/torque-js'

export type TorqueContextType = {
  torque: Torque | null
}

export const TorqueContext =
  React.createContext<TorqueContextType>({
    torque: null
  })

export const useTorque =
  (): TorqueContextType =>
    useContext(TorqueContext)
