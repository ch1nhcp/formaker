<template>
  <div>
    <label for="form-name">Form name:</label>
    <b-form-input
      id="form-name"
      v-model="mockData.name"
      placeholder="Enter form name"
    ></b-form-input>
    <hr />
    <label for="form-description">Form description:</label>
    <b-form-textarea
      id="form-description"
      v-model="mockData.description"
      placeholder="Enter description..."
      rows="3"
      max-rows="3"
    ></b-form-textarea>
    <hr />
    <div>
      <label>Form fields:</label>
      <FormField
        v-for="field in mockData.fields"
        :key="field.id"
        v-bind:fieldDetail="field"
        v-bind:deleteField="handleDeleteField"
      />
      <b-button type="submit" variant="primary" class="text-right"
        >Add field</b-button
      >
    </div>
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
      mockData: {
        id: "1",
        name: "Form 1",
        description: "Some description",
        fields: [
          {
            id: "1",
            field_type: "radio",
            options: ["a", "b", "c"],
            fieldName: "Gender",
            required: "true",
          },
          {
            id: "2",
            field_type: "text",
            options: [],
            fieldName: "Address",
            required: "false",
          },
        ]
      },
    };
  },
  methods: {
    handleDeleteField(id) {
      const indexToDelete = this.mockData.fields.findIndex(
        (item) => item.id === id
      );
      this.mockData.fields.splice(indexToDelete, 1);
    },
  },
};
</script>

<style>
</style>