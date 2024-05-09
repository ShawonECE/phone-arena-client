import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Orders = () => {
    const {user} = useContext(AuthContext);
    const [orders, setOrders] = useState([]);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get(`/orders?email=${user.email}`)
        .then(data => {
            setOrders(data.data);
        })
        .catch(err => console.error(err));
    }, [user, axiosSecure]);
    return (
        <div>
            <h2 className="text-4xl font-semibold">Here is your orders: {orders.length}</h2>
        </div>
    );
};

export default Orders;