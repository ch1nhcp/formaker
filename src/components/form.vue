<template>
  <div>
    <label for="textarea">Form description:</label>
    <b-form-textarea
      id="textarea"
      v-model="text"
      placeholder="Enter description..."
      rows="3"
      max-rows="3"
    ></b-form-textarea>
    <hr />
    <FormField
      v-for="field in mockData"
      :key="field.id"
      v-bind:fieldDetail="field"
      v-bind:deleteField="handleDeleteField"
    />
    <b-button type="submit" variant="primary" class="text-right"
      >Add field</b-button
    >
  </div>
</template>

<script>
import FormField from "./form-field";

export default {
  name: "form",
  components: {
    FormField,
  },
  data() {
    return {
      mockData: [
        {
          id: "1",
          field_type: "radio",
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
  },
  methods: {
    handleDeleteField(index) {
      console.log(index);
      const indexToDelete = this.mockData.findIndex(
        (item) => item.id === index
      );
      this.mockData.splice(indexToDelete, 1);
    },
  },
};
</script>

<style>
</style>