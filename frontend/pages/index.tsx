import { FormEvent, useState } from "react"
import Head from 'next/head'

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
      <Head>
        <title>Certificate challenge</title>
        <meta property="og:title" content="Certificate challenge" key="title" />
      </Head>
    </div>
      <div>
        <form 
          className='bg-white shadow-md rounded px-8 pt-6 pb-8 mb-4'
          onSubmit={onSubmit}
        >
          <InputCnpj />
        </form>
      </div>

      <div>
        {response ? (
          <ul>
            <li>path: {response.path}</li>
            <li>Expiration date: {response.expirationDate.toString()}</li>
            <li>Number certificate: {response.numberCertificate}</li>
          </ul>
        ) : ''}

      </div>
    </>
  )
}