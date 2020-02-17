import React from 'react';
import Emoji from 'a11y-react-emoji';

const Footer = () => {
  return (
    <div style={{color: '#e1e1e1', padding: '12px 16px 0', fontFamily: '-apple-system, BlinkMacSystemFont, sans-serif'}}>
      <span>Made with <Emoji symbol="❤️" label="love" /> in <Emoji symbol="🇸🇬" label="singapore-flag" />.</span>
    </div>
  )
}

export default Footer
