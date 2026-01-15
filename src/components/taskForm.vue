<template>
  <v-dialog
    :model-value="true"
    @update:model-value="$emit('close')"
    persistent
    max-width="600px"
  >
    <v-card>
      <v-card-title tag="header" class="d-flex justify-space-between align-center ml-2">
        <h2 class="text-h5">{{ isEdit ? t.taskForm.titleEdit : t.taskForm.titleNew }}</h2>
        <v-btn
          @click="$emit('close')"
          icon="mdi-close"
          variant="text"
        ></v-btn>
      </v-card-title>
      
      <v-card-text>
        <v-form @submit.prevent="submit">
          <v-text-field
            v-model="formData.title"
            :rules="[v => !!v || t.taskForm.fieldTitleRequired]"
            :label="t.taskForm.fieldTitle"
            variant="outlined"
            maxlength="100"
            counter
            required
            class="mb-4"
          ></v-text-field>
          
          <v-textarea
            v-model="formData.description"
            :label="t.taskForm.fieldDescription"
            variant="outlined"
            rows="4"
            maxlength="500"
            counter
            class="mb-4"
          ></v-textarea>
          
          <v-select
            v-model="formData.status"
            :items="statusItems"
            :label="t.taskForm.fieldStatus"
            variant="outlined"
            item-title="text"
            item-value="value"
            required
          ></v-select>
        </v-form>
      </v-card-text>
      
      <v-card-actions tag="footer" class="mb-4">
        <v-btn
          @click="$emit('close')"
          variant="text"
        >
          {{ t.taskForm.buttonCancel }}
        </v-btn>
        <v-btn
          @click="submit"
          color="primary"
          variant="elevated"
          class="mr-4"
        >
          {{ isEdit ? t.taskForm.buttonSave : t.taskForm.buttonAdd }}
        </v-btn>
      </v-card-actions>
    </v-card>
  </v-dialog>
</template>

<script setup lang="ts">
import { ref, watch, computed } from 'vue';
import { taskStore, statusOptions } from '@stores/taskStore';
import { TaskStatus, type Task, type TaskInput } from '@models/task';
import { useTranslations } from '@/i18n';

interface Props {
  task?: Task;
}

const props = defineProps<Props>();

const store = taskStore();
const { t } = useTranslations();

const emit = defineEmits<{
  close: [];
}>();

const isEdit = computed(() => !!props.task);

const statusItems = statusOptions
  .filter(opt => opt.value !== 'all')
  .map(opt => ({ text: opt.label, value: opt.value }));

const formData = ref<TaskInput>({
  title: props.task?.title || '',
  description: props.task?.description || '',
  status: props.task?.status || TaskStatus.TODO
});

watch(() => props.task, (newTask) => {
  if (newTask) {
    formData.value = {
      title: newTask.title,
      description: newTask.description,
      status: newTask.status
    };
  } else {
    formData.value = {
      title: '',
      description: '',
      status: TaskStatus.TODO
    };
  }
}, { immediate: true });

const submit = (): void => {
  if (formData.value.title.trim()) {
    const taskInput: TaskInput = {
      ...formData.value,
      title: formData.value.title.trim(),
      description: formData.value.description.trim()
    };
    
    if (props.task) {
      store.updateTask(props.task.id, taskInput);
    } else {
      store.addTask(taskInput);
    }
    
    emit('close');
  }
};

</script>
