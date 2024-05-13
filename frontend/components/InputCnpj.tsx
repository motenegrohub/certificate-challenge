import { useState } from 'react'
import InputMask from 'react-input-mask'

export default function InputCnpj() {
  const [cnpj, setCnpj] = useState<string>('')

  return (
    <div>
      <div className='mb-4'>
        <label
          className='block text-gray-700 text-sm font-bold mb-2'
          htmlFor='cnpj'
        >
          CNPJ
        </label>
        
        <InputMask
          className='shadow appearance-none border rounded w-full py-2 px-3 text-gray-700 leading-tight focus:outline-none focus:shadow-outline'
          id='cnpj'
          name='cnpj'
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          type='string'
          mask='99.999.999/9999-99'
        />
      </div>

      <div>
        <button 
          className='bg-blue-500 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded focus:outline-none focus:shadow-outline'
          type='submit'
        >
            Consultar cnpj
        </button>
      </div>
    </div>
  )
}