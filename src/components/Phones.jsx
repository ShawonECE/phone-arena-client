import { useLoaderData } from "react-router-dom";
import PhoneCard from "./PhoneCard";
import { useContext, useEffect, useState } from "react";
import { AuthContext } from "./AuthProvider";
import useAxiosSecure from "../hooks/useAxiosSecure";

const Phones = () => {
    const [phones, setPhones] = useState([]);
    const [itemsPerPage, setItemsPerPage] = useState(10);
    const [currentPage, setCurrentPage] = useState(1);
    const {count} = useLoaderData().data;
    const numberOfPages = Math.ceil(count / itemsPerPage);
    const pages = [...Array(numberOfPages).keys()].map(key => key + 1);
    const {user} = useContext(AuthContext);
    const axiosSecure = useAxiosSecure();
    useEffect(() => {
        axiosSecure.get(`/phones?page=${currentPage}&size=${itemsPerPage}`)
        .then(res => setPhones(res.data));
    }, [axiosSecure, currentPage, itemsPerPage]);
    const handleOrder = (id) => {
        const currentPhone = phones.find(phone => phone._id === id);
        currentPhone.userEmail = user.email;
        delete currentPhone._id;

        axiosSecure.post('/order', currentPhone)
        .then(data => {
            if (data.data.insertedId) {
                alert('Ordered successfully');
            } else {
                alert('Order failed');
            }
        });
    };
    return (
        <div>
            <h2 className="text-2xl font-semibold text-center">Here are all phones</h2>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-5">
                {
                    phones.map(phone => <PhoneCard key={phone._id} handleOrder={handleOrder} phone={phone}></PhoneCard>)
                }
            </div>
            <div className="text-center mt-10 mb-10 space-x-2">
                <button onClick={() => setCurrentPage(currentPage - 1)} className="btn" disabled={currentPage === 1}>Prev.</button>
                {
                    pages.map(pageNumber => <button onClick={() => setCurrentPage(pageNumber)} key={pageNumber} className={`btn ${currentPage === pageNumber ? 'bg-slate-950 text-white' : ''}`}>{pageNumber}</button>)
                }
                <button onClick={() => setCurrentPage(currentPage + 1)} className="btn" disabled={currentPage === pages[pages.length - 1]}>Next</button>
                <select defaultValue={'Items per page'} onChange={(e) => setItemsPerPage(e.target.value)} className="select select-bordered">
                    <option disabled>Items per page</option>
                    <option>10</option>
                    <option>20</option>
                    <option>30</option>
                </select>
            </div>
        </div>
    );
};

export default Phones;