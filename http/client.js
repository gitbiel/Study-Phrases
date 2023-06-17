function client({ method, body = null, path }) {
  const baseURL = 'http://localhost:3000'

  return new Promise((resolve, reject) => {
    fetch(`${baseURL}/${path}`, {
      method, 
      headers: {
        'Content-Type': 'application/json',
        'authorization': 'token-do-biel'
      },
      body: body ? JSON.stringify(body) : null,
    })
    .then(response => {
      console.log(response.status)
      if (response.status !== 204) {
        const data = response.json()
        resolve(data)
      }
    })
    .catch((error) => reject(error));
  })

}



async function createPhrase({ phrase, priority }) {
  console.log('==123')
  await client({ method: 'POST', body: { phrase, priority }, path: 'phrase' })
}

async function listPhrases() {
  return await client({ method: 'GET', path: 'phrase' })
}

