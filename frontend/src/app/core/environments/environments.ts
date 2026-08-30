export const environment = {
  production: false,

  authorizationApiRegisterUrl: 'http://localhost:3000/auth/register',
  authorizationApiLoginUrl: 'http://localhost:3000/auth/login',

  createNewDayApiUrl: 'http://localhost:3000/day/createDayForUser',
  getDaysListForUserApiUrl: 'http://localhost:3000/day/getDaysForUser',
  deleteDayApiUrl: 'http://localhost:3000/day/deleteDayForUser',

  getDailyNotesForDayApiUrl: 'http://localhost:3000/dailynotes/getListDailyNotesForDay',
  createNewDailyNoteApiUrl: 'http://localhost:3000/dailynotes/createDailyNoteForUserAndDay',

  getAllCategoriesApiUrl: 'http://localhost:3000/category/getListOfCategories',
  
  

};