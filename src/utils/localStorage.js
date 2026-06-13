export const getStudents = () => {
  const data = localStorage.getItem('students');
  return data ? JSON.parse(data) : [];
};

export const saveStudents = (students) => {
  localStorage.setItem('students', JSON.stringify(students));
};

export const getSecretOrder = () => {
  const data = localStorage.getItem('secretOrder');
  return data ? JSON.parse(data) : [];
};

export const saveSecretOrder = (order) => {
  localStorage.setItem('secretOrder', JSON.stringify(order));
};
