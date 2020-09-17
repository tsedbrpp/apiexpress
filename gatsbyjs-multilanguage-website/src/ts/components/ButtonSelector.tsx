
import * as React from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Button } from "@material-ui/core"
import ModelUpper from "../ModelUpper"
import AnObject from "../AnObject"

interface myInterface {
  QSetter: React.Dispatch<React.SetStateAction<boolean>>

}

const handleClick = async () => {
  // The handler won't be called if the button
  // is disabled, so if we got here, it's safe
  // to trigger the click.
  let modelUpper = ModelUpper.GetInstance();
  await modelUpper.pursue();
}
const resetClick = (setter:React.Dispatch<React.SetStateAction<boolean>>) =>
{
  setter(true);


}
const  ButtonSelector:  React.FunctionComponent<myInterface> = (props:myInterface) => {
  const SetShowQ: React.Dispatch<React.SetStateAction<boolean>> = props.QSetter ;
  return (
    <div>

  <Button variant="contained" color="primary" onClick={handleClick} >
    Primary
  </Button>
  <Button variant="contained" color="secondary" onClick={() => resetClick(SetShowQ)}>
    Secondary
  </Button>
  <Button variant="contained" disabled>
    Disabled
  </Button>
  <Button variant="contained" color="primary" href="#contained-buttons">
    Link
  </Button>
    </div>
)
}

export default ButtonSelector
