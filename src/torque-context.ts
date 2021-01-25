import React, { useContext } from 'react'
import { Torque, TorqueUser, UnknownTorqueUser } from '@torquecloud/torque-js'

export type TorqueContextType = {
  torque: Torque | null
  torqueUser: TorqueUser
}

export const TorqueContext =
  React.createContext<TorqueContextType>({
    torque: null,
    torqueUser: UnknownTorqueUser.Instance,
  })

export const useTorque =
  (): TorqueContextType =>
    useContext(TorqueContext)
