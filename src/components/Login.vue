
<template>
  <div>
    <div class="container login-container">
    <div class="row">
      <div class="col s12 m8">
        <div class="login card-panel grey lighten-2 black-text center">
          <h3>Login</h3>
          <form action="index.html">
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="email" id="email" v-model="email">
              <label class="white-text" for="email" v-bind:class="{'active': email != null}">Email Address</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="password">
              <label class="white-text" for="password" v-bind:class="{'active': password != null}">Password</label>
            </div>
            <button v-on:click="login" class="btn btn-large btn-extended grey lighten-4 black-text">Login</button>
          </form>
        </div>
      </div>
    </div>
  </div>
  </div>
</template>

<script>
import firebase from 'firebase';
export default {
  name: 'Login',
  data: function() {
    return {
      email: '',
      password: ''
    };
  },
  methods: {
    login: function(e) {
      firebase
        .auth()
        .signInWithEmailAndPassword(this.email, this.password)
        .then(
          () => {
              console.log(firebase.auth().currentUser);
            //alert(`You are logged in as ${user.email}`);
            this.$router.go({ path: this.$router.path });
            //this.$router.push('/');
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
    }
  }
};
</script>
<style>
input:-internal-autofill-selected {
    background-color: transparent !important;
}
  .login-container {
      padding: 100px 30px 30px 30px;
  }
  .login-container .row {
      margin: auto;
      width: 70%;
  }
</style>
