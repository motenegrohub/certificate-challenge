import { useState } from 'react'
import InputMask from 'react-input-mask'

export default function InputCnpj() {
  const [cnpj, setCnpj] = useState<string>('')

  return (
    <div>
      <div>
        <label htmlFor='input-cnpj'>CNPJ</label>
        
        <InputMask
          id='cnpj'
          name='cnpj'
          value={cnpj}
          onChange={(e) => setCnpj(e.target.value)}
          type='string'
          mask='99.999.999/9999-99'
        />
      </div>

      <div>
        <button type='submit'>Consultar cnpj</button>
      </div>
    </div>
  )
}