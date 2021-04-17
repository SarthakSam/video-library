import { useLoader } from "../contexts/loader-context";
import axios from 'axios';

export function UseAxios() {
    const { setLoading } = useLoader();

    const apiCall = async (type, successCb, failureCb, ...rest) => {
        try {
            setLoading(true);
            const res = await axios[type](...rest);
            successCb(res);
        }
        catch(err) {
            failureCb(err);
        }
        finally {
            setLoading(false);
        }
    }

    return apiCall;

}