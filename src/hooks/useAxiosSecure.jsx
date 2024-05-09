import axios from "axios";
import { useContext, useEffect } from "react";
import { AuthContext } from "../components/AuthProvider";

const axiosSecure = axios.create({
    baseURL: 'https://phone-arena-server.vercel.app',
    withCredentials: true,
});

const useAxiosSecure = () => {
    const { logOutUser, user } = useContext(AuthContext);
    useEffect(() => {
        axiosSecure.interceptors.response.use(res => {
            return res;
        }, error => {
            if (error.response.status === 401 || error.response.status === 403) {
                logOutUser()
                    .then(() => {
                        axiosSecure.post('/logout', { email: user?.email })
                            // .then(res => {
                            //     if (res.data.success) {
                            //         console.log('Logged out successfully');
                            //     }
                            // });
                    })
                    .catch(error => console.error(error));
            }
        });
    }, [logOutUser, user])
    return axiosSecure;
};

export default useAxiosSecure;