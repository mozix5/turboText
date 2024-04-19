import React from 'react'
import {motion} from 'framer-motion'
const Caret = () => {
  return (
    <motion.div initial={{opacity:0}} animate={{opacity:1}} transition={{repeat:Infinity,duration:0.8}} className=' w-[1.5px] leading-relaxed h-6  bg-caret'></motion.div>
  )
}

export default Caret