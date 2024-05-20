import { configureStore, createSlice  } from "@reduxjs/toolkit";
//configureStore: Redux 스토어를 생성하는 함수
//createSlice: Redux 리듀서, 액션 생성자 및 액션 타입을 한 번에 정의할 수 있다.

const items = createSlice({
    name: 'items',
    initialState: [
        {
            id: 1,
            name: '상품1',
            price: 40000,
            amount: 0,
        },
        {
            id: 2,
            name: '상품2',
            price: 27500,
            amount: 0,
        },
        {
            id: 3,
            name: '상품3',
            price: 13000,
            amount: 0,
        },
        {
            id: 4,
            name: '상품4',
            price: 62700,
            amount: 0,
        },
        {
            id: 5,
            name: '상품5',
            price: 6800,
            amount: 0,
        },
        {
            id: 6,
            name: '상품6',
            price: 23200,
            amount: 0,
        },
        {
            id: 7,
            name: '상품7',
            price: 43000,
            amount: 0,
        }
    ],

    //상태 업데이트를 위한 action 생성자.
    reducers: {
        addItem: (state, action) => {

            //action.payload는 dispatch할 때 전달된 인수값
            let num = state.findIndex(a => a.id === action.payload);
            state[num].amount++;
        },
        removeItem: (state, action) => {
            let num = state.findIndex(a => a.id === action.payload);
            state[num].amount--;
        },
        deleteItem(state,action){
            
            const id = action.payload.id;

            //amount가 0이 되면 상품 행은 자동적으로 사라지게 된다.
            state[id-1].amount = 0;
        }
    }
})

export const { addItem, removeItem, deleteItem } = items.actions;
export default configureStore({
    reducer: {
        items: items.reducer,
    }
})



