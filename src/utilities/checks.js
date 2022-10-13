
export const conflict_courses = (selected, courses) =>
{
    const unavailable =[];
    if (selected.meets !== "") 
        Object.entries(courses).forEach(([id, course]) => {
            let [term1, days1, earliest_time1, latest_time1, number1] = parser(course);
            let [term2, days2, earliest_time2, latest_time2, number2] = parser(selected);
            if (number1 !== number2 && term1 === term2 && day_check(days1, days2) 
            && time_check(earliest_time1, latest_time1, earliest_time2, latest_time2))
            {
                unavailable.push(id)}
        })
    return unavailable;
};



const parser = (course) => {
    let number = course.number;
    let term = course.term;
    let [days, time] = course.meets.split(" ");
    days = days.split(/(?=[A-Z])/);
    let [earliest_time, latest_time] = time.split("-");
    let [earliest_hour, earliest_minutes] = earliest_time.split(":");
    let [latest_hour, latest_minutes] = latest_time.split(":");
    return [term, days, parseInt(earliest_hour)*60 + parseInt(earliest_minutes), parseInt(latest_hour)*60 + parseInt(latest_minutes), number];
};

const day_check = (day1, day2) => {
    if(day1.some((day) => day2.includes(day)))
    {
        return true;
    }
    return false;
    }
const time_check = (earliest1, latest1, earliest2, latest2) =>
{
    return ((earliest1 <= latest2 && earliest1 >= earliest2) || 
    (latest1 <= latest2 && latest1 >= earliest2)  ||
    (earliest1 <= earliest2 && latest1 >= latest2)) 
};




