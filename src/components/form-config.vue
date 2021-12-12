<template>
  <div>
    <label for="form-name">Form name:</label>
    <b-form-input
      id="form-name"
      v-model="edittingForm.name"
      placeholder="Enter form name"
    ></b-form-input>
    <hr />
    <label for="form-description">Form description:</label>
    <b-form-textarea
      id="form-description"
      v-model="edittingForm.description"
      placeholder="Enter description..."
      rows="3"
      max-rows="3"
    ></b-form-textarea>
    <hr />
    <div>
      <label>Form fields:</label>
      <FormField
        v-for="field in edittingForm.fields"
        :key="field.id"
        v-bind:fieldDetail="field"
        v-bind:deleteField="handleDeleteField"
      />
      <b-button
        type="submit"
        variant="primary"
        class="text-center"
        @click="handleAddField"
      >
        <i class="far fa-plus-square mx-2"></i>Add field</b-button
      >
    </div>
    <hr />
    <b-button
      type="submit"
      variant="primary"
      class="float-right"
      @click="handleSubmit"
    >
      <i class="far fa-save mx-2"></i>Save Form</b-button
    >
  </div>
</template>

<script>
import FormField from "./form-field";

export default {
  name: "FormConfig",
  components: {
    FormField,
  },
  data() {
    return {
      edittingForm: {
        id: "",
        name: "",
        description: "",
        fields: [],
      },
    };
  },
  methods: {
    handleDeleteField(id) {
      const indexToDelete = this.edittingForm.fields.findIndex(
        (item) => item.id === id
      );
      this.edittingForm.fields.splice(indexToDelete, 1);
    },

    handleAddField() {
      this.edittingForm.fields.push({
        id: toString(new Date().getTime()),
        type: "",
        options: [""],
        fieldName: "",
        required: "false",
      });
    },

    handleSubmit() {
      console.log("Submit form successfully!");
    },

    async getData() {
      if (this.$route.query.id) {
        let rawResponse = await fetch(`https://sleepy-falls-53919.herokuapp.com/admin/forms/${this.$route.query.id}`);
        let response = await rawResponse.json();
        console.log(response);
        this.edittingForm = {...response.data};
      }
    }
  },

  created() {
    this.getData();
  }
};
</script>

<style></style>
