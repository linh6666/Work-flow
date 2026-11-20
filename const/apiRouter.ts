export const API_ROUTE = {
  LOGIN: "/api/v1/login/access-token",
  REGISTER: "/api/v1/users/signup",
  SENDEMAIL: "/api/v1/password-recovery/{email}",
  LOGIN_USERNAME: "/api/v1/users/me",
  CHANGE_PASSWORD: "/api/v1/users/me/password",
  LOGOUT: "/api/v1/logout",
  RESET_PASSWORD: "/api/v1/reset-password/",

  ///PROJECTS - Entities - Project
  PROJECTS: "/api/v1/entities/Project",
  PROJECT_DETAIL: "/api/v1/entities/Project/{Project_id}",
  PROJECT_BULK: "/api/v1/entities/Project/bulk",
  PROJECT_UPDATE_MANY: "/api/v1/entities/Project/update-many",
  PROJECT_RESTORE: "/api/v1/entities/Project/{Project_id}/restore",

  // Chi tiết từng endpoint theo tài liệu Swagger
  PROJECT_LIST: "/api/v1/entities/Project", // GET: List Project records
  PROJECT_CREATE: "/api/v1/entities/Project", // POST: Create a Project record
  PROJECT_DELETE_MULTIPLE: "/api/v1/entities/Project", // DELETE: Delete multiple Project records
  PROJECT_BULK_UPDATE: "/api/v1/entities/Project/bulk", // PUT: Bulk update Project records
  PROJECT_BULK_CREATE: "/api/v1/entities/Project/bulk", // POST: Bulk create Project records
  PROJECT_GET_BY_ID: "/api/v1/entities/Project/{Project_id}", // GET: Get a Project record
  PROJECT_UPDATE_BY_ID: "/api/v1/entities/Project/{Project_id}", // PUT: Update a Project record
  PROJECT_DELETE_BY_ID: "/api/v1/entities/Project/{Project_id}", // DELETE: Delete a Project record

  ///PROJECT_BONUS - Entities - ProjectBonus
  PROJECT_BONUS: "/api/v1/entities/ProjectBonus",
  PROJECT_BONUS_DETAIL: "/api/v1/entities/ProjectBonus/{ProjectBonus_id}",
  PROJECT_BONUS_BULK: "/api/v1/entities/ProjectBonus/bulk",
  PROJECT_BONUS_UPDATE_MANY: "/api/v1/entities/ProjectBonus/update-many",
  PROJECT_BONUS_RESTORE: "/api/v1/entities/ProjectBonus/{ProjectBonus_id}/restore",

  // Chi tiết từng endpoint theo tài liệu Swagger
  PROJECT_BONUS_LIST: "/api/v1/entities/ProjectBonus", // GET: List ProjectBonus records
  PROJECT_BONUS_CREATE: "/api/v1/entities/ProjectBonus", // POST: Create a ProjectBonus record
  PROJECT_BONUS_DELETE_MULTIPLE: "/api/v1/entities/ProjectBonus", // DELETE: Delete multiple ProjectBonus records
  PROJECT_BONUS_BULK_UPDATE: "/api/v1/entities/ProjectBonus/bulk", // PUT: Bulk update ProjectBonus records
  PROJECT_BONUS_BULK_CREATE: "/api/v1/entities/ProjectBonus/bulk", // POST: Bulk create ProjectBonus records
  PROJECT_BONUS_GET_BY_ID: "/api/v1/entities/ProjectBonus/{ProjectBonus_id}", // GET: Get a ProjectBonus record
  PROJECT_BONUS_UPDATE_BY_ID: "/api/v1/entities/ProjectBonus/{ProjectBonus_id}", // PUT: Update a ProjectBonus record
  PROJECT_BONUS_DELETE_BY_ID: "/api/v1/entities/ProjectBonus/{ProjectBonus_id}", // DELETE: Delete a ProjectBonus record

  ///DEPT_PROJECT_FORM - Entities - DeptProjectForm
  DEPT_PROJECT_FORM_LIST: "/api/v1/entities/DeptProjectForm", // GET: List DeptProjectForm records
  DEPT_PROJECT_FORM_CREATE: "/api/v1/entities/DeptProjectForm", // POST: Create DeptProjectForm record
  DEPT_PROJECT_FORM_UPDATE: "/api/v1/entities/DeptProjectForm/{DeptProjectForm_id}", // PUT: Update DeptProjectForm record
  DEPT_PROJECT_FORM_DELETE: "/api/v1/entities/DeptProjectForm/{DeptProjectForm_id}", // DELETE: Delete DeptProjectForm record

  ///COMPETENCY_FRAMEWORK - Entities - CompetencyFramework
  COMPETENCY_FRAMEWORK_LIST: "/api/v1/entities/CompetencyFramework",

  ///INTERVIEW_EVALUATION - Entities - InterviewEvaluation
  INTERVIEW_EVALUATION_LIST: "/api/v1/entities/InterviewEvaluation",
  INTERVIEW_EVALUATION_UPDATE: "/api/v1/entities/InterviewEvaluation/{InterviewEvaluation_id}",
  INTERVIEW_EVALUATION_DELETE: "/api/v1/entities/InterviewEvaluation/{InterviewEvaluation_id}",
};
