import React, { useEffect, useState } from 'react'
import { Torque, TorqueError, TorqueErrorType, TorqueUser, UnknownTorqueUser } from '@torquecloud/torque-js'
import { TorqueContext } from './torque-context'

export type TorqueProviderProps = {
  torque: Promise<{ torque?: Torque, error?: TorqueError }>
  children: React.ReactNode
}

export const TorqueProvider =
  ({
     torque: torquePromise,
     children,
   }: TorqueProviderProps) => {
    const [torque, setTorque] = useState<Torque | null>(null)
    const [torqueUser, setTorqueUser] = useState<TorqueUser>(UnknownTorqueUser.Instance)

    function refreshTorqueUser(): Promise<{ error?: TorqueError }> {
      if (torque)
        return torque.retrieveTorqueUser()
          .then(result => {
            if (result.user){
              setTorqueUser(result.user)
              return {}
            }
            return {
              error: result.error
            }
          }).catch(reason => {
            return {
              error: {
                type: TorqueErrorType.unknown_error,
                message: `Unknown error occurred while retrieving Torque User`,
                rawReason: reason
              }
            }
          })
      return Promise.resolve({
        error: {
          type: TorqueErrorType.invalid_config,
          message: `Missing Torque instance. Torque instance is necessary to refresh TorqueUser.`
        }
      })
    }

    useEffect(() => {
      torquePromise.then(
        result => {
          if (result.torque) {
            setTorque(result.torque)
            refreshTorqueUser()
          } else {
            console.error(result.error)
          }
        },
      ).catch(reason => {
        console.error(reason)
      })
    }, [])

    useEffect(() => {
      refreshTorqueUser()
    }, [torque])

    return (
      <TorqueContext.Provider value={{ torque, torqueUser, refreshTorqueUser }}>
        {children}
      </TorqueContext.Provider>
    )
  }
