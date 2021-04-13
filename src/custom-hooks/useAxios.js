import { useLoader } from "../contexts/loader-context";
import axios from 'axios';

export function UseAxios() {
    const { setLoading } = useLoader();

    const apiCall = async (url, type, body, successCb, failureCb) => {
        try {
            setLoading(true);
            const res = await axios[type](url, body);
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