
<template>
  <div>
    <div class="container login-container">
    <div class="row">
      <div class="col s12 m8">
        <div class="login card-panel grey lighten-2 black-text center">
          <h3>Signup</h3>
          <form action="index.html">
            <div class="input-field">
              <i class="material-icons prefix">email</i>
              <input type="email" id="email" v-model="email">
              <label class="white-text" for="email">Email Address</label>
            </div>
            <div class="input-field">
              <i class="material-icons prefix">lock</i>
              <input type="password" id="password" v-model="password">
              <label class="white-text" for="password">Password</label>
            </div>
            <button v-on:click="register" class="btn btn-large btn-extended grey lighten-4 black-text">Register</button>
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
  name: 'Signup',
  data: function() {
    return {
      email: '',
      password: '',
      result: ''
    };
  },
  methods: {
    register: function(e) {
      firebase
        .auth()
        .createUserWithEmailAndPassword(this.email, this.password)
        .then(
          user => {
            this.result = user;
            alert(`Account created for ${user.email}`);
            this.$router.push('/');
          },
          err => {
            alert(err.message);
          }
        );
      e.preventDefault();
      console.log(this.result);
    }
  }
};
</script>
<style>
  .login-container {
      padding: 100px 30px 30px 30px;
  }
  .login-container .row {
      margin: auto;
      width: 70%;
  }
</style>
