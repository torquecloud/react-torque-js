import React, {useEffect, useState} from 'react'
import {Torque, TorqueError} from '@torquecloud/torque-js'
import {TorqueContext} from './torque-context'

export type TorqueProviderProps = {
  torque: Promise<{ torque?: Torque, error?: TorqueError }>
  children: React.ReactNode
}

export const TorqueProvider =
  ({
     torque: torquePromise,
     children,
   }: TorqueProviderProps) => {
  const [torque, setTorque] = useState<Torque | null>(null);
  useEffect(() => {
    torquePromise.then(
      result => {
        if (result.torque) {
          setTorque(result.torque)
        } else {
          console.error(result.error)
        }
      },
    ).catch(reason => {
      console.error(reason)
    })
  }, [])

  return (
    <TorqueContext.Provider value={{ torque }}>
      {children}
    </TorqueContext.Provider>
  )
}
