import PropTypes from 'prop-types';
import { AuthContext } from './AuthProvider';
import { useContext } from 'react';

const PhoneCard = ({phone, handleOrder}) => {
    const {model, brand, price, _id} = phone;
    const {user} = useContext(AuthContext);
    return (
        <div className="card bg-base-100 shadow-xl">
            <div className="card-body">
                <h2 className="card-title">{brand} {model}</h2>
                <p className='text-lg font-semibold'>${price}</p>
                <div className="card-actions justify-end">
                    <button onClick={() => handleOrder(_id)} className="btn bg-gray-900 text-white" disabled={!user}>Order now</button>
                </div>
            </div>
        </div>
    );
};

PhoneCard.propTypes = {
    phone: PropTypes.object.isRequired,
    handleOrder: PropTypes.func.isRequired
};

export default PhoneCard;