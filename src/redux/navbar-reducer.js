import pic1 from '../assets/22.jpg';
import pic2 from '../assets/23.jpg';
import pic3 from '../assets/24.jpg';


const initialState = {
      friends: [
            {id: 2, name: "Sasha", avatar: pic1},
            {id: 3, name: "Anna", avatar: pic2},
            {id: 4, name: "Dasha", avatar: pic3},
      ]
}

const navbarReducer = (state = initialState, action) => {
      return state;
}

export default navbarReducer;