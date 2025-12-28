import Section from "@/app/components/Section";
import CodeBlock from "@/app/components/CodeBlock";
import InfoBox from "@/app/components/InfoBox";

export default function ReduxToolkitPage() {
  return (
    <div>
      <h1 className="text-4xl font-bold text-gray-900 dark:text-white mb-8">
        Redux Toolkit TypeScript
      </h1>

      <p className="text-lg text-gray-700 dark:text-gray-300 mb-8">
        Redux Toolkit provides excellent TypeScript support with typed slices,
        hooks, thunks, and middleware. Understanding these patterns enables
        fully type-safe Redux applications.
      </p>

      <Section title="1. Typed Slices">
        <p className="text-gray-700 dark:text-gray-300">
          createSlice automatically infers types from initial state and reducers.
          You can explicitly type the slice for better control.
        </p>

        <CodeBlock title="Basic Typed Slice">
          {`import { createSlice, PayloadAction } from '@reduxjs/toolkit';

// Define state interface
interface CounterState {
  value: number;
  loading: boolean;
  error: string | null;
}

// Initial state with explicit typing
const initialState: CounterState = {
  value: 0,
  loading: false,
  error: null,
};

// Create slice with typed state
const counterSlice = createSlice({
  name: 'counter',
  initialState,
  reducers: {
    // TypeScript infers action type from payload
    increment: (state) => {
      state.value += 1;
    },
    decrement: (state) => {
      state.value -= 1;
    },
    // PayloadAction provides typed payload
    incrementByAmount: (state, action: PayloadAction<number>) => {
      state.value += action.payload;
    },
    // Complex payload with interface
    setValue: (state, action: PayloadAction<{ value: number; timestamp: number }>) => {
      state.value = action.payload.value;
    },
    setLoading: (state, action: PayloadAction<boolean>) => {
      state.loading = action.payload;
    },
    setError: (state, action: PayloadAction<string | null>) => {
      state.error = action.payload;
    },
  },
});

// Export typed actions
export const { increment, decrement, incrementByAmount, setValue, setLoading, setError } = counterSlice.actions;

// Export typed reducer
export default counterSlice.reducer;

// Type inference for root state
export type RootState = ReturnType<typeof store.getState>;`}
        </CodeBlock>

        <CodeBlock title="Complex Typed Slice with Nested State">
          {`interface User {
  id: string;
  name: string;
  email: string;
  role: 'admin' | 'user' | 'guest';
}

interface UsersState {
  users: User[];
  selectedUser: User | null;
  filters: {
    role: User['role'] | 'all';
    search: string;
  };
  pagination: {
    page: number;
    pageSize: number;
    total: number;
  };
}

const initialState: UsersState = {
  users: [],
  selectedUser: null,
  filters: {
    role: 'all',
    search: '',
  },
  pagination: {
    page: 1,
    pageSize: 10,
    total: 0,
  },
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    setUsers: (state, action: PayloadAction<User[]>) => {
      state.users = action.payload;
    },
    addUser: (state, action: PayloadAction<User>) => {
      state.users.push(action.payload);
    },
    updateUser: (state, action: PayloadAction<{ id: string; changes: Partial<User> }>) => {
      const index = state.users.findIndex(u => u.id === action.payload.id);
      if (index !== -1) {
        state.users[index] = { ...state.users[index], ...action.payload.changes };
      }
    },
    removeUser: (state, action: PayloadAction<string>) => {
      state.users = state.users.filter(u => u.id !== action.payload);
    },
    selectUser: (state, action: PayloadAction<string | null>) => {
      if (action.payload === null) {
        state.selectedUser = null;
      } else {
        state.selectedUser = state.users.find(u => u.id === action.payload) || null;
      }
    },
    setFilter: (state, action: PayloadAction<Partial<UsersState['filters']>>) => {
      state.filters = { ...state.filters, ...action.payload };
    },
    setPagination: (state, action: PayloadAction<Partial<UsersState['pagination']>>) => {
      state.pagination = { ...state.pagination, ...action.payload };
    },
  },
});

export const {
  setUsers,
  addUser,
  updateUser,
  removeUser,
  selectUser,
  setFilter,
  setPagination,
} = usersSlice.actions;

export default usersSlice.reducer;`}
        </CodeBlock>
      </Section>

      <Section title="2. Typed Hooks">
        <p className="text-gray-700 dark:text-gray-300">
          useSelector and useDispatch hooks can be typed for type-safe state
          access and action dispatching.
        </p>

        <CodeBlock title="Typed useSelector and useDispatch">
          {`import { useSelector, useDispatch, TypedUseSelectorHook } from 'react-redux';
import type { RootState, AppDispatch } from './store';

// Typed useSelector hook
export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector;

// Typed useDispatch hook
export const useAppDispatch = () => useDispatch<AppDispatch>();

// Usage in components
function CounterComponent() {
  // Fully typed state access
  const count = useAppSelector((state) => state.counter.value);
  const loading = useAppSelector((state) => state.counter.loading);
  const error = useAppSelector((state) => state.counter.error);
  
  // Typed dispatch
  const dispatch = useAppDispatch();
  
  const handleIncrement = () => {
    // TypeScript knows the exact action type
    dispatch(increment());
  };
  
  const handleIncrementByAmount = (amount: number) => {
    // TypeScript validates payload type
    dispatch(incrementByAmount(amount));
  };
  
  return (
    <div>
      <p>Count: {count}</p>
      <button onClick={handleIncrement}>Increment</button>
      <button onClick={() => handleIncrementByAmount(5)}>Add 5</button>
    </div>
  );
}

// Typed selector functions
const selectCounterValue = (state: RootState) => state.counter.value;
const selectCounterLoading = (state: RootState) => state.counter.loading;

// Reusable typed selectors
function CounterDisplay() {
  const value = useAppSelector(selectCounterValue);
  const loading = useAppSelector(selectCounterLoading);
  
  if (loading) return <div>Loading...</div>;
  return <div>Value: {value}</div>;
}

// Memoized typed selectors with reselect
import { createSelector } from '@reduxjs/toolkit';

const selectUsers = (state: RootState) => state.users.users;
const selectRoleFilter = (state: RootState) => state.users.filters.role;

// Typed memoized selector
export const selectFilteredUsers = createSelector(
  [selectUsers, selectRoleFilter],
  (users, roleFilter) => {
    if (roleFilter === 'all') return users;
    return users.filter(user => user.role === roleFilter);
  }
);

// Usage
function UsersList() {
  const filteredUsers = useAppSelector(selectFilteredUsers);
  return <div>{/* render users */}</div>;
}`}
        </CodeBlock>

        <CodeBlock title="Typed Store Configuration">
          {`import { configureStore } from '@reduxjs/toolkit';
import counterReducer from './counterSlice';
import usersReducer from './usersSlice';

// Configure store with typed state
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware({
      serializableCheck: {
        ignoredActions: ['users/setUsers'],
      },
    }),
});

// Infer types from store
export type RootState = ReturnType<typeof store.getState>;
export type AppDispatch = typeof store.dispatch;

// Typed store provider
import { Provider } from 'react-redux';

function App() {
  return (
    <Provider store={store}>
      {/* App components */}
    </Provider>
  );
}`}
        </CodeBlock>
      </Section>

      <Section title="3. Typed Thunks">
        <p className="text-gray-700 dark:text-gray-300">
          createAsyncThunk provides full TypeScript support for async actions
          with typed pending, fulfilled, and rejected states.
        </p>

        <CodeBlock title="Typed Async Thunks">
          {`import { createAsyncThunk, createSlice } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';

// API response types
interface User {
  id: string;
  name: string;
  email: string;
}

interface ApiError {
  message: string;
  code: number;
}

// Typed async thunk with return type and argument type
export const fetchUserById = createAsyncThunk<
  User,           // Return type (fulfilled)
  string,         // Argument type
  {
    rejectValue: ApiError;
    state: RootState;
  }
>(
  'users/fetchById',
  async (userId: string, { rejectWithValue, getState }) => {
    try {
      const response = await fetch(\`/api/users/\${userId}\`);
      if (!response.ok) {
        return rejectWithValue({
          message: 'Failed to fetch user',
          code: response.status,
        });
      }
      const user: User = await response.json();
      return user;
    } catch (error) {
      return rejectWithValue({
        message: error instanceof Error ? error.message : 'Unknown error',
        code: 500,
      });
    }
  }
);

// Thunk with multiple arguments
export const updateUser = createAsyncThunk<
  User,
  { id: string; changes: Partial<User> },
  { rejectValue: ApiError }
>(
  'users/update',
  async ({ id, changes }, { rejectWithValue }) => {
    try {
      const response = await fetch(\`/api/users/\${id}\`, {
        method: 'PATCH',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(changes),
      });
      if (!response.ok) {
        return rejectWithValue({
          message: 'Update failed',
          code: response.status,
        });
      }
      return await response.json();
    } catch (error) {
      return rejectWithValue({
        message: 'Network error',
        code: 500,
      });
    }
  }
);

// Typed slice with async thunk
interface UsersState {
  users: User[];
  loading: boolean;
  error: ApiError | null;
}

const initialState: UsersState = {
  users: [],
  loading: false,
  error: null,
};

const usersSlice = createSlice({
  name: 'users',
  initialState,
  reducers: {
    clearError: (state) => {
      state.error = null;
    },
  },
  extraReducers: (builder) => {
    builder
      // Typed pending state
      .addCase(fetchUserById.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      // Typed fulfilled state with inferred payload type
      .addCase(fetchUserById.fulfilled, (state, action) => {
        state.loading = false;
        // action.payload is typed as User
        const existingIndex = state.users.findIndex(u => u.id === action.payload.id);
        if (existingIndex !== -1) {
          state.users[existingIndex] = action.payload;
        } else {
          state.users.push(action.payload);
        }
      })
      // Typed rejected state with rejectValue
      .addCase(fetchUserById.rejected, (state, action) => {
        state.loading = false;
        // action.payload is typed as ApiError | undefined
        if (action.payload) {
          state.error = action.payload;
        }
      })
      .addCase(updateUser.pending, (state) => {
        state.loading = true;
        state.error = null;
      })
      .addCase(updateUser.fulfilled, (state, action) => {
        state.loading = false;
        const index = state.users.findIndex(u => u.id === action.payload.id);
        if (index !== -1) {
          state.users[index] = action.payload;
        }
      })
      .addCase(updateUser.rejected, (state, action) => {
        state.loading = false;
        if (action.payload) {
          state.error = action.payload;
        }
      });
  },
});

export const { clearError } = usersSlice.actions;
export default usersSlice.reducer;`}
        </CodeBlock>

        <CodeBlock title="Typed Thunk with getState and dispatch">
          {`import { createAsyncThunk } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';

// Thunk that uses typed getState
export const fetchUserWithAuth = createAsyncThunk<
  User,
  string,
  {
    state: RootState;
    dispatch: AppDispatch;
    rejectValue: ApiError;
  }
>(
  'users/fetchWithAuth',
  async (userId: string, { getState, dispatch, rejectWithValue }) => {
    // Typed state access
    const state = getState();
    const token = state.auth.token;
    
    if (!token) {
      return rejectWithValue({ message: 'Not authenticated', code: 401 });
    }
    
    try {
      const response = await fetch(\`/api/users/\${userId}\`, {
        headers: {
          'Authorization': \`Bearer \${token}\`,
        },
      });
      
      if (response.status === 401) {
        // Typed dispatch
        dispatch(logout());
        return rejectWithValue({ message: 'Session expired', code: 401 });
      }
      
      return await response.json();
    } catch (error) {
      return rejectWithValue({
        message: 'Network error',
        code: 500,
      });
    }
  }
);

// Conditional thunk based on state
export const conditionalFetch = createAsyncThunk<
  User[],
  void,
  { state: RootState }
>(
  'users/conditionalFetch',
  async (_, { getState }) => {
    const { filters, pagination } = getState().users;
    
    // Build query from typed state
    const params = new URLSearchParams({
      role: filters.role === 'all' ? '' : filters.role,
      search: filters.search,
      page: pagination.page.toString(),
      pageSize: pagination.pageSize.toString(),
    });
    
    const response = await fetch(\`/api/users?\${params}\`);
    return await response.json();
  }
);`}
        </CodeBlock>
      </Section>

      <Section title="4. Typed Middleware">
        <p className="text-gray-700 dark:text-gray-300">
          Custom middleware can be fully typed to work with your store state
          and actions.
        </p>

        <CodeBlock title="Typed Custom Middleware">
          {`import { Middleware } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';

// Typed middleware
const loggerMiddleware: Middleware<
  {}, // Dispatch extension (none)
  RootState
> = (store) => (next) => (action) => {
  console.log('dispatching', action);
  const result = next(action);
  console.log('next state', store.getState());
  return result;
};

// Typed middleware with action filtering
const analyticsMiddleware: Middleware<
  {},
  RootState
> = (store) => (next) => (action) => {
  // Type-safe action checking
  if (action.type.startsWith('users/')) {
    // Track user-related actions
    analytics.track('user_action', {
      type: action.type,
      payload: action.payload,
    });
  }
  
  return next(action);
};

// Typed middleware with async operations
const apiMiddleware: Middleware<
  {},
  RootState,
  AppDispatch
> = (store) => (next) => async (action) => {
  // Check if action is a thunk
  if (typeof action === 'function') {
    return action(store.dispatch, store.getState, undefined);
  }
  
  // Handle regular actions
  return next(action);
};

// Typed error handling middleware
const errorHandlingMiddleware: Middleware<
  {},
  RootState
> = (store) => (next) => (action) => {
  try {
    return next(action);
  } catch (error) {
    console.error('Redux error:', error);
    // Type-safe error handling
    if (error instanceof Error) {
      store.dispatch({
        type: 'error/setError',
        payload: error.message,
      });
    }
    throw error;
  }
};

// Apply typed middleware
export const store = configureStore({
  reducer: {
    counter: counterReducer,
    users: usersReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware()
      .concat(loggerMiddleware)
      .concat(analyticsMiddleware)
      .concat(errorHandlingMiddleware),
});`}
        </CodeBlock>

        <CodeBlock title="Typed Middleware with Action Type Guards">
          {`import { Middleware, isRejected, isPending, isFulfilled } from '@reduxjs/toolkit';
import type { RootState } from './store';

// Type guard for specific action types
function isUserAction(action: any): action is { type: string; payload: User } {
  return action.type.startsWith('users/') && 'payload' in action;
}

// Typed middleware with action type checking
const userActionLogger: Middleware<{}, RootState> = (store) => (next) => (action) => {
  if (isUserAction(action)) {
    // action.payload is typed as User
    console.log('User action:', action.type, action.payload);
  }
  
  // Handle async thunk states
  if (isPending(action)) {
    console.log('Async action pending:', action.type);
  } else if (isFulfilled(action)) {
    console.log('Async action fulfilled:', action.type, action.payload);
  } else if (isRejected(action)) {
    console.log('Async action rejected:', action.type, action.error);
  }
  
  return next(action);
};

// Typed middleware for API calls
const apiCallLogger: Middleware<{}, RootState> = (store) => (next) => (action) => {
  const result = next(action);
  
  // Type-safe state access after action
  const state = store.getState();
  
  if (state.users.loading) {
    console.log('Users are loading...');
  }
  
  if (state.users.error) {
    console.error('Users error:', state.users.error);
  }
  
  return result;
};`}
        </CodeBlock>
      </Section>

      <Section title="5. Advanced Redux Toolkit Patterns">
        <p className="text-gray-700 dark:text-gray-300">
          Advanced patterns including typed listeners, RTK Query, and complex
          state management scenarios.
        </p>

        <CodeBlock title="Typed RTK Query">
          {`import { createApi, fetchBaseQuery } from '@reduxjs/toolkit/query/react';

// Define API types
interface User {
  id: string;
  name: string;
  email: string;
}

interface CreateUserRequest {
  name: string;
  email: string;
}

interface UpdateUserRequest {
  id: string;
  changes: Partial<User>;
}

// Typed API slice
export const api = createApi({
  reducerPath: 'api',
  baseQuery: fetchBaseQuery({ baseUrl: '/api' }),
  tagTypes: ['User'],
  endpoints: (builder) => ({
    // Typed query endpoint
    getUser: builder.query<User, string>({
      query: (id) => \`/users/\${id}\`,
      providesTags: (result, error, id) => [{ type: 'User', id }],
    }),
    
    // Typed query with parameters
    getUsers: builder.query<User[], { role?: string; page?: number }>({
      query: (params) => ({
        url: '/users',
        params,
      }),
      providesTags: ['User'],
    }),
    
    // Typed mutation
    createUser: builder.mutation<User, CreateUserRequest>({
      query: (body) => ({
        url: '/users',
        method: 'POST',
        body,
      }),
      invalidatesTags: ['User'],
    }),
    
    // Typed update mutation
    updateUser: builder.mutation<User, UpdateUserRequest>({
      query: ({ id, changes }) => ({
        url: \`/users/\${id}\`,
        method: 'PATCH',
        body: changes,
      }),
      invalidatesTags: (result, error, { id }) => [{ type: 'User', id }],
    }),
    
    // Typed delete mutation
    deleteUser: builder.mutation<void, string>({
      query: (id) => ({
        url: \`/users/\${id}\`,
        method: 'DELETE',
      }),
      invalidatesTags: ['User'],
    }),
  }),
});

// Export typed hooks
export const {
  useGetUserQuery,
  useGetUsersQuery,
  useCreateUserMutation,
  useUpdateUserMutation,
  useDeleteUserMutation,
} = api;

// Usage in component
function UserComponent({ userId }: { userId: string }) {
  // Fully typed query hook
  const { data: user, isLoading, error } = useGetUserQuery(userId);
  
  // Fully typed mutation hook
  const [updateUser, { isLoading: isUpdating }] = useUpdateUserMutation();
  
  const handleUpdate = async () => {
    try {
      // TypeScript validates the mutation argument
      await updateUser({
        id: userId,
        changes: { name: 'New Name' },
      }).unwrap();
    } catch (error) {
      console.error('Update failed:', error);
    }
  };
  
  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error loading user</div>;
  if (!user) return null;
  
  return (
    <div>
      <h1>{user.name}</h1>
      <button onClick={handleUpdate} disabled={isUpdating}>
        Update
      </button>
    </div>
  );
}`}
        </CodeBlock>

        <CodeBlock title="Typed Listener Middleware">
          {`import { createListenerMiddleware, isAnyOf } from '@reduxjs/toolkit';
import type { RootState, AppDispatch } from './store';
import { increment, decrement, incrementByAmount } from './counterSlice';

// Typed listener middleware
const listenerMiddleware = createListenerMiddleware<RootState, AppDispatch>();

// Typed listener for specific actions
listenerMiddleware.startListening({
  actionCreator: increment,
  effect: async (action, listenerApi) => {
    // Typed state access
    const state = listenerApi.getState();
    console.log('Counter incremented:', state.counter.value);
    
    // Typed dispatch
    if (state.counter.value > 10) {
      listenerApi.dispatch({
        type: 'notification/show',
        payload: 'Counter is high!',
      });
    }
  },
});

// Typed listener for multiple actions
listenerMiddleware.startListening({
  matcher: isAnyOf(increment, decrement, incrementByAmount),
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    
    // Save to localStorage with typed state
    localStorage.setItem('counter', JSON.stringify({
      value: state.counter.value,
      timestamp: Date.now(),
    }));
  },
});

// Typed listener with condition
listenerMiddleware.startListening({
  predicate: (action, currentState, previousState) => {
    // Type-safe state comparison
    return currentState.counter.value !== previousState.counter.value;
  },
  effect: async (action, listenerApi) => {
    const state = listenerApi.getState();
    // Analytics tracking
    analytics.track('counter_changed', {
      value: state.counter.value,
    });
  },
});

// Apply listener middleware
export const store = configureStore({
  reducer: {
    counter: counterReducer,
  },
  middleware: (getDefaultMiddleware) =>
    getDefaultMiddleware().prepend(listenerMiddleware.middleware),
});`}
        </CodeBlock>
      </Section>

      <InfoBox type="important">
        <strong>Key Takeaways:</strong>
        <ul className="list-disc list-inside mt-2 space-y-1">
          <li>Redux Toolkit provides excellent TypeScript inference</li>
          <li>Use PayloadAction for typed action payloads</li>
          <li>Create typed hooks (useAppSelector, useAppDispatch) for better DX</li>
          <li>createAsyncThunk supports full typing with rejectValue</li>
          <li>Middleware can be fully typed with RootState and AppDispatch</li>
          <li>RTK Query provides end-to-end type safety for API calls</li>
        </ul>
      </InfoBox>
    </div>
  );
}

