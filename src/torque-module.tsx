import React from 'react'

export type TorqueModuleProps = {
  torqueModuleReactComponent: React.ComponentClass | React.FunctionComponent
}

export const TorqueModule = ({
     torqueModuleReactComponent,
   }: TorqueModuleProps): React.ReactElement => {

    return (
      React.createElement(torqueModuleReactComponent)
    )
  }
