export const timeStampToDate = (time:any) => {
    var date = new Date(time);
    return date.toDateString();
  };