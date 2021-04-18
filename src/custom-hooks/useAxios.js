import { useLoader } from "../contexts/loader-context";
import axios from 'axios';

export function UseAxios() {
    const { setLoading } = useLoader();

    const apiCall = async (method, successCb, failureCb, ...rest) => {
        rest[0] = "https://stream-itt.herokuapp.com" + rest[0];
        try {
            setLoading(true);
            const res = await axios[method](...rest);
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