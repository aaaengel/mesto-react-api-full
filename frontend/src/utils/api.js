export class Api {
constructor(url){
this._url = url;
this._token = localStorage.getItem('jwt');
}


getAny(item){
  
    return fetch(this._url + item, {
        method: "GET",
        headers: {
            authorization: `Bearer ${this._token}`,
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
    authorization: `Bearer ${this._token}`,
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
  authorization: `Bearer ${this._token}`,
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
      authorization: `Bearer ${this._token}`,
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
        authorization: `Bearer ${this._token}`,
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
      authorization: `Bearer ${this._token}`,
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
    
    return fetch(this._url + `cards/${id}/likes`, {
      method: `${isLiked ? 'DELETE' : 'PUT'}`,
      headers: {
        authorization: `Bearer ${this._token}`,
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
const api = new Api("https://www.api.banilacrew.students.nomoredomains.icu/")
export default api;
