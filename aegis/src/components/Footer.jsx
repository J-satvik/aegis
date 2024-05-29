import React from 'react';

const Footer = () => {
  return (
    <div className='footer text-white flex justify-center items-center w-full'>
      <span>
         Made with &#10084; @ {/*<img className='w-8' src="/assets/heart.png" alt="heart" />{' '} */}
      </span>
      <span className='font-bold'>&nbsp; Aegis</span>:<span>&nbsp; We've got your back (and your passwords).</span>
    </div>
  );
}

export default Footer;
