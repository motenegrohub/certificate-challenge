export function validaCnpj(cnpj: string): boolean {
  if (cnpj == '') {
    return false
  }

  if (cnpj.includes('_')) {
    return false
  }

  const pesos = [5, 4, 3, 2, 9, 8, 7, 6, 5, 4, 3, 2]
  const [stringNumerosCnpj, digitoVerificadores] = cnpj.split('-')
  const numerosCnpj = stringNumerosCnpj.split('').map(n => Number(n)).filter(n => !isNaN(n))

  const primeiroDigito = calculaDigitoVerificador(numerosCnpj, pesos)
  const segundoDigito = calculaDigitoVerificador(
    [...numerosCnpj, primeiroDigito], [6, ...pesos]
  )

  return digitoVerificadores === `${primeiroDigito}${segundoDigito}`
}

function calculaDigitoVerificador(arrayNumeros: number[], pesos: number[]): number {
  const somaDigitos = multiplicaESoma(arrayNumeros, pesos)
  const resto = somaDigitos % 11

  if (resto < 2) {
    return 0
  } else {
    return 11 - resto
  }
}

function multiplicaESoma(arrayNumeros: number[], pesos: number[]): number {
  return arrayNumeros.reduce(
    (prev, curr, index) => prev + (curr * pesos[index]), 0
  )
}