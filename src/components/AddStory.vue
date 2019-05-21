<template>
  <b-row class="add-story-container">
    <b-col cols="12">
      <h2>
        Add New Story
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
          <b-button type="submit" variant="primary">Save</b-button>
          <!-- <b-button type="button" variant="primary" @click="submitAll">Bulk Save</b-button> -->
        </b-form>
      </b-jumbotron>
    </b-col>
  </b-row>
</template>

<script>

import firebase from '../Firebase'
import router from '../router'

export default {
  name: 'AddStory',
  data () {
    return {
        ref: firebase.firestore().collection('stories'),
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
        ],
        story: {
            storyNo: '',
            title: '',
            description : '',
            developer : '',
            release : '',
            status : '',
            type : '',
            branch : '',
            date : '',
            releaseDate : '',
            commit : ''
        }
    }
  },
  methods: {
    onSubmit (evt) {
      evt.preventDefault()

      this.ref.add(this.story).then(() => {
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
        router.push({
          name: 'StoryList'
        })
      })
      .catch((error) => {
        alert("Error adding document: ", error);
      });
    },

    submitAll() {
 let data = [
  {
    "storyNo": "UNIFI-3306",
    "title": "Adobe async import - phase 2",
    "type": "bug",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/ff04a77b76499d318c110a45bdbcdd8683e581e5",
    "branch": "feature/UNIFI-3306_Adobe_async_import_phase_2",
    "release": 3.4,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3263",
    "title": "AEP - CSV Datasets show schema",
    "type": "bug",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/59f5ed12e07365cbb8730a5faf7f604ff0e7dcd5",
    "branch": "feature/UNIFI-3263_CSV_Datasets_show_schema",
    "release": 3.3,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3242",
    "title": "Schema Information for XDM Dataset is not displayed for a non-admin user",
    "type": "bug",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/59f5ed12e07365cbb8730a5faf7f604ff0e7dcd5",
    "branch": "feature/UNIFI-3242_adobe-summit-fe-combined-off-develop",
    "release": 3.3,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3393",
    "title": "Dropdown Flickering issues across app",
    "type": "bug",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/4f12d29382b1d1197925ec1c1be5ae63c27bdda9",
    "branch": "feature/UNIFI-3393_Dropdown_Flickering",
    "release": 3.4,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3221",
    "title": "Complex filtering issues depends on BE fixes",
    "type": "improvement",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/05b5cc1386ca66fa2559826657228acbbcb624c9",
    "branch": "feature/UNIFI-3221_Complex_filtering_issues_depends_on_BE_fixes",
    "release": 3.4,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3390",
    "title": "Activity -When ctas job is failed",
    "type": "sql details are not shown in logs unless user switch to different tabs & revisit",
    "commit": "bug",
    "branch": "https://github.com/unifi-software-inc/unifing/commit/5086278481655ef18e9ecef2c46383482655833a",
    "release": "feature/UNIFI-3390_Activity_when_ctas_job_is_failed",
    "description": 3.4,
    "status": "",
    "developer": "Merged"
  },
  {
    "storyNo": "UNIFI-3409",
    "title": "Blank page is displayed when login reroute is hit",
    "type": "bug",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/c31309a38f676e5eaa7f04923b7cb2e9fcaafcdd",
    "branch": "feature/UNIFI-3409_Blank_page_is_displayed_when_login_reroute_is_hit",
    "release": 3.4,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3376",
    "title": "Refactor import metadata calls",
    "type": "improvement",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/5c5815f2e73eea590fbdf596c9dd5425e0801e27",
    "branch": "feature/UNIFI-3376_refactor_import_metadata_calls",
    "release": 3.4,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3441",
    "title": "FE change needed: workflow schedule response notify_list changed to email_notify_list",
    "type": "improvement",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/26cd0a8e5b66a0352bc8b9f7f857c3b68cbe4147",
    "branch": "feature/UNIFI-3441_FE_change_needed",
    "release": 3.4,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3432",
    "title": "Sample Stats API returns 'List index out of range' for a specific Adobe Dataset.",
    "type": "bug",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/f37362756b484250992fd21934afa87cef00ea0c",
    "branch": "feature/UNIFI-3432_Sample_Stats_API_returns",
    "release": 3.4,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3216",
    "title": "Add/Edit related datasets along with join conditions",
    "type": "feature",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/3f318e998ef18bd5915326cd7c0d4305d50dd08f",
    "branch": "feature/UNIFI-3216-adobe-summit-fe-combined-final-with-joins-ver1",
    "release": 3.4,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3442",
    "title": "Columns are hidden when schema browser is opened in Dataset Sample Data.",
    "type": "bug",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/d1d37f98b4213085bcad143e87e3157fd768d830",
    "branch": "feature/UNIFI-3442_Columns_are_hidden",
    "release": 3.4,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3470",
    "title": "Permission info is not visible for Admin users when ACS flag is turned on.",
    "type": "bug",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/e83905fbdc7e85aca47354e36cf1453bc5165f64",
    "branch": "feature/UNIFI-3470_Permission_info_is_not_visible",
    "release": 3.4,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3509",
    "title": "`Create dataset modal - Upload file button doesn't function when user comes from file system creation",
    "type": "bug",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/08fd385c57fee916a998905040e6ddd57ee0ff9f",
    "branch": "feature/UNIFI-3509_Upload_file_button_doesnt_function",
    "release": 3.4,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3515",
    "title": "Request tab in notification is hidden when ACS flag is turned on.",
    "type": "bug",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/e74ef77e18230f4dcf9f87a1e590a2651d3c058b",
    "branch": "feature/UNIFI-3515_Request_tab_in_notification_is_hidden",
    "release": 3.4,
    "description": "",
    "status": "Merged",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3514",
    "title": "Column name is blank in columnar view for CSV file datasets.",
    "type": "bug",
    "commit": "https://github.com/unifi-software-inc/unifing/commit/1a71d67160d9dd0052a87fde3517a945a68bc054",
    "branch": "feature/UNIFI-3514_Column_name_is_blank",
    "release": 3.4,
    "description": "",
    "status": "E2E",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3520",
    "title": "Business glossary should be hidden if ACS flag turn on",
    "type": "improvement",
    "commit": "",
    "branch": "feature/UNIFI-3520_Business_glossary_should_be_hidden",
    "release": 3.4,
    "description": "",
    "status": "E2E",
    "developer": "Hamid"
  },
  {
    "storyNo": "UNIFI-3466",
    "title": "Add new related dataset",
    "type": "improvement",
    "commit": "",
    "branch": "feature/UNIFI-3466_Add_new_related_dataset",
    "release": 3.4,
    "description": "",
    "status": "E2E",
    "developer": "Hamid"
  }
];
    for (let i=0; i< data.length; i++) {
      this.ref.add(data[i]).then(() => {

      })
      .catch((error) => {
        alert("Error adding document: ", error);
      });
    }
    }
  }
}
</script>

<style>
  .add-story-container {
      padding: 70px 30px 30px 30px;
  }
  .add-story-container .jumbotron {
    padding: 2rem;
    width: 80%;
    margin: 20px auto;
  }
</style>