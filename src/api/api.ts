import { BASE_URL, HOST, KEY, KEY_NAME, URL_NAME } from '../../config.ts'

export const fetchRecipes = (query: string): Promise<any> => {
  return new Promise((resolve, reject) => {
    const xhr = new XMLHttpRequest()

    xhr.addEventListener('readystatechange', function () {
      if (this.readyState === XMLHttpRequest.DONE) {
        if (this.status >= 200 && this.status < 300) {
          try {
            const res = JSON.parse(this.responseText)
            resolve(res.results)
          } catch (error) {
            reject(new Error('Тело ответа не является успешным: ' + error.message))
          }
        } else {
          reject(new Error(`Ошибка: ${this.status} ${this.statusText}`))
        }
      }
    })

    xhr.open('GET', `${BASE_URL}recipes/list?q=${query}`)
    xhr.setRequestHeader(KEY_NAME, KEY)
    xhr.setRequestHeader(URL_NAME, HOST)
    xhr.send()
  })
}
