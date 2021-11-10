import React, {useEffect, useState} from 'react'
import ExpressionBar from "./ExpressionBar";
import SettingsGear from "./SettingsGear";
import {useRive, useStateMachineInput} from "rive-react";

export default function App() {
  return (
      <>
          <ExpressionBar/>
          <SettingsGear/>
      </>
  );
}
