import React, { useEffect, useState } from 'react'
import { Torque, TorqueUser, UnknownTorqueUser } from '@torquecloud/torque-js'
import { TorqueContext } from './torque-context'

export type TorqueProviderProps = {
  torque: Promise<Torque>
  children: React.ReactNode
}

export const TorqueProvider =
  ({
     torque: torquePromise,
     children,
   }: TorqueProviderProps) => {
    const [torque, setTorque] = useState<Torque | null>(null)
    const [torqueUser, setTorqueUser] = useState<TorqueUser>(UnknownTorqueUser.Instance)

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
