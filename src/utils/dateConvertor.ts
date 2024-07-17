import { differenceInMinutes, differenceInHours, differenceInDays } from 'date-fns';

export function getTimeAgo(timestamp: string) {
    const now = new Date();
    var date = new Date(parseInt(timestamp));

    const minutes = differenceInMinutes(now, date);
    const hours = differenceInHours(now, date);
    const days = differenceInDays(now, date);

    if (minutes === 0) {
        return `Now`;
    }
    else if (minutes < 60) {
        return `${minutes} minutes ago`;
    } else if (hours < 24) {
        return `${hours} hours ago`;
    } else {
        return `${days} days ago`;
    }
}
