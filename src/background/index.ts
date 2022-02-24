import { getBookContent, getBookChapter, searchBook } from "./api";
import { getStorageBooks, setBookInStorage, setBooksSchedule } from "./storage";
import { openContentInsertWindow } from './content-handle';
import {Api, Storage, Bridge} from '@/definitions/background';

const api: Api = {
  searchBook,
  getBookChapter,
  getBookContent,
};

const storage: Storage = {
  getStorageBooks,
  setBookInStorage,
  setBooksSchedule,
};

const bridge: Bridge = {
  openContainer: openContentInsertWindow,
};

if (ENV === "development") {
  // @ts-ignore
  window.bg = {
    api,
    storage,
    bridge,
  };
}
