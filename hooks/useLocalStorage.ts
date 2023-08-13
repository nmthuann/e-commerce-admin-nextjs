// import { useState } from "react";

// const useLocalStorage = <T>(key: string, initialValue: T) => {
//   const [state, setState] = useState<T>(() => {
//     // Initialize the state
//     try {
//       const value = window.localStorage.getItem(key);
//       // Check if the local storage already has any values,
//       // otherwise initialize it with the passed initialValue
//       return value ? JSON.parse(value) : initialValue;
//     } catch (error) {
//       console.log(error);
//       return initialValue;
//     }
//   });

//   const setValue = (value: T | ((prevState: T) => T)) => {
//     try {
//       // If the passed value is a callback function,
//       // then call it with the existing state.
//       const valueToStore = value instanceof Function ? (value as Function)(state) : value;
//       window.localStorage.setItem(key, JSON.stringify(valueToStore));
//       setState(valueToStore);
//     } catch (error) {
//       console.log(error);
//     }
//   };

//   return [state, setValue] as const;
// };

// export default useLocalStorage;
