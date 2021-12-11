<template>
  <div>
    <table class="table table-bordered">
      <colgroup>
        <col class="col-3" />
        <col class="col-5" />
        <col class="col-1" />
        <col class="col-3" />
      </colgroup>
      <thead>
        <tr>
          <th>Form name</th>
          <th>Description</th>
          <th>Status</th>
          <th>Actions</th>
        </tr>
      </thead>
      <tbody>
        <tr v-for="form in forms" :key="form.id">
          <td>{{ form.name }}</td>
          <td>{{ form.description }}</td>
          <td>{{ form.status }}</td>
          <td class="d-flex justify-content-between">
            <b-button variant="primary" size="sm">View</b-button>
            <b-button variant="secondary" size="sm"
              ><router-link :to="'/form-config?id=' + form.id"
                >Edit</router-link
              ></b-button
            >
            <b-button
              variant="danger"
              size="sm"
              @click="handleDeleteForm(form.id)"
              >Delete</b-button
            >
          </td>
        </tr>
      </tbody>
    </table>
    <b-button variant="primary">
      <router-link :to="'/form-config'">Add form</router-link>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "home",
  data: () => {
    return {
      fields: ["name", "description", "status"],
      forms: [],
    };
  },
  props: { deleteForm: Function },
  methods: {
    handleDeleteForm(id) {
      const indexToDelete = this.forms.findIndex((item) => item.id === id);
      this.forms.splice(indexToDelete, 1);
    },
    async getData() {
      try {
        // let response = await fetch("http://jsonplaceholder.typicode.com/posts");
        // this.forms = await response.json();
        let data = {
          success: true,
          data: {
            list: [
              {
                id: 1,
                name: "Form1",
                description: "",
                status: "enabled",
              },
              {
                id: 2,
                name: "Form 2",
                description: "",
                status: "disabled",
              },
            ],
            count: 10,
          },
        };
        this.forms = data.data.list;
      } catch (error) {
        console.log(error);
      }
    },
  },
  created() {
    this.getData();
    console.log(this.forms);
  },
};
</script>

<style scoped>
a {
  text-decoration: none;
  color: white;
}
th {
  text-align: center;
}
</style>
