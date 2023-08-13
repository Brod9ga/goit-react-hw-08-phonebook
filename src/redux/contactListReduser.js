import axios from 'axios';
const { createSlice, createAsyncThunk } = require('@reduxjs/toolkit');

const apiContacts =
  'https://64cf7cceffcda80aff51e9ed.mockapi.io/contacts';

const $instanse = axios.create({
  baseURL: apiContacts,
});

export const fetchGetContactsThunk = createAsyncThunk(
  'contacts/fetchAll',
  async (_, thunkApi) => {
    try {
      const response = await $instanse.get('/contacts');
      return response.data;
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
);

export const addContact = createAsyncThunk(
  "contacts/addContact",
  async (contact, thunkApi)=>{
    try {
      const {data} = await $instanse.post('/contacts',contact)
      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

export const deleteContact = createAsyncThunk(
  "contacts/deleteContact",
  async(contactId, thunkApi)=>{
    try {
      const {data}=await $instanse.delete(`/contacts/${contactId}`)
      return data
    } catch (error) {
      return thunkApi.rejectWithValue(error.message);
    }
  }
)

const initialState = {
  contacts: {
    items: [],
    isLoading: false,
    error: null,
  },
  filter: '',
  wordForFilter: '',
};

const contactListSlice = createSlice({
  name: 'contactList',
  initialState,
  reducers: {
    setContacts:(state, action)=>{
state.contacts.items=action.payload
    },
    setFilter: (state, action) => {
      state.filter = action.payload;
    },
    filteredContacts: (state, action) => {
      state.filter = action.payload;
    },
    setWordForFilter: (state, action) => {
      state.wordForFilter = action.payload;
    },
  },
  extraReducers: builder =>
    builder
      .addCase(fetchGetContactsThunk.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(fetchGetContactsThunk.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.items = action.payload;
      })
      .addCase(fetchGetContactsThunk.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      //                          ADD CONTACT
      .addCase(addContact.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(addContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        // state.contacts = [...state.contacts, action.payload];
        state.contacts.items?.push(action.payload)
      })
      .addCase(addContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      })
      //                          DELETE CONTACT
      .addCase(deleteContact.pending, state => {
        state.contacts.isLoading = true;
        state.contacts.error = null;
      })
      .addCase(deleteContact.fulfilled, (state, action) => {
        state.contacts.isLoading = false;
        // state.contacts = state.contacts.filter(
        //   contact => contact.id !== action.payload.id
        // );
        const indexDeletedContact = state.contacts.items.findIndex(
          contact => contact.id === action.payload.id
        );
        state.contacts.items.splice(indexDeletedContact, 1);
      })
      .addCase(deleteContact.rejected, (state, action) => {
        state.contacts.isLoading = false;
        state.contacts.error = action.payload;
      }),
});

export const { setContacts, setFilter, filteredContacts, setWordForFilter } =
  contactListSlice.actions;
export const contactListReducer = contactListSlice.reducer;

export const selectContactsItems = state => state.contactList.contacts.items;
export const selectFilter = state => state.contactList.filter;
export const selectIsLoading = state => state.contactList.contacts.isLoading;
export const selectError = state => state.contactList.contacts.error;
export const selectWordForFilter = state => state.contactList.wordForFilter;
