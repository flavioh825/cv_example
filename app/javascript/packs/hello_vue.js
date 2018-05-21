import Vue from 'vue/dist/vue.esm'
import TurboLinksAdapter from 'vue-turbolinks'
import VueResource from 'vue-resource'

Vue.use(VueResource)
Vue.use(TurboLinksAdapter)

document.addEventListener('turmbolinks:load', () => {
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
      }
    });
  }
});
