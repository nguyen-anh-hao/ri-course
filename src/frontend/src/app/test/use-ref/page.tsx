'use client'

import React, { useState, useRef } from 'react';

function Timer() {
    const [seconds, setSeconds] = useState(0);
    const timerRef = useRef<NodeJS.Timeout | null>(null); // Lưu trữ ID của setInterval

    const startTimer = () => {
        // Kiểm tra nếu timerRef.current chưa có giá trị, tức là timer chưa bắt đầu
        if (!timerRef.current) {
            timerRef.current = setInterval(() => {
                setSeconds(prev => prev + 1);
            }, 1000);
        }
    };

    const stopTimer = () => {
        // Dừng bộ đếm khi có ID và reset timerRef.current về null
        if (timerRef.current)
            clearInterval(timerRef.current);
        timerRef.current = null;
    };

    return (
        <div>
            <p>Giây: {seconds}</p>
            <button onClick={startTimer}>Bắt đầu</button>
            <button onClick={stopTimer}>Dừng</button>
        </div>
    );
}

export default Timer;

// useRef and other 101 hook have to learn :))))

// Trong React, các **hook** là các hàm đặc biệt giúp bạn sử dụng các tính năng của React mà không cần phải viết class components. Dưới đây là một số **hook** phổ biến và thường dùng trong React:

// ### 1. **useState**
// `useState` được dùng để khai báo và quản lý trạng thái trong một component functional.

// **Cú pháp:**
// ```jsx
// const [state, setState] = useState(initialValue);
// ```

// **Ví dụ:**
// ```jsx
// import React, { useState } from 'react';

// function Counter() {
//   const [count, setCount] = useState(0);

//   return (
//     <div>
//       <p>Count: {count}</p>
//       <button onClick={() => setCount(count + 1)}>Increase</button>
//     </div>
//   );
// }
// ```

// ### 2. **useEffect**
// `useEffect` được sử dụng để thực hiện các tác vụ phụ (side effects) như gọi API, thay đổi DOM, hoặc đăng ký sự kiện.

// **Cú pháp:**
// ```jsx
// useEffect(() => {
//   // Code thực thi khi component render
//   return () => {
//     // Code cleanup nếu có
//   };
// }, [dependencies]);
// ```

// **Ví dụ:**
// ```jsx
// import React, { useState, useEffect } from 'react';

// function Timer() {
//   const [time, setTime] = useState(0);

//   useEffect(() => {
//     const interval = setInterval(() => {
//       setTime(t => t + 1);
//     }, 1000);

//     // Cleanup
//     return () => clearInterval(interval);
//   }, []); // Chạy 1 lần khi component mount

//   return <p>Time: {time}</p>;
// }
// ```

// ### 3. **useContext**
// `useContext` cho phép bạn truy cập vào giá trị của Context mà không cần phải sử dụng `Consumer` hoặc `Context.Provider`.

// **Cú pháp:**
// ```jsx
// const value = useContext(MyContext);
// ```

// **Ví dụ:**
// ```jsx
// import React, { useContext } from 'react';

// const MyContext = React.createContext();

// function Component() {
//   const value = useContext(MyContext);
//   return <p>{value}</p>;
// }

// function App() {
//   return (
//     <MyContext.Provider value="Hello, World!">
//       <Component />
//     </MyContext.Provider>
//   );
// }
// ```

// ### 4. **useReducer**
// `useReducer` được dùng để quản lý trạng thái phức tạp hơn, giống như `useState` nhưng với một reducer function. Nó hữu ích khi bạn cần thực hiện nhiều thao tác thay đổi trạng thái.

// **Cú pháp:**
// ```jsx
// const [state, dispatch] = useReducer(reducer, initialState);
// ```

// **Ví dụ:**
// ```jsx
// import React, { useReducer } from 'react';

// const initialState = { count: 0 };

// function reducer(state, action) {
//   switch (action.type) {
//     case 'increment':
//       return { count: state.count + 1 };
//     case 'decrement':
//       return { count: state.count - 1 };
//     default:
//       return state;
//   }
// }

// function Counter() {
//   const [state, dispatch] = useReducer(reducer, initialState);

//   return (
//     <div>
//       <p>Count: {state.count}</p>
//       <button onClick={() => dispatch({ type: 'increment' })}>Increase</button>
//       <button onClick={() => dispatch({ type: 'decrement' })}>Decrease</button>
//     </div>
//   );
// }
// ```

// ### 5. **useRef**
// `useRef` dùng để tạo một đối tượng có thể lưu trữ giá trị mà không gây re-render khi giá trị đó thay đổi. Thường được dùng để tham chiếu đến các phần tử DOM hoặc lưu trữ giá trị qua các lần render mà không muốn gây ra render lại.

// **Cú pháp:**
// ```jsx
// const myRef = useRef(initialValue);
// ```

// **Ví dụ:**
// ```jsx
// import React, { useRef } from 'react';

// function FocusInput() {
//   const inputRef = useRef(null);

//   const handleFocus = () => {
//     inputRef.current.focus();
//   };

//   return (
//     <div>
//       <input ref={inputRef} type="text" />
//       <button onClick={handleFocus}>Focus Input</button>
//     </div>
//   );
// }
// ```

// ### 6. **useMemo**
// `useMemo` giúp tối ưu hiệu suất bằng cách memo hóa giá trị trả về của một hàm. Chỉ khi các dependencies thay đổi, giá trị mới được tính toán lại.

// **Cú pháp:**
// ```jsx
// const memoizedValue = useMemo(() => computeExpensiveValue(a, b), [a, b]);
// ```

// **Ví dụ:**
// ```jsx
// import React, { useMemo } from 'react';

// function ExpensiveComponent({ num1, num2 }) {
//   const result = useMemo(() => num1 * num2, [num1, num2]);
//   return <p>Result: {result}</p>;
// }
// ```

// ### 7. **useCallback**
// `useCallback` giúp tối ưu hiệu suất bằng cách trả về một phiên bản memoized của hàm callback, chỉ tạo lại hàm khi dependencies thay đổi.

// **Cú pháp:**
// ```jsx
// const memoizedCallback = useCallback(() => {
//   // code
// }, [dependencies]);
// ```

// **Ví dụ:**
// ```jsx
// import React, { useState, useCallback } from 'react';

// function Parent() {
//   const [count, setCount] = useState(0);
//   const increment = useCallback(() => setCount(count + 1), [count]);

//   return (
//     <div>
//       <p>{count}</p>
//       <Child onClick={increment} />
//     </div>
//   );
// }

// function Child({ onClick }) {
//   return <button onClick={onClick}>Increase</button>;
// }
// ```

// ### 8. **useLayoutEffect**
// `useLayoutEffect` hoạt động giống như `useEffect`, nhưng nó chạy đồng bộ ngay sau khi DOM thay đổi, trước khi trình duyệt vẽ lại màn hình.

// **Cú pháp:**
// ```jsx
// useLayoutEffect(() => {
//   // code to run after DOM updates
// }, [dependencies]);
// ```

// **Ví dụ:**
// ```jsx
// import React, { useLayoutEffect, useState } from 'react';

// function LayoutEffectComponent() {
//   const [position, setPosition] = useState(0);

//   useLayoutEffect(() => {
//     const handleResize = () => {
//       setPosition(window.innerWidth);
//     };

//     window.addEventListener('resize', handleResize);
//     return () => window.removeEventListener('resize', handleResize);
//   }, []);

//   return <p>Window width: {position}</p>;
// }
// ```

// ### 9. **useImperativeHandle**
// `useImperativeHandle` cho phép bạn kiểm soát giá trị mà ref sẽ trả về, giúp bạn tạo một API tùy chỉnh cho các component con.

// **Cú pháp:**
// ```jsx
// useImperativeHandle(ref, () => ({
//   // custom methods or properties
// }), [dependencies]);
// ```

// **Ví dụ:**
// ```jsx
// import React, { useRef, useImperativeHandle, forwardRef } from 'react';

// const ChildComponent = forwardRef((props, ref) => {
//   const inputRef = useRef(null);

//   useImperativeHandle(ref, () => ({
//     focusInput: () => {
//       inputRef.current.focus();
//     },
//   }));

//   return <input ref={inputRef} />;
// });

// function ParentComponent() {
//   const childRef = useRef();

//   const handleFocus = () => {
//     childRef.current.focusInput();
//   };

//   return (
//     <div>
//       <ChildComponent ref={childRef} />
//       <button onClick={handleFocus}>Focus Child Input</button>
//     </div>
//   );
// }
// ```

// ---

// Trên đây là các hook cơ bản và thông dụng trong React. Chúng giúp quản lý trạng thái, xử lý hiệu ứng phụ, tối ưu hiệu suất, và tương tác với DOM một cách hiệu quả hơn.