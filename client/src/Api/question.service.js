import instance from "./Axios";

export const questionService = {
  // CREATE
  postQuestion: (data) => instance.post("/questions/askquestion", data),

  // READ
  getAllQuestions: () => instance.get("/questions/getallquestions"),
  
  // UPDATE
  updateQuestion: (id, data) => instance.patch(`/questions/updatequestion/${id}`, data),

  // DELETE
  deleteQuestion: (id) => instance.delete(`/questions/deletequestion/${id}`),
};