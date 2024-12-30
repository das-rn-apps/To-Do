import moment from "moment";

export const getTime = (time: string) => {
    return moment(time).fromNow();
};