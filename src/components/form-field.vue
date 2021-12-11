<template>
  <div>
    <b-row>
      <b-col cols="10">
        <b-card>
          <b-form>
            <b-form-group
              :id="fieldDetail.id+'--field-type'"
              label="Field type:"
              :label-for="fieldDetail.id+'--field-type'"
            >
              <b-form-select
                v-model="fieldDetail.field_type"
                :options="fieldTypeOptions"
                required
              ></b-form-select>
            </b-form-group>

            <b-form-checkbox value=true unchecked-value=false v-model="fieldDetail.required"
              >Required?</b-form-checkbox
            >

            <b-form-group
              :id="fieldDetail.id+fieldDetail.name"
              label="Field name:"
              :label-for="fieldDetail.id+fieldDetail.name"
            >
              <b-form-input
                id="input-2"
                v-model="fieldDetail.fieldName"
                placeholder="Enter name"
                required
              ></b-form-input>
            </b-form-group>

            <b-form-group
              v-if="
                fieldDetail.field_type == 'radio' ||
                fieldDetail.field_type == 'select' ||
                fieldDetail.field_type == 'checkbox'
              "
            >
              <div>Options</div>

              <div v-for="(option, index) in fieldDetail.options" :key="option">
                <b-row class="my-2">
                  <b-col>
                    <b-form-input
                      v-model="fieldDetail.options[index]"
                    ></b-form-input
                  ></b-col>
                  <b-col>
                    <b-button
                      variant="danger"
                      @click="handleDeleteOption(index)"
                      >Delete option</b-button
                    >
                  </b-col>
                </b-row>
              </div>

              <!-- Add option -->
              <b-button variant="outline-primary" @click="handleAddField"
                >Add option</b-button
              >
            </b-form-group>
          </b-form>
        </b-card>
      </b-col>
      <b-col>
        <b-button type="delete" variant="danger" @click="handleDeleteField"
          >Delete</b-button
        >
      </b-col>
    </b-row>

    <hr />
  </div>
</template>

<script>
export default {
  name: "FormField",
  data() {
    return {
      fieldTypeOptions: [
        "text",
        "long text",
        "radio",
        "checkbox",
        "select",
        "number",
        "url",
        "email",
      ],
    };
  },
  props: { fieldDetail: Object, deleteField: Function},
  methods: {
    handleAddField() {
      // alert("clicked!");
      this.fieldDetail.options.push("");
    },
    handleDeleteOption(index) {
      this.fieldDetail.options.splice(index, 1);
    },
    handleDeleteField() {
      this.deleteField(this.fieldDetail.id);
    }

  },

  mounted() {
    console.log(this.fieldDetail);
  },
};
</script>

<style scoped>
</style>