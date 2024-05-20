import React, {useEffect, useState} from 'react'
import {Link, useNavigate} from 'react-router-dom';
import store from '../store/store';
import { useSelector } from 'react-redux';


const Nav = () => {

    const [itemLength, setItemLength] = useState(0);

    const navigate = useNavigate();
    const items = useSelector(state => state.items);

    let num;

    useEffect(() => {
        setItemLength(items.filter((item) => item.amount > 0).length);
    }, [items])

    

    

  return (
    <nav>
        <div className='nav_inner'>
            <h2 className='logo'>
                <Link to="/">
                    REDUX STORE
                </Link>
            </h2>

            <div className='nav_right'>
                <ul>
                    <li>
                        <button className='go_basket' onClick={() => navigate("/cart")}>
                            장바구니
                            <span className={`product_cout  ${itemLength > 0? 'on': '' }`}>{itemLength}</span>
                        </button>
                    </li>
                </ul>
            </div>
        </div>
    </nav>
  )
}

export default Nav