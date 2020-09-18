
import * as React from 'react';

import ButtonBase from '@material-ui/core/ButtonBase';
import Typography from '@material-ui/core/Typography';
import { Button } from "@material-ui/core"
import ModelUpper from "../ModelUpper"
import AnObject from "../AnObject"

interface myInterface {
  QSetter: React.Dispatch<React.SetStateAction<boolean>>
  CSetter: React.Dispatch<React.SetStateAction<boolean>>
  ConclusionSetter: React.Dispatch<React.SetStateAction<Array<AnObject>>>
}

const handleClick = async (ConclusionSetter:React.Dispatch<React.SetStateAction<Array<AnObject>>>) => {
  // The handler won't be called if the button
  // is disabled, so if we got here, it's safe
  // to trigger the click.
  let modelUpper = ModelUpper.GetInstance();
  await modelUpper.pursue();
  let conclude = await ModelUpper.GetInstance().getConclusions();
  ConclusionSetter(conclude);

}
const consult = async (QSetter:React.Dispatch<React.SetStateAction<boolean>>,CSetter:React.Dispatch<React.SetStateAction<boolean>>,ConclusionSetter: React.Dispatch<React.SetStateAction<Array<AnObject>>>) =>
{
  QSetter(true);
  CSetter(false);
  ConclusionSetter([]);
  await handleClick(ConclusionSetter)
  QSetter(false);
  CSetter(true);

}
const  ButtonSelector:  React.FunctionComponent<myInterface> = (props:myInterface) => {
  const SetShowQ: React.Dispatch<React.SetStateAction<boolean>> = props.QSetter ;
  const SetShowC: React.Dispatch<React.SetStateAction<boolean>> = props.CSetter ;
  const ConclusionSetter:React.Dispatch<React.SetStateAction<Array<AnObject>>> = props.ConclusionSetter ;
  return (
    <div>

  <Button variant="contained" color="secondary" onClick={() => consult(SetShowQ,SetShowC,ConclusionSetter)}>
  New Consultation
  </Button>

    </div>
)
}

export default ButtonSelector
