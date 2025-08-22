import React, { createContext, useContext, useReducer, useEffect } from "react";

// 1) 초기 상태
const initialState = {
  users: [],          // 회원가입된 유저들
  user: null,          // 로그인 유저 정보
  experiences: [],     // 경력 리스트
  skills: []           // 스킬 리스트
};

// 2) Reducer (CRUD 기능 포함)
function appReducer(state, action) {
  switch (action.type) {
    case "REGISTER_USER":
      return { ...state, users: [...state.users, action.payload] };
    case "LOGIN":
      return { ...state, user: action.payload };
    case "LOGOUT":
      return { ...state, user: null };

    case "ADD_EXPERIENCE":
      return { ...state, experiences: [...state.experiences, action.payload] };
    case "UPDATE_EXPERIENCE":
      return {
        ...state,
        experiences: state.experiences.map((exp) =>
          exp.id === action.payload.id ? action.payload : exp
        )
      };
    case "DELETE_EXPERIENCE":
      return {
        ...state,
        experiences: state.experiences.filter((exp) => exp.id !== action.payload)
      };

    case "ADD_SKILL":
      return { ...state, skills: [...state.skills, action.payload] };
    case "DELETE_SKILL":
      return {
        ...state,
        skills: state.skills.filter((skill) => skill.id !== action.payload)
      };

    default:
      return state;
  }
}

// 3) Context 생성
const AppContext = createContext();

// 4) Provider
export function AppProvider({ children }) {
  const [state, dispatch] = useReducer(appReducer, initialState, (init) => {
    const persisted = localStorage.getItem("appState");
    if (persisted) {
      const parsed = JSON.parse(persisted);
      return {
        ...init,
        users: parsed.users || [],       // users가 없으면 빈 배열
        user: parsed.user || null,
        experiences: parsed.experiences || [],
        skills: parsed.skills || []
      };
    }
    return init;
  });

  useEffect(() => {
    localStorage.setItem("appState", JSON.stringify(state));
  }, [state]);

  return (
    <AppContext.Provider value={{ state, dispatch }}>
      {children}
    </AppContext.Provider>
  );
}


// 5) 커스텀 훅
export function useAppContext() {
  return useContext(AppContext);
}
