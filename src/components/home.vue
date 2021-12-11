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
            <b-button
              variant="primary"
              size="sm"
              v-b-modal.form-detail
              @click="handlePreviewForm"
              >View</b-button
            >
            <b-button variant="secondary" size="sm"
              ><router-link
                class="btn--edit-form"
                :to="'/form-config?id=' + form.id"
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

    <b-modal id="form-detail" ok-only ok-title="Close">
      <template #modal-title>
        {{ previewingForm.name }}
      </template>
      <div>
        <p class="description">Description: {{ previewingForm.description }}</p>
        <hr />
        <b-form-group v-for="field in previewingForm.fields" :key="field.id">
          <label>{{ field.fieldName }}:</label>
          <b-form-input v-if="field.field_type === 'text'"></b-form-input>
          <b-form-textarea
            v-if="field.field_type === 'long text'"
          ></b-form-textarea>
          <div v-if="field.field_type === 'radio'">
            <b-form-radio v-for="option in field.options" :key="option">{{
              option
            }}</b-form-radio>
          </div>
          <div v-if="field.field_type === 'checkbox'">
            <b-form-checkbox v-for="option in field.options" :key="option">{{
              option
            }}</b-form-checkbox>
          </div>
          <div v-if="field.field_type === 'select'">
            <b-form-select :options="field.options"></b-form-select>
          </div>
        </b-form-group>
      </div>
    </b-modal>

    <b-button variant="outline-primary">
      <router-link :to="'/form-config'">Add form</router-link>
    </b-button>
  </div>
</template>

<script>
export default {
  name: "Home",
  data: () => {
    return {
      fields: ["name", "description", "status"],
      forms: [],
      previewingForm: {
        id: "",
        name: "",
        description: "",
        fields: [],
      },
    };
  },
  props: { deleteForm: Function },
  methods: {
    handleDeleteForm(id) {
      const indexToDelete = this.forms.findIndex((item) => item.id === id);
      this.forms.splice(indexToDelete, 1);
    },
    handlePreviewForm(id) {
      // Sau này dùng id của form để gọi API lấy form detail rồi gán vào this.previewingForm

      this.previewingForm = {
        id: "1",
        name: "Form 1",
        description: "Some description",
        fields: [
          {
            id: "1",
            field_type: "select",
            options: ["a", "b", "c"],
            fieldName: "Gender",
            required: true,
          },
          {
            id: "2",
            field_type: "text",
            options: [],
            fieldName: "Address",
            required: false,
          },
        ],
      };
      console.log(id);
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
                name: "Form 1",
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
  },
};
</script>

<style>
.btn--edit-form {
  color: white;
}
.btn--edit-form:hover {
  text-decoration: none;
  color: white;
}
th {
  text-align: center;
}
.description {
  font-style: italic;
}
</style>
