import Vue from 'vue/dist/vue.esm'
import TurboLinksAdapter from 'vue-turbolinks'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(TurboLinksAdapter)

document.addEventListener('turbolinks:load', () => {
  Vue.http.headers.common['X-CSRF-Token'] = document.querySelector('meta[name="csrf-token"]').getAttribute('content')

  var element = document.getElementById("user-form")

  if(element != null){
    var user = JSON.parse(element.dataset.user)

    var app = new Vue({
      el: element,
      data: function(){
        return {
          user: user
        }
      },
      methods: {
        saveUser(){
          this.$http.post('/users', {user: this.user}).then(response => {
            Turbolinks.visit(`/users/${response.body.id}`)
          }, response => {
            console.log(response)
          })
        }
      }
    });
  }
});
