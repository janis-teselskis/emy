export const lv = {
  app: {
    title: 'Uzdevumu dēlis',
    addTask: 'Pievienot uzdevumu'
  },
  task: {
    createdAt: 'Izveidots:',
    updatedAt: 'Atjaunots:',
    confirmDelete: 'Vai tiešām vēlaties dzēst uzdevumu'
  },
  taskForm: {
    titleEdit: 'Rediģēt uzdevumu',
    titleNew: 'Jauns uzdevums',
    fieldTitle: 'Nosaukums *',
    fieldTitleRequired: 'Nosaukums ir obligāts',
    fieldDescription: 'Apraksts',
    fieldStatus: 'Status *',
    buttonCancel: 'Atcelt',
    buttonSave: 'Saglabāt',
    buttonAdd: 'Pievienot'
  },
  taskFilter: {
    searchPlaceholder: 'Meklēt pēc nosaukuma vai apraksta...'
  },
  taskSection: {
    noTasks: 'Nav uzdevumu'
  },
  status: {
    all: 'Visi',
    todo: 'Darāms',
    inProgress: 'Procesā',
    done: 'Pabeigts'
  }
} as const;

export type Translations = typeof lv;
