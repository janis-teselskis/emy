<template>
  <v-card 
    tag="section"
    elevation="2"
    :class="{ 'drag-over': isDragOver }"
    @dragover.prevent="onDragOver"
    @dragleave="onDragLeave"
    @drop="onDrop"
  >
    <v-card-title tag="header" class="d-flex justify-space-between align-center bg-grey-lighten-4">
      <h3 class="text-h6">{{ title }}</h3>
      <v-chip size="small" color="grey-darken-2">{{ tasks.length }}</v-chip>
    </v-card-title>
    
    <v-card-text class="pa-4" style="min-height: 200px;">
      <task
        v-for="task in tasks"
        :key="task.id"
        :task="task"
        @edit="$emit('edit', $event)"
        @delete="$emit('delete', $event)"
        @drag-start="onTaskDragStart"
      />
      <v-alert 
        v-if="tasks.length === 0" 
        type="info" 
        variant="tonal"
        density="compact"
        class="text-center"
      >
        {{ t.taskSection.noTasks }}
      </v-alert>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { ref, computed } from 'vue';
import { taskStore, statusOptions } from '@stores/taskStore';
import task from '@components/task.vue';
import type { Task } from '@models/task';
import { TaskStatus } from '@models/task';
import { useTranslations } from '@/i18n';

defineOptions({
  components: { task }
});

interface Props {
  status: TaskStatus;
}

const props = defineProps<Props>();

const store = taskStore();
const { t } = useTranslations();
const tasks = computed(() => store.tasksByStatus(props.status));

const title = computed(() => {
  const option = statusOptions.find(opt => opt.value === props.status);
  return option?.label ?? '';
});

const emit = defineEmits<{
  edit: [task: Task];
  delete: [id: string];
  moveTask: [taskId: string, newStatus: TaskStatus];
}>();

const isDragOver = ref(false);

const onDragOver = (event: DragEvent): void => {
  event.preventDefault();
  isDragOver.value = true;
};

const onDragLeave = (): void => {
  isDragOver.value = false;
};

const onDrop = (event: DragEvent): void => {
  event.preventDefault();
  isDragOver.value = false;

  const taskId = event.dataTransfer?.getData('taskId');
  if (taskId) {
    emit('moveTask', taskId, props.status);
  }
};

const onTaskDragStart = (): void => {
  // Handle drag start if needed
};
</script>

<style scoped src="./taskSection-style.scss"></style>
