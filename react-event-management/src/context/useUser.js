import { useContext } from 'react';
import UserContext from './userStore';

export const useUser = () => useContext(UserContext);

export default useUser;
