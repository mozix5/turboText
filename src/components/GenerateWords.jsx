import { faker } from '@faker-js/faker'
import React from 'react'

const GenerateWords = () => {
    const randomWords=faker.word.words(19)
  return (
    <div className=' text-typography'>GenerateWords {randomWords}</div>
  )
}

export default GenerateWords