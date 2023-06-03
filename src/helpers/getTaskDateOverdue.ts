export const getTaskDateOverdue = (
    date: number
): boolean => {
    const today = new Date();
    today.setHours(0, 0, 0, 0);
    today.setDate(today.getDate() - 1);
    return date <= today.getMilliseconds();
};