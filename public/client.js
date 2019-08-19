function onOubmitShortUrlCreateForm () {
  const button = document.getElementById('shorturl-input-button')
  button.setAttribute('disabled', true)
  const form = document.forms.namedItem('shorturl-form-create')
  const endpoint = form.action
  const url = form.url.value
  fetch(endpoint, {
    method: 'POST',
    body: JSON.stringify({ url }),
    headers: {
      'Content-Type': 'application/json'
    },
    redirect: 'follow'
  })
    .then(res => res.json())
    .then(res => {
      button.removeAttribute('disabled')
      console.log(res)
      alert(JSON.stringify(res))
    })
}
