import { useLoader } from "../contexts/loader-context";
import { mapping } from '../api.config';
import axios from 'axios';

export function UseAxios() {
    const { setLoading } = useLoader();

    const apiCall = async (url, body, successCb, failureCb) => {
        try {
            setLoading(true);
            const res = await axios.get(mapping[url], body);
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