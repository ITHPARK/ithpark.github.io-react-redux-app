import React, {useState, useEffect} from 'react';
import { useSelector, useDispatch } from 'react-redux';
import {addItem, removeItem, deleteItem} from '../store/store';

function Cart() {

   //리덕스 store객체에서 items객체를 가져오는것
   const items = useSelector(state => state.items);

  const [selectItem, setSelectItem] = useState([]);
  const [itemLen, setItemLen] = useState(items.length);

  useEffect(() => {
    //페이지 최초 진입시 전체 선택상태
    const arr = [];
    items.map(a => arr.push(a.id));
    setSelectItem(arr);
  }, [])
  

  //액션을 dispatch할때 사용
  const dispatch = useDispatch();

  const onSingle = (check, id) => {
    if(check) {
      setSelectItem(prev => [...prev, id]);
    }else {
      //선택된 아이템을 제외하고 재배열
      setSelectItem(selectItem.filter(a => a !== id))
      //[0, 1, 2, 3] 모두 체크된 상태에서 첫번째것을 해제하면 [1, 2, 3]상태로 업데이트
    }
  }

  //전체 선택, 해제
  const onAll = (check) => {
    if(check) {
      const arr = [];
      items.map(a => arr.push(a.id));

      //모든 배열의 id를 추가
      setSelectItem(arr);
    }else {
      //빈 배열로 반환
      setSelectItem([]);
    }
  }

  //아이템 삭제
  const onDelete = (data, id) => {
    dispatch(deleteItem(data, id));

    //선택된 id랑 다른 요소들만 반환, 즉 삭제를 선택한 배열빼고 반환
    setSelectItem(selectItem.filter(a => a !== id));
  }

  const Price = items.map(a => {
    //각 상품의 수량에 따라 가격 증가 또는 감소
    return (selectItem.includes(a.id) &&  a.amount > 0) ?
    Object.values(a)[2] * a.amount : null 
  })

  //장바구니 모든 상품의 가격을 더한 총 가격
  const TotalPrice = Price.reduce((a,b) => a+b)
  
  return (
    <>
    <div className='content'>
      <div className='top'>
          <p>장바구니</p>
      </div>

      <div className='section'>
        <div className='cart'>
          <div className='all_select'>
            <input name='allchoice' type='checkbox' 
              onChange={e => onAll(e.target.checked)}
              checked={selectItem.length === itemLen ? true : false}
              id="allSelecte"
            />
            <label for="allSelecte">전체 선택</label>
          </div>
          <div className='item_list'>

            {/* 개수가 1개 이상만 나타냄 */}
            {items.map((a, i) => {
              if(a.amount > 0) {
                return(
                  <div key={i} className='items'>
                    <div className='info'>
                      <input checked={selectItem.includes(a.id)? true: false}
                          onChange={e => onSingle(e.target.checked, a.id)}
                          type='checkbox'
                      />
                      <div className='item_img'>
  
                      </div>
                      <div>{a.name}</div>
                      <div className='price'> {a.price.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원 </div>
                      <div className='amount'>
                        <button onClick={() => dispatch(removeItem(a.id))}>-</button>
                          {a.amount}
                          <button onClick={() => dispatch(addItem(a.id))}>+</button>
                      </div>
                    </div>
                    <button onClick={e => onDelete(a.id)}>삭제</button>
                  </div>
                )
              }
            })}
          </div>
          
          <div className='total'>
            <span >총 가격 : {TotalPrice.toString().replace(/\B(?=(\d{3})+(?!\d))/g, ',')}원</span>
          </div>
        </div>
      </div>
    </div>
      
    </>
  );
}

export default Cart;
