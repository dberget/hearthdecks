import React from 'react'
import { Button } from 'semantic-ui-react'

  const ManaBar = () => {
      return(
        <Button.Group>
          <Button circular color="blue" icon> 1 </Button> 
          <Button circular color="blue" icon> 2 </Button> 
          <Button circular color="blue" icon> 3 </Button> 
          <Button circular color="blue" icon> 4 </Button> 
          <Button circular color="blue" icon> 5 </Button> 
          <Button circular color="blue" icon> 6 </Button> 
          <Button circular color="blue" icon> 7+ </Button> 
        </Button.Group >
      )
    }

export default ManaBar