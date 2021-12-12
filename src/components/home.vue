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
          <td v-if="form.status === 1">Enabled</td>
          <td v-else>Disabled</td>
          <td class="d-flex justify-content-between">
            <b-button
              variant="primary"
              size="sm"
              v-b-modal.form-detail
              @click="handlePreviewForm(form.id)"
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

    <!-- preview form -->
    <b-modal id="form-detail" ok-only ok-title="Close">
      <template #modal-title>
        {{ previewingForm.name }}
      </template>
      <div>
        <p class="description">Description: {{ previewingForm.description }}</p>
        <hr />
        <b-form-group v-for="field in previewingForm.fields" :key="field.id">
          <label>{{ field.name }}:</label>
          <b-form-input v-if="field.type === 'text'"></b-form-input>
          <b-form-textarea
            v-if="field.type === 'long text'"
          ></b-form-textarea>
          <div v-if="field.type === 'radio'">
            <b-form-radio :name="field.name" v-for="option in field.options" :key="option.id">{{
              option.name
            }}</b-form-radio>
          </div>
          <div v-if="field.type === 'checkbox'">
            <b-form-checkbox v-for="option in field.options" :key="option.id">{{
              option.name
            }}</b-form-checkbox>
          </div>
          <div v-if="field.type === 'select'">
            <b-form-select :options="field.previewOptions"></b-form-select>
            
          </div>
        </b-form-group>
      </div>
    </b-modal>

    <b-button variant="outline-primary">
      <router-link class="btn--add-form" :to="'/form-config'">Add form</router-link>
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
    async handlePreviewForm(id) {
      // Sau này dùng id của form để gọi API lấy form detail rồi gán vào this.previewingForm
      console.log(id);
      let rawResponse = await fetch(`https://sleepy-falls-53919.herokuapp.com/admin/forms/${id}`)
      let response = await rawResponse.json();
      this.previewingForm = {...response.data};

      for (let field of this.previewingForm.fields) {
        if (field.options) {
          const optionsTemp = [];
          for (let option of field.options) {
            optionsTemp.push({value: option.id, text: option.name})
          }
          field.previewOptions = optionsTemp;
        }
      }
    },
    async getData() {
      try {
        let rawResponse = await fetch("https://sleepy-falls-53919.herokuapp.com/admin/forms");
        let response = await rawResponse.json();
        console.log(response);
        
        
        this.forms = [...response.data];
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
.btn--edit-form:hover, .btn--add-form:hover {
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
