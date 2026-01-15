<template>
  <v-card 
    tag="article"
    class="mb-3" 
    elevation="2"
    draggable="true" 
    @dragstart="onDragStart"
  >
    <v-card-title tag="header" class="d-flex justify-space-between align-center pb-2">
      <span class="text-h6 text-truncate text-with-actions">{{ task.title }}</span>
      <nav class="flex-shrink-0">
        <v-btn 
          @click="$emit('edit', task)" 
          icon="mdi-pencil"
          variant="text"
          size="small"
          density="comfortable"
        ></v-btn>
        <v-btn 
          @click="confirmDelete" 
          icon="mdi-delete"
          variant="text"
          size="small"
          density="comfortable"
          color="error"
        ></v-btn>
      </nav>
    </v-card-title>
    
    <v-card-text v-if="task.description" class="pb-2">
      <div class="text-truncate">{{ task.description }}</div>
    </v-card-text>
    
    <v-card-text tag="footer" class="pt-2">
      <v-divider class="mb-2"></v-divider>
      <div class="text-caption text-medium-emphasis">
        <p class="text-truncate">{{ t.task.createdAt }} <time :datetime="createdAtISO">{{ formatDate(task.createdAt, 'dd.MM.yyyy HH:mm') }}</time></p>
        <p v-if="task.updatedAt !== task.createdAt" class="text-truncate">
          Atjaunots: <time :datetime="updatedAtISO">{{ formatDate(task.updatedAt, 'dd.MM.yyyy HH:mm') }}</time>
        </p>
      </div>
    </v-card-text>
  </v-card>
</template>

<script setup lang="ts">
import { computed } from 'vue';
import type { Task } from '@models/task';
import { dateUtils } from '@helpers/date-utils';
import { useTranslations } from '@/i18n';

interface Props {
  task: Task;
}

const props = defineProps<Props>();

const emit = defineEmits<{
  edit: [task: Task];
  delete: [id: string];
  dragStart: [task: Task];
}>();

const { formatDate, toISOString } = dateUtils();
const { t } = useTranslations();

const createdAtISO = computed(() => toISOString(props.task.createdAt));
const updatedAtISO = computed(() => toISOString(props.task.updatedAt));

const onDragStart = (event: DragEvent): void => {
  if (event.dataTransfer) {
    event.dataTransfer.effectAllowed = 'move';
    event.dataTransfer.setData('taskId', props.task.id);
  }
  emit('dragStart', props.task);
};

const confirmDelete = (): void => {
  if (confirm(`${t.task.confirmDelete} "${props.task.title}"?`)) {
    emit('delete', props.task.id);
  }
};

</script>
