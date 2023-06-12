import React, { useState, useEffect, useId,useRef, useCallback } from 'react';
import TodoTemplate from './components/TodoTemplate';
import TodoInsert from './components/TodoInsert';
import TodoList from './components/TodoList';

import { db } from './firebase-config';
import { collection, getDocs , addDoc, updateDoc,deleteDoc, doc} from "firebase/firestore";

const App = () => {

    // input으로 받을 새로운 사람의 이름과 나이
    const [newName, setNewName] = useState("");
    const [newEmail, setNewEmail] = useState(0);
  console.log(newName, newEmail);

   
   const [todos, setTodos] = useState([]);
   
   const usersCollectionRef = collection(db, "todos");

/// 유니크 id를 만들기 위한 useId(); - react 18 기능으로, 이 훅을 이렇게 사용하는게 맞고 틀린지는 모른다.
const uniqueId = useId();
console.log(uniqueId)
// 시작될때 한번만 실행
useEffect(()=>{
  // 비동기로 데이터 받을준비
  const getTodos = async () => {
   // getDocs로 컬렉션안에 데이터 가져오기
    const data = await getDocs(usersCollectionRef);
    // users에 data안의 자료 추가. 객체에 id 덮어씌우는거
    setTodos(data.docs.map((doc)=>({ ...doc.data(), id: doc.id})))
  }
  getTodos();
},[todos,usersCollectionRef])



// 업데이트 - U
const updateUser = async( id, email) =>{
  // 내가 업데이트 하고자 하는 db의 컬렉션의 id를 뒤지면서 내가 수정하고자 하는 id랑 같은 id값을 가진 데이터를 찾는다
  const userDoc = doc(db, "users", id)
  // 내가 업데이트 하고자 하는 key를 어떻게 업데이트할지 준비,, 중요한점이 db에는 문자열로 저장되어있다. 그래서 createUsers()함수안에서 age를 생성할때 숫자열로 형변환 해줘야한다
  const newField = {email: email + '1'};
  // updateDoc()을 이용해서 업데이트
  await updateDoc(userDoc, newField);
}

// 삭제 - D
const deleteUser = async(id) =>{
  // 내가 삭제하고자 하는 db의 컬렉션의 id를 뒤지면서 데이터를 찾는다
  const userDoc = doc(db, "users", id);
  // deleteDoc을 이용해서 삭제
  await deleteDoc(userDoc);
}


// 띄워줄 데이터 key값에 고유ID를 넣어준다.
const showUsers = todos.map((value)=> (<div key={uniqueId}> 
                                          <h1>ID: {value.id}</h1> 
                                          <h1>TEXT: {value.text}</h1>
                                          <h1>CHECKED: {value.checked}</h1>
                                                   {/* 증가버튼은 이 안에 있어야지, 각기 다른 데이터마다 붙는다, users data를 map으로 돌기때문에, 그 안의 id랑 age를 넣어주면 된다.*/}
                                            {/* id를 넣어주는 이유는, 우리가 수정하고자 하는 데이터를 찾아야하기 때문에. */}
                                            {/* <button onClick={()=>{updateUser(value.id, value.email)}}>Increase email</button>
                                            <button onClick={()=>{deleteUser(value.id)}}>Delete User</button> */}

                                      </div>))



  // const [todos, setTodos] = useState([
  //   {
  //     id: 1,
  //     text: '리액트의 기초 알아보기',
  //     checked: true,
  //   },
  //   {
  //     id: 2,
  //     text: '컴포넌트 스타일링해 보기',
  //     checked: true,
  //   },
  //   {
  //     id: 3,
  //     text: '일정 관리 앱 만들어 보기',
  //     checked: false,
  //   },
  // ]);

  // 고유 값으로 사용 될 id
  // ref 를 사용하여 변수 담기
  const nextId = useRef(1);

  const onInsert = useCallback(
    (text) => {
      // const todo = {
      //   id: nextId.current,
      //   text,
      //   checked: false,
      // };
      // setTodos(todos => todos.concat(todo));
      const createTodos = async () =>{
        // addDoc을 이용해서 내가 원하는 collection에 내가 원하는 key로 값을 추가한다.
        // await addDoc(usersCollectionRef, {text: newName, email:newEmail});
        await addDoc(usersCollectionRef,{id:nextId,text:text,checked:false} );
      }
      createTodos()
      nextId.current += 1; // nextId 1 씩 더하기
    },
    [usersCollectionRef],
  );

  const onRemove = useCallback(
    (id) => {
      setTodos(todos => todos.filter((todo) => todo.id !== id));
    },
    [],
  );


  const onToggle = useCallback(
    (id) => {
      setTodos(todos =>
        todos.map((todo) =>
          todo.id === id ? { ...todo, checked: !todo.checked } : todo,
        ),
      );
    },
    [],
  );


  return (
    <TodoTemplate>
      <TodoInsert onInsert={onInsert}/>
      <TodoList todos={todos} onRemove={onRemove} onToggle={onToggle} />
      {/* <TodoList users={users} onRemove={onRemove} onToggle={onToggle} /> */}
      <div className='App'> 
          {/* onchange를 이용해서, 변하는 값을 state로 저장한다. */}
        {showUsers} 
       </div> 
    </TodoTemplate>
  );
};

export default App;
