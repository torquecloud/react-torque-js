import React, { useContext, useEffect, useState } from 'react'
import { Torque, TorqueUser } from '@torquecloud/torque-js/src'
import { UnknownTorqueUser } from '@torquecloud/torque-js/src/torque-user/torque-user'

type TorqueContextType = {
  torque: Torque | null
  torqueUser: TorqueUser
}

export const TorqueContext =
  React.createContext<TorqueContextType>({
    torque: null,
    torqueUser: new UnknownTorqueUser(),
  })

export const useTorque =
  (): TorqueContextType =>
    useContext(TorqueContext)

type TorqueProviderProps = {
  torque: Promise<Torque>
  children: React.ReactNode
}

export const TorqueProvider =
  ({
     torque: torquePromise,
     children,
   }: TorqueProviderProps) => {
    const [torque, setTorque] = useState<Torque | null>(null)
    const [torqueUser, setTorqueUser] = useState<TorqueUser>(new UnknownTorqueUser())

    function refreshTorqueUser() {
      if (torque) {
        torque.retrieveTorqueUser()
          .then(user => {
            setTorqueUser(user)
          })
      }
    }

    useEffect(() => {
      torquePromise.then(
        torqueValue => {
          setTorque(torqueValue)
          refreshTorqueUser()
        },
      ).catch(reason => {
        console.warn(reason)
      })
    }, [])

    useEffect(() => {
      refreshTorqueUser()
    }, [torque])

    return (
      <TorqueContext.Provider value={{ torque, torqueUser }}>
        {children}
      </TorqueContext.Provider>
    )
  }
