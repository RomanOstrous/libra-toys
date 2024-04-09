import React from 'react';
import './BuyPage.scss'

import ButtonBack from '../../components/ButtonBack/ButtonBack';
import NewPochta from '../../components/NewPochta/NewPochta';


const BuyPage = () => {

  return (
    <div className="buy">
      <ButtonBack text='Придбати'/>

      <NewPochta />
    </div>
  )
}

export default BuyPage;
