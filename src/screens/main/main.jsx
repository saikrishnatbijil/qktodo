import React, { useEffect, useState } from "react";
import "./main.css";
import {
  ErrorComponent,
  InputForm,
  TodoItem,
} from "../../components";
import {
  doc,
  getDocs,
  addDoc,
  collection,
  query,
  onSnapshot,
  updateDoc,
  deleteDoc,
  setDoc,
  getDoc,
} from "firebase/firestore";
import { doc as docFire } from "firebase/firestore";
import { auth, db } from "../../../firebase/firebase-config";
import { onAuthStateChanged } from "firebase/auth";

const getLocalItems = () => {
  let list = localStorage.getItem("todos");
  if (list) {
    return JSON.parse(localStorage.getItem("todos"));
  } else {
    return [];
  }
};

const getLocalID = () => {
  let list = localStorage.getItem("ID");
  if (list) {
    return JSON.parse(localStorage.getItem("ID"));
  } else {
    return 1;
  }
};

const getLocalCookiesPermission = () => {
  let list = localStorage.getItem("cookies_permission");
  if (list) {
    return JSON.parse(localStorage.getItem("cookies_permission"));
  } else {
    return false;
  }
};

const getLocalSpace = () => {
  let list = localStorage.getItem("space_name");
  if (list) {
    return localStorage.getItem("space_name");
  } else {
    return "main";
  }
};

function main({ accepted, tooglePrompt }) {
  // Error Componenet
  const [isError, setIsError] = useState(false);
  const [errorMessage, setErrorMessage] = useState("");
  // Data Variables
  const [input, setInput] = useState("");
  const [noOfTodos, setNoOfTodos] = useState("");
  const [todos, setTodos] = useState(getLocalItems());
  const [fTodos, setFTodos] = useState([]);
  const [id, setID] = useState(getLocalID());
  const [reload, setReload] = useState(1);
  const [uid, setUid] = useState("");
  const [isLogedIn, setIsLogedIn] = useState(false);
  const [space, setSpace] = useState(getLocalSpace());

  // console.log(todos);

  const clicked = (e) => {
    setIsError(false);
    e.preventDefault(e);
    if (getLocalCookiesPermission()) {
      if (input === "") {
        setIsError(true);
        setErrorMessage("Add Todo");
      } else {
        if (isLogedIn) {
          firebaseClicked(e);
        } else {
          localClicked(e);
        }
      }
      return;
    } else {
      localStorage.setItem("COK", true);
      tooglePrompt();
      setIsError(true);
      setErrorMessage(
        "We need local storage and cookies permission to add todos"
      );
    }
  };

  const localClicked = (e) => {
    e.preventDefault(e);
    if (input.length === 0) {
      setIsError(true);
      setErrorMessage("Add Todo");
      return;
    } else {
      setTodos([...todos, { name: input, checked: false, id: id + 1 }]);
      setID(id + 1);
      setInput("");
    }
  };

  const firebaseClicked = async (e) => {
    e.preventDefault(e);
    try {
      const document = docFire(db, `${uid}/spaces/${space.toLowerCase()}`, input);
      setInput("");
      const docRef = await setDoc(document, {
        name: input,
        checked: false,
      });
      // console.log("Document written with ID: ", docRef.id);
    } catch (e) {
      setIsError(true);
      setErrorMessage(e);
    }
  };

  const remove = (todo) => {
    if (isLogedIn) {
      firebaseRemove(todo);
    } else {
      localRemove(todo);
    }
  };

  const localRemove = (todo) => {
    const filteredItems = todos.filter((item) => item.id !== todo.id);
    setTodos(filteredItems);
  };

  const firebaseRemove = async (todo) => {
    await deleteDoc(doc(db, uid, "spaces", space.toLowerCase(), todo.id));
  };

  const toggle = (todo) => {
    if (isLogedIn) {
      toggleFirebase(todo);
    } else {
      Localtoggle(todo);
    }
  };

  const Localtoggle = (todo) => {
    console.log(todo);
    todos.forEach((item) => {
      if (item.id === todo.id) {
        if (item.checked) {
          item.checked = false;
          console.log(item.checked);
          setReload(reload + 1);
          return;
        } else {
          item.checked = true;
          console.log(item.checked);
          setReload(reload + 1);
          return;
        }
      }
    });
  };

  const toggleFirebase = async (todo) => {
    const checkedRef = doc(db, uid, "spaces", space.toLowerCase(), todo.id);

    if (todo.checked) {
      await updateDoc(checkedRef, {
        checked: false,
      });
      return;
    } else {
      await updateDoc(checkedRef, {
        checked: true,
      });
      return;
    }
  };

  const Items = todos.map((todo) => {
    return (
      <TodoItem key={todo.id} todo={todo} toggle={toggle} remove={remove} />
    );
  });

  const FirebaseItems = fTodos.map((todo) => {
    return (
      <TodoItem key={todo.id} todo={todo} toggle={toggle} remove={remove} />
    );
  });

  useEffect(() => {
    const unsubscribe = onAuthStateChanged(auth, (user) => {
      if (user) {
        setIsLogedIn(true);
        // User is signed in, see docs for a list of available properties
        // https://firebase.google.com/docs/reference/js/firebase.User
        const uid = user.uid;
        setUid(uid);
        console.log(uid);
        getData(uid);
        getSpaces(uid);
      } else {
        // User is signed out
        // ...
      }
      return () => unsubscribe;
    });
  }, []);
  const getData = (uid) => {
    if (uid !== "") {
      setReload(reload + 2);
      setIsLogedIn(true);
      // getFTodos();
      const q = query(collection(db, uid, "spaces", space.toLowerCase()));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let todoArr = [];
        querySnapshot.forEach((doc) => {
          todoArr.push({ ...doc.data(), id: doc.id });
        });
        setFTodos(todoArr);
        setNoOfTodos(todoArr.length);
      });
      return () => unsubscribe;
    }
  };
  const getSpaces = async (uid) => {
    if (uid !== "") {
      const q = query(collection(db, uid, "spaces", space.toLowerCase()));
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        let todoArr = [];
        querySnapshot.forEach((doc) => {
          todoArr.push({ ...doc.data(), id: doc.id });
        });
        setFTodos(todoArr);
        setReload(reload + 2);
      });
      return () => unsubscribe;
    }
  };
  const collectionExists = async () => {
    try {
      const snapshot = await firestore
        .collection(db, uid, "spaces", space.toLowerCase())
        .limit(1)
        .get();
      return snapshot.size > 0;
    } catch (error) {
      // Handle any potential errors
      console.error("Error checking collection existence:", error);
      return false;
    }
  };
  const handleAddSpace = async (e) => {
    e.preventDefault()
    localStorage.setItem("space_name", space.toLowerCase());
    const q = query(collection(db, uid, "spaces", space.toLowerCase()));
    if (collectionExists) {
      getSpaces(uid);
    } else {
      console.log("HII");
    }
  };
  useEffect(() => {
    if (isLogedIn === true) {
      setNoOfTodos(fTodos.length);
    } else {
      setNoOfTodos(todos.length);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("ID", id);
  }, [todos]);
  useEffect(() => {
    if (isLogedIn) {
      setNoOfTodos(fTodos.length);
    } else {
      setNoOfTodos(todos.length);
    }
    localStorage.setItem("todos", JSON.stringify(todos));
    localStorage.setItem("ID", id);
  }, [reload]);
  useEffect(() => {
    console.log(getLocalCookiesPermission());
    if (!getLocalCookiesPermission()) {
      localStorage.setItem("COK", true);
    }
  }, []);
  useEffect(() => {
    setIsError(false);
  }, [accepted]);

  return (
    <div className="container">
      {isLogedIn && (
        <form className="spaces_container">
          <input
            placeholder="Enter Space"
            autoFocus
            type="text"
            value={space}
            onChange={(e) => setSpace(e.target.value)}
          />
          <button
            className="spacesReloader"
            type="submit"
            onClick={(e) => handleAddSpace(e)}
          >
            <span className="material-symbols-rounded">refresh</span>
          </button>
        </form>
      )}
      <InputForm
        buttonVal={"+"}
        noOfTodos={noOfTodos}
        input={input}
        setInput={setInput}
        clicked={clicked}
      />
      {isError && <ErrorComponent errorMessage={errorMessage.toString()} />}
      {isLogedIn ? (
        <ul className="todosContainer">{FirebaseItems}</ul>
      ) : (
        <ul className="todosContainer">{Items}</ul>
      )}
    </div>
  );
}

export default main;
