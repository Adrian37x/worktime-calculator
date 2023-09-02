export const toTimeString = (date) => `${("0" + date.getHours()).slice(-2)}:${("0" + date.getMinutes()).slice(-2)}`;
export const toDate = (time) => new Date(`${new Date().toDateString()} ${time}`);
