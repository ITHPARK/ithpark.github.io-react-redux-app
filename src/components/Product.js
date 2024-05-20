import React, {useState} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {useNavigate} from 'react-router-dom';
import { addItem } from '../store/store';


const Product = () => {

  const productItems = useSelector(state => state.items);

  const navigate = useNavigate();
  const dispatch = useDispatch();

  const addCart = (id) => {

    const result = window.confirm("상품이 장바구니에 담겼습니다. 장바구니로 이동하시겠습니까?");

    dispatch(addItem(id));

    if(result) navigate("/cart");
    
  }

  return (
    <div className='content'>
      <div className='banner'>

      </div>

      <div className='section'>
        <h2 className='section_top'>Product</h2>
        <ul className='product_list'>
         {/* <li>
           <div className='product_img'>
              <img src="/public/images/redux_bg.png" alt=""/>
            </div>
            <div className='button_wrap'>
              <button className='btn_type1'><span>구매</span></button>
              <button className='btn_type2'><span>장바구니에 담기</span></button>
            </div>
          </li>  
           */}
          {
            productItems.map((item) => {
              return (
                <li key={item.id}> 
                 <div className='product_img'>
                    
                  </div>
                  <div className='product_info'>
                    <p className='name'>{item.name}</p>
                    <p className='price'>
                      {
                        item.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')
                      }
                      원
                    </p>
                  </div>
                  <div className='button_wrap'>
                    <button className='btn_type1' onClick={() => addCart(item.id)}><span>장바구니에 담기</span></button>
                  </div>
                </li>  
              )
            })
          }
        </ul>
      </div>
    </div>
  )
}

export default Product