export const environment = {
  production: false,

  authorizationApiRegisterUrl: 'http://localhost:3000/auth/register',
  authorizationApiLoginUrl: 'http://localhost:3000/auth/login',

  createNewDayApiUrl: 'http://localhost:3000/day/createDayForUser',
  getDaysListForUserApiUrl: 'http://localhost:3000/day/getDaysForUser',
  deleteDayApiUrl: 'http://localhost:3000/day/deleteDayForUser',

  getDailyNotesForDayApiUrl: 'http://localhost:3000/dailynotes/getListDailyNotesForDay',
  createNewDailyNoteApiUrl: 'http://localhost:3000/dailynotes/createDailyNoteForUserAndDay',
  updateNotesPrioritiesApiUrl: 'http://localhost:3000/dailynotes/updatePriorities',
  updateDailyNoteCategoryApiUrl: 'http://localhost:3000/dailynotes/updateCategoryForDailyNote',
  deleteDailyNoteApiUrl: 'http://localhost:3000/dailynotes/deleteDailyNote',
  finishDailyNoteApiUrl: 'http://localhost:3000/dailynotes/finishDailyNote',
  updateDailyNoteApiUrl: 'http://localhost:3000/dailynotes/updateDailyNoteForUser',

  getListOfGeneralNotesForUserApiUrl: 'http://localhost:3000/generalnotes/getListOfGeneralNotesForUser',
  createGeneralNoteApiUrl: 'http://localhost:3000/generalnotes/createGeneralNote',
  updateGeneralNoteApiUrl: 'http://localhost:3000/generalnotes/updateGeneralNote',
  solveGeneralNoteApiUrl: 'http://localhost:3000/generalnotes/solveGeneralNote',
  deleteGeneralNoteApiUrl: 'http://localhost:3000/generalnotes/deleteGeneralNote',
  updateCategoryForGeneralNoteApiUrl: 'http://localhost:3000/generalnotes/updateCategoryForGeneralNote',

  getAllCategoriesApiUrl: 'http://localhost:3000/category/getListOfCategories',

};