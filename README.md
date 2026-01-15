## Projekta struktūra

```
/
├── public/              # iemetu favikonu, kuru aizņēmos no Emy Solutions mājaslapas
├── src/
│   ├── components/      # komponentes
│   │   ├── taskFilter.vue
│   │   ├── taskForm.vue
│   │   ├── task.vue
│   │   └── taskSection/ (atsevišķā mapē, jo šai ir arī savs "scoped" stila fails, kuru izdalīju atsevišķā failā)
│   ├── helpers/         # Palīgfunkcijas
│   │   └── date-utils.ts
│   ├── i18n/           # Lokalizācija
│   │   ├── index.ts
│   │   └── lv.ts
│   ├── models/         # Datu modeļi
│   │   └── task.ts
│   ├── stores/         # Pinia store (iekļāvu tur arī centralizētu vietu, kur visi statusi un to 
|   |   |                nosaukumi, ja parādītos jauns statuss, tad tikai vienā vietā vajadzētu mainīt)
│   │   └── taskStore.ts
│   ├── app.vue         # Galvenais aplikācijas komponents
│   └── styles.scss     # Globālie stili
├── index.html
├── package.json
├── tsconfig.json
├── tsconfig.node.json
└── vite.config.ts
```

## Izmantotās tehnoloģijas (tas kas uzdevumā ar bija prasīts)

### Pamata bibliotēkas
- **Vue 3**
- **TypeScript**
- **Pinia**
- **Vuetify 3** Material Design komponentes. Izmantoju visu gatavu un neko nemodificēju.

### Papildus
- **vite-plugin-vuetify** - Lai ielādē tikai izmantotās komponentes un stilus

### Ikonas
- **@mdi/font** - Material Design Icons - tāpēc 

