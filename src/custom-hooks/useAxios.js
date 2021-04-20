import { useLoader } from "../contexts/loader-context";
import axios from 'axios';

const baseURL = "https://stream-itt.herokuapp.com";

export function UseAxios() {
    const { setLoading } = useLoader();

    const apiCall = async (method, successCb, failureCb, url, ...rest) => {
        // url = baseURL + url;
        try {
            setLoading(true);
            const res = await axios[method](url, ...rest);
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