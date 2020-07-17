import React from 'react';
import {storiesOf} from '@storybook/react';


storiesOf('Welcome page',module)
.add('welcom',()=>{
  return(
    <>
    <h1>UI Library</h1>
    <p>Enjoy!</p>
    </>
  )
},{
  info:{
    disable:true,
  }
})