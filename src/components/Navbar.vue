<template>
<div>
  <b-navbar toggleable="lg" type="dark" variant="info">
    <b-navbar-brand href="#"><img alt="Vue logo" src="../assets/logo.png" width="30" height="30"> Control Project</b-navbar-brand>

    <b-navbar-toggle target="nav-collapse"></b-navbar-toggle>

    <b-collapse id="nav-collapse" is-nav>
      <b-navbar-nav>
        <b-nav-item v-if="isLoggedIn" href="#/">Dashboard</b-nav-item>
        <!-- <b-nav-item v-if="isLoggedIn" href="#" disabled>Disabled</b-nav-item> -->
      </b-navbar-nav>

      <!-- Right aligned nav items -->
      <b-navbar-nav class="ml-auto">
        <!-- <b-nav-form>
          <b-form-input size="sm" class="mr-sm-2" placeholder="Search"></b-form-input>
          <b-button size="sm" class="my-2 my-sm-0" type="submit">Search</b-button>
        </b-nav-form> -->

        <!-- <b-nav-item-dropdown text="Lang" right>
          <b-dropdown-item href="#">EN</b-dropdown-item>
          <b-dropdown-item href="#">ES</b-dropdown-item>
          <b-dropdown-item href="#">RU</b-dropdown-item>
          <b-dropdown-item href="#">FA</b-dropdown-item>
        </b-nav-item-dropdown> -->

        <b-nav-item-dropdown right>
          <!-- Using 'button-content' slot -->
          <template slot="button-content"><em>User</em></template>
          <b-dropdown-item href="#">Profile</b-dropdown-item>
          <b-dropdown-item href="#">Sign Out</b-dropdown-item>
        </b-nav-item-dropdown>
      </b-navbar-nav>
      <ul class="right">
        <li v-if="isLoggedIn"><span class="email black-text">{{currentUser}}</span></li>
        <li v-if="!isLoggedIn"><router-link to="/login">Login</router-link></li>
        <li v-if="!isLoggedIn"><router-link to="/signup">Sign up</router-link></li>
        <li v-if="isLoggedIn"><button v-on:click="logout" class="btn black white-text">Logout</button></li>
      </ul>
    </b-collapse>
  </b-navbar>
</div>

  </template>

<script>
import firebase from 'firebase';
export default {
  name: 'Navbar',
  data() {
    return {
      isLoggedIn: false,
      currentUser: false
    };
  },
  created() {
      //debugger;
      console.log(firebase.auth().currentUser);
    if (firebase.auth().currentUser) {
        alert(firebase.auth().currentUser);
      this.isLoggedIn = true;
      this.currentUser = firebase.auth().currentUser.email;
    }
  },
  methods: {
    logout: function() {
      firebase
        .auth()
        .signOut()
        .then(() => {
          this.$router.go({ path: this.$router.path });
        });
    }
  }
};
</script>

<style scoped>
.email {
  padding-right: 10px;
}
</style>