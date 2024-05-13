import { FormEvent, useState } from "react"

import InputCnpj from "@/components/InputCnpj"
import { Response } from "@/types/response"


export default function Home() {
  const [response, setResponse] = useState<Response | null>(null)

  async function onSubmit(event: FormEvent<HTMLFormElement>): Promise<void> {
    event.preventDefault()

    const formData = new FormData(event.currentTarget)
    const cnpj = formData.get('cnpj')
    if (!cnpj) {
      return
    }
    const response = await fetch(`http://localhost:8000/api/certificate/?cnpj={cnpj}`)
    const data = await response.json()

    setResponse({
      path: data.path,
      expirationDate: new Date(data.expiration_date),
      numberCertificate: data.number_certificate,
    })
  }

  return (
    <>
      <div>
        <form onSubmit={onSubmit}>
          <InputCnpj />
          <h1> AAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAAA </h1>
        </form>
      </div>

      {/* <div>
        {response ? (
          <div>
            <h1>{response.path}</h1>
            <h1>{response.expirationDate.toString()}</h1>
            <h1>{response.numberCertificate}</h1>
          </div>
        ) : ''}

      </div> */}
    </>
  )
}