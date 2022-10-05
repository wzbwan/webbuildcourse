export const baseURL = ""
// export const baseURL = "http://localhost:1337"
export async function client(endpoint, method,{ body, ...customConfig } = {}) {
  const headers = { 'Content-Type': 'application/json' }

  const config = {
    method: method,
    ...customConfig,
    headers: {
      ...headers,
      ...customConfig.headers,
    },
  }

  if (body) {
    config.body = JSON.stringify(body)
  }
  // console.log("client: ",endpoint)
  let data
  try {
    const response = await window.fetch(baseURL+endpoint, config)
    data = await response.json()
    // console.log("client response: ",response)
    // console.log("client response.json():",data)
    if (response.ok) {
      
      // Return a result object similar to Axios
      return {
        status: response.status,
        data,
        headers: response.headers,
        url: response.url,
      }
    }
    throw new Error(response.statusText)
  } catch (err) {
    return Promise.reject(err.message ? err.message : data)
  }
}

client.get = function (endpoint, customConfig = {}) {
  return client(endpoint,"GET" ,{ ...customConfig, method: 'GET' })
}

client.post = function (endpoint, body, customConfig = {}) {
  return client(endpoint,"POST" ,{ ...customConfig, body })
}

client.put = function (endpoint, body, customConfig = {}) {
  return client(endpoint,"PUT" ,{ ...customConfig, body })
}
