import React from 'react';
import onlineIcon from '../../img/onlineIcon.png';
import closeIcon from '../../img/closeIcon.png';
import './InfoBar.css';

const InfoBar = ({name }) => (
  <div className="infoBar">
    <div className="leftInnerContainer">
      <h3>{name}</h3>
    </div>
    <div className="rightInnerContainer">
      <a href="/"><img src={closeIcon} alt="close icon" /></a>
    </div>
  </div>
);

export default InfoBar;