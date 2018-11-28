var user = {
  username: '',
  password: ''
};

const Users = {
  template: "#users"
};
const Index = {
  template: "#index"
};
const Lists = {
  template: "#list"
};
const Items = {
  template: "#item"
};

const router = new VueRouter({
  routes: [
    { path: '/', component: Index },
    { path: '/users', component: Users },
    { path: '/lists', component: Lists },
    { path: '/items', component: Items }
  ]
})

var app = new Vue({
  el: '#vueRoot',
  data: {
    user: user,
    username: user.username,
    res: '',
    notLoggedIn: true
  },
  router: router,
  methods: {
    signIn: function () {
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      };
      axios.post('https://info3103.cs.unb.ca:24842/signin', user, axiosConfig)
        .then((res) => {
          app.res = res.data;
          app.notLoggedIn = false;
        })
        .catch((err) => {
          app.res = err;
        });
    },
    signOut: function () {
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      };
      axios.delete('https://info3103.cs.unb.ca:24842/signin', axiosConfig)
        .then((res) => {
          app.res = res.data;
          app.notLoggedIn = true;
        })
        .catch((err) => {
          app.res = err;
        });
    },
    updateUser: function () {
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      };
      axios.put('https://info3103.cs.unb.ca:24842/signin', app.screenName, axiosConfig)
        .then((res) => {
          app.res = res.data;
          app.loggedIn = true;
        })
        .catch((err) => {
          app.res = err;
        });
    },
    deleteUser: function () {
      let axiosConfig = {
        headers: {
          'Content-Type': 'application/json;charset=UTF-8',
          "Access-Control-Allow-Origin": "*",
        }
      };
      axios.delete('https://info3103.cs.unb.ca:24842/users/' + user.username, axiosConfig)
        .then((res) => {
          app.res = res.data;
          app.loggedIn = false;
        })
        .catch((err) => {
          app.res = err;
        });
    },
  }
})