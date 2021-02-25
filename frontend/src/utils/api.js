export class Api {
constructor(url, token){
this._url = url;
this._token = token;
}


getAny(item){
    return fetch(this._url + item, {
        method: "GET",
        headers: {
            authorization: this._token,
            "Content-type": "application/json"
        }
    }).then((res) => {
      if(res.ok) {
        console.log(res)
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch((err) => {
      console.log(err)
  })
}


patch(item, data){
    return fetch(this._url + item, {
  method: 'PATCH',
  headers: {
    authorization: this._token,
    'Content-Type': 'application/json'
  },
  body: JSON.stringify({
    name: data.name,
    about: data.about
  })
}).then((res) => {
  if(res.ok) {
      return res.json();
  }
  return Promise.reject(`Ошибка: ${res.status}`)
})
.catch((err) => {
  console.log(err)
})
}
patchAvatar(item, data){
  return fetch(this._url + item, {
method: 'PATCH',
headers: {
  authorization: this._token,
  'Content-Type': 'application/json'
},
body: JSON.stringify({
  avatar: data.link
})
}).then((res) => {
if(res.ok) {
    return res.json();
}
return Promise.reject(`Ошибка: ${res.status}`)
})
.catch((err) => {
console.log(err)
})
}

post(item, data){
  return fetch(this._url + item, {
    method: "POST",
    headers: {
      authorization: this._token,
    'Content-Type': 'application/json',
    },
    body: JSON.stringify({
      name: data.name,
      link: data.link
    })
  }).then((res) => {
    if(res.ok) {
        return res.json();
    }
    return Promise.reject(`Ошибка: ${res.status}`)
})
.catch((err) => {
    console.log(err)
})
  }
  
  
  delete(item){
    return fetch(this._url + item, {
      method: "DELETE",
      headers: {
        authorization: this._token,
      'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch((err) => {
      console.log(err)
  })
  }
  put(item){
    return fetch(this._url + item, {
      method: "PUT",
      headers: {
      authorization: this._token,
      'Content-Type': 'application/json'
      }
    })
    .then((res) => {
      if(res.ok) {
          return res.json();
      }
      return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch((err) => {
      console.log(err)
  })
  }
  changeLikeCardStatus(id, isLiked) {
    return fetch(this._url + `cards/likes/${id}`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        authorization: this._token,
        'Content-Type': 'application/json'
        }
    }).then((res) => {
      if(res.ok) {
          return res.json();
        }
      return Promise.reject(`Ошибка: ${res.status}`)
  })
  .catch((err) => {
      console.log(err)
  })
  }
}
const api = new Api("https://mesto.nomoreparties.co/v1/cohort-17/", "abc35fe1-b80b-4747-9d9f-796fef32537e")
export default api;
