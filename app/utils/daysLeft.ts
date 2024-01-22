export function getDaysLeft(deadline: any) {
  const currentDate: any = new Date();
  const deadlineDate: any = new Date(deadline);

  const timeDifference = deadlineDate - currentDate;
  const daysLeft = Math.ceil(timeDifference / (1000 * 60 * 60 * 24));

  return daysLeft;
}
