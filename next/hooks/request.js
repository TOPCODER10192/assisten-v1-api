export const request = async(method = 'GET', url = '', data = {}, headers = {}) => {
  try {
    const _method = ['PUT', 'DELETE'].indexOf(method) > -1 ? `_method=${method}` : ''
    const _data = method == 'GET' ? Object.keys(data).map((key) => encodeURIComponent(key) + '=' + encodeURIComponent(data[key])).join('&') : '';
    const reply = await fetch(`${url}?${_method}${_data}`, {
      method: method!='GET' ? 'POST' : 'GET',
      body: method!='GET' ? JSON.stringify(data) : null,
      headers: {
        'Content-Type': 'application/json',
        ...headers
      }
    })
    console.log("REQUEST SUCCESS", { method, url, data, headers, reply })
    const res = await reply.json()

    let errorFields = {}
    let messages = []
    if (res.errors) {
      res.errors.map(e => {
        errorFields[e.field] = true
        messages.push(e.message)
      })
    }

    res.errorFields = errorFields
    res.error = messages.join(`\n`)
    return res

  } catch (error) {
    console.log("REQUEST FAILED", { method, url, data, headers, error })
    return { status: false, error, errors: [] }
  }
}

export default request;
