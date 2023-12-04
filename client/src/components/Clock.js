import { useContext, useState, useEffect } from 'react';
import { Context } from '../index';
import { getTime } from "../http/userAPI";


const Clock = () => {
    const {userStore} = useContext(Context);

    var x = new Date();
    const currentTimeZoneOffsetInHours = x.getTimezoneOffset() / 60;
    let TZ = currentTimeZoneOffsetInHours > 0 ? '-' : '+';
    TZ += Math.abs(currentTimeZoneOffsetInHours)

    const [times, setTimes] = useState("");

    useEffect(() => {
        getTime()
            .then(time => {setTimes(time);})
            .catch(e => console.error(e))
    }, [])

    return (
        <div>
            <p>Current TZ: {TZ}</p>
            <p>Current date: {new Date().toDateString()}</p>
            <p>Last created locale: {times[0]}</p>
            <p>Last created in Greenwich: {times[1]}</p>
        </div>
    );
}

export default Clock;