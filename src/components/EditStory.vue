<template>
  <b-row class="edit-story-container">
    <b-col cols="12">
      <h2>
        Edit Story
        <router-link :to="{ name: 'ShowStory', params: { id: key } }">
            <b-button variant="outline-dark" class="float-right">Show Story</b-button>
        </router-link>
      </h2>
      <b-jumbotron>
        <b-form @submit="onSubmit">
            <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Story No">
                <b-form-input id="storyNo" v-model.trim="story.storyNo"></b-form-input>
            </b-form-group>
          <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Title">
            <b-form-input id="title" v-model.trim="story.title"></b-form-input>
          </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Type">
                <b-form-radio-group v-model="story.type" :options="storyTypes" name="radio-inline"></b-form-radio-group>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Github Commit">
                <b-form-input id="commit" v-model.trim="story.commit"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Github Branch">
                <b-form-input id="branch" v-model.trim="story.branch"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Release">
                <b-form-input id="release" v-model.trim="story.release"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Status">
                <b-form-select v-model="story.status" :options="options"></b-form-select>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Developer">
                <b-form-input id="developer" v-model.trim="story.developer"></b-form-input>
            </b-form-group>
            <b-form-group id="fieldsetHorizontal"
                    horizontal
                    :label-cols="4"
                    breakpoint="md"
                    label="Description">
                <b-form-textarea id="fieldsetHorizontal"
                         v-model="story.description"
                         placeholder="Enter something"
                         :rows="2"
                         :max-rows="6">{{story.description}}</b-form-textarea>
            </b-form-group>
          <b-button type="submit" variant="primary">Update</b-button>
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../Firebase'
import router from '../router'

export default {
  name: 'EditStory',
  data () {
    return {
        key: this.$route.params.id,
        story: {},
        options: [
            { value: '', text: 'Please select some item' },
            { value: 'Start', text: 'Start' },
            { value: 'In Progress', text: 'In Progress' },
            { value: 'FE Finished', text: 'FE Finished' },
            { value: 'QA Validated', text: 'QA Validated'},
            { value: 'E2E triggered', text: 'E2E triggered' },
            { value: 'Merged', text: 'Merged' }
        ],
        storyTypes: [
          { value: 'Bug', text: 'Bug' },
          { value: 'Improvement', text: 'Improvement' },
          { value: 'Feature', text: 'Feature' }
        ]
    }
  },
  created () {
    const ref = firebase.firestore().collection('stories').doc(this.$route.params.id);
    ref.get().then((doc) => {
      if (doc.exists) {
        this.story = doc.data();
      } else {
        alert("No such document!");
      }
    });
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()
      const updateRef = firebase.firestore().collection('stories').doc(this.$route.params.id);
      updateRef.set(this.story).then(() => {
        this.key = ''
        this.story.storyNo = ''
        this.story.title = ''
        this.story.description = ''
        this.story.developer = ''
        this.story.release = ''
        this.story.status = ''
        this.story.type = ''
        this.story.branch = ''
        this.story.date = ''
        this.story.releaseDate = ''
        this.story.commit = ''
        router.push({ name: 'ShowStory', params: { id: this.$route.params.id }})
      })
      .catch((error) => {
        alert("Error adding document: ", error);
      });
    }
  }
}
</script>

<style>
   .edit-story-container {
      padding: 70px 30px 30px 30px;
  }
  .edit-story-container .jumbotron {
    padding: 2rem;
    width: 80%;
    margin: 20px auto;
  }
</style>