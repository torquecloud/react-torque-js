import React, { useContext } from 'react'
import { Torque, TorqueError, TorqueErrorType, TorqueUser, UnknownTorqueUser } from '@torquecloud/torque-js'

export type TorqueContextType = {
  torque: Torque | null
  torqueUser: TorqueUser,
  refreshTorqueUser: () => Promise<{ error?: TorqueError }>
}

export const TorqueContext =
  React.createContext<TorqueContextType>({
    torque: null,
    torqueUser: UnknownTorqueUser.Instance,
    refreshTorqueUser: () => Promise.resolve<{ error: TorqueError }>(
      {
        error: {
          type: TorqueErrorType.invalid_config,
          message: `Missing Torque instance. Torque instance is necessary to refresh TorqueUser.`,
        },
      },
    ),
  })

export const useTorque =
  (): TorqueContextType =>
    useContext(TorqueContext)
