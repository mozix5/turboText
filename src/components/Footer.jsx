import React from 'react'

const Footer = () => {
  return (
    <div className='flex gap-6 py-8'>Footer
    <button onClick={() => changeTheme("")}>theme1</button>
      <button onClick={() => changeTheme("theme2")}>theme2</button>
      <button onClick={() => changeTheme("theme3")}>theme3</button>
    </div>
  )
}

export default Footer