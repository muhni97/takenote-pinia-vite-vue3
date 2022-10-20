import { defineStore } from "pinia";
import {
  collection,
  onSnapshot,
  doc,
  setDoc,
  deleteDoc,
  updateDoc,
  addDoc,
  query,
  orderBy,
} from "firebase/firestore";
import { db } from "../js/firebase.js";
import { useStoreAuth } from "@/stores/storeAuth";

let notesCollectionRef;
let notesCollectionQuery;

let getNotesSnapshot = null

export const useStoreNotes = defineStore("storeNotes", {
  state: () => {
    return {
      notes: [],
      notesLoaded: false,
    };
  },
  actions: {
    init() {
      const storeAuth = useStoreAuth();

      notesCollectionRef = collection(db, "users", storeAuth.user.id, 'notes');
      notesCollectionQuery = query(notesCollectionRef, orderBy("date", "desc"));
      this.getNotes();
    },
    async getNotes() {
      this.notesLoaded = false

      if(getNotesSnapshot) getNotesSnapshot() // Unsbuscribe from any active listener

      getNotesSnapshot = onSnapshot(notesCollectionQuery, (querySnapshot) => {
        let notes = [];
        querySnapshot.forEach((doc) => {
          let note = {
            id: doc.id,
            content: doc.data().content,
            date: doc.data().date,
          };
          notes.push(note);
        });
        setTimeout(() => {
          this.notes = notes; // bunu yapmadığımızda yeni kod eklediğimizde yada güncellediğimizde veriler tekrarlıyor.
          this.notesLoaded = true;
        }, 1000);
      }, error => {
        console.log('Error message : ', error.message)
      })

    },
    clearNotes(){
      this.notes = []
      
    },
    async addNote(newNoteContent) {
      let currentDate = new Date().getTime(),
        date = currentDate.toString();

      // await setDoc(doc(notesCollectionRef, id), {
      //   content: newNoteContent,
      //   id,
      // })

      await addDoc(notesCollectionRef, {
        content: newNoteContent,
        date,
      });
    },
    async deleteNote(idToDelete) {
      // this.notes = this.notes.filter((note) => note.id !== idToDelete);
      await deleteDoc(doc(notesCollectionRef, idToDelete));
    },
    async updateNote(id, content) {
      // let index = this.notes.findIndex((note) => note.id === id);
      // console.log('index : ', index);
      // this.notes[index].content = content;

      await updateDoc(doc(notesCollectionRef, id), {
        content,
      });
    },
  },
  getters: {
    getNoteContent: (state) => {
      return (id) => {
        return state.notes.filter((note) => note.id === id)[0].content;
      };
    },
    totalNotesCount: (state) => {
      return state.notes.length;
    },
    totalCharactersCount: (state) => {
      let count = 0;
      state.notes.forEach((note) => {
        count += note.content.length;
      });
      return count;
    },
  },
});
